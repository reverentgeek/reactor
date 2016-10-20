import React from "react";
import Navbar from "./navbar";
import Results from "./results";
import Pager from "./pager";
import Client from "../giphyClient";

const defaultSearchResults = { data: [] };
const pageSize = 25;

export default class Search extends React.Component {
	constructor( props ) {
		super( props );
		this.client = new Client();
		this.state = {
			text: "",
			rating: "Any",
			searchResults: defaultSearchResults,
			isSearching: false,
			total: 0,
			count: 0,
			offset: 0
		};
	}

	onSearch( e ) {
		e.preventDefault();
		this.doSearch( 0 );
	}

	onShowFavorites() {
    }

	onSearchTextChange( e ) {
		this.setState( { text: e.target.value } );
	}

	onRatingChange( e ) {
		e.stopPropagation();
		let newRating = e.target.textContent;
		this.setState( { rating: newRating } );
		if ( this.state.searchResults.data.length > 0 ) {
			this.state.rating = newRating;
			this.doSearch( 0 );
		}
	}

	onSearchNext( e ) {
		e.preventDefault();
		let newOffset = this.state.offset + pageSize;
		this.doSearch( newOffset );
	}

	onSearchPrev( e ) {
		e.preventDefault();
		let newOffset = this.state.offset - pageSize;
		if ( newOffset < 0 ) {
			newOffset = 0;
		}
		this.doSearch( newOffset );
	}

	doSearch( offset ) {
		if ( this.state.text && this.state.text.length > 0 ) {
			this.setState( { isSearching: true, searchResults: defaultSearchResults } );
			this.client.search( this.state.text, { limit: pageSize, offset, rating: ( this.state.rating !== "Any" ? this.state.rating : null ) } )
				.then( ( data ) => {
					this.setState( { rating: this.state.rating, text: this.state.text,
						isSearching: false, searchResults: data,
						error: null,
						total: data.pagination["total_count"],
						count: data.pagination.count,
						offset: data.pagination.offset } );
				} )
				.catch( ( err ) => {
					// console.log( err );
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
	}

	render() {
		return (
		<div>
			<Navbar
				text={this.state.text}
				rating={this.state.rating}
				onSearch={this.onSearch.bind( this )}
				onShowFavorites={this.onShowFavorites.bind( this )}
				onSearchTextChange={this.onSearchTextChange.bind( this )}
				onRatingChange={this.onRatingChange.bind( this )} />

			<div id="searchResults" className="container-fluid">
				<Pager onSearchNext={this.onSearchNext.bind( this )}
					onSearchPrev={this.onSearchPrev.bind( this )}
					count={this.state.count}
					offset={this.state.offset}
					total={this.state.total}
					showStats
					pageSize={pageSize} />
				<Results searchResults={this.state.searchResults} isSearching={this.state.isSearching} />
				<div className="clearfix"></div>
				<Pager onSearchNext={this.onSearchNext.bind( this )}
					onSearchPrev={this.onSearchPrev.bind( this )}
					count={this.state.count}
					offset={this.state.offset}
					total={this.state.total}
					pageSize={pageSize}
					showStats
					isSearching={this.state.isSearching} />
			</div>
		</div>
		);
	}
}
