import React from "react";
import Navbar from "./navbar";
import Results from "./results";
import Pager from "./pager";
// import jquery from "jquery";
const client = require( "../api/giphy-client" )();

const defaultSearchResults = { data: [] };
const pageSize = 25;
// const client = new GiphyClient();

export default React.createClass( {
	getInitialState: function() {
		return {
			text: "",
			rating: "Any",
			searchResults: defaultSearchResults,
			isSearching: false,
			total: 0,
			count: 0,
			offset: 0
		};
	},
	onSearch: function( e ) {
		e.preventDefault();
		this.doSearch( 0 );
	},
	onShowFavorites: function() {
    },
	onSearchTextChange: function( e ) {
		this.setState( { text: e.target.value } );
	},
	onRatingChange: function( e ) {
		e.stopPropagation();
		let newRating = e.target.textContent;
		this.setState( { rating: newRating } );
		if ( this.state.searchResults.data.length > 0 ) {
			this.state.rating = newRating;
			this.doSearch( 0 );
		}
	},
	onSearchNext: function( e ) {
		e.preventDefault();
		let newOffset = this.state.offset + pageSize;
		this.doSearch( newOffset );
	},
	onSearchPrev: function( e ) {
		e.preventDefault();
		let newOffset = this.state.offset - pageSize;
		if ( newOffset < 0 ) {
			newOffset = 0;
		}
		this.doSearch( newOffset );
	},
	doSearch: function( offset ) {
		if ( this.state.text && this.state.text.length > 0 ) {
			this.setState( { isSearching: true, searchResults: defaultSearchResults } );
			client.search( this.state.text, { limit: pageSize, offset: offset, rating: ( this.state.rating !== "Any" ? this.state.rating : null ) } )
				.then( ( data ) => {
					this.setState( { rating: this.state.rating, text: this.state.text,
					isSearching: false, searchResults: data,
					error: null,
					total: data.pagination["total_count"],
					count: data.pagination.count,
					offset: data.pagination.offset } );
				} )
				.catch( ( err ) => {
					console.log( err );
					this.setState( { rating: this.state.rating, text: this.state.text,
					isSearching: false, searchResults: defaultSearchResults,
					error: err, total: 0, count: 0, offset: 0 } );
				} );
		} else {
			this.setState( { searchResults: defaultSearchResults,
			isSearching: false,
			total: 0,
			count: 0,
			offset: 0 } );
		}
	},
	render: function() {
		return (
		<div>
        <Navbar
			text={this.state.text}
			rating={this.state.rating}
			onSearch={this.onSearch}
			onShowFavorites={this.onShowFavorites}
			onSearchTextChange={this.onSearchTextChange}
			onRatingChange={this.onRatingChange} />

			<div className="container">
				<Pager onSearchNext={this.onSearchNext}
					onSearchPrev={this.onSearchPrev}
					count={this.state.count}
					offset={this.state.offset}
					total={this.state.total}
					pageSize={pageSize} />
				<Results searchResults={this.state.searchResults} isSearching={this.state.isSearching} />
				<Pager onSearchNext={this.onSearchNext}
					onSearchPrev={this.onSearchPrev}
					count={this.state.count}
					offset={this.state.offset}
					total={this.state.total}
					pageSize={pageSize}
					showStats={ true }
					isSearching={this.state.isSearching} />
			</div>

		</div>
		);
	}
} );

