import React from "react";
import clipboard from "clipboard";

export default React.createClass( {
	mixins: [ React.addons.PureRenderMixin ],
	getInitialState: function() {
		return { hovered: false };
	},
	onMouseOver: function( e ) {
		this.setState( { hovered: true } );
		let gif = this.refs.gif.getDOMNode();
		gif.src = this.props.animated;
	},
	onMouseOut: function( e ) {
		this.setState( { hovered: false } );
		let gif = this.refs.gif.getDOMNode();
		gif.src = this.props.still;
	},
	onClick: function( e ) {
		e.stopPropagation();
		e.preventDefault();
		let link = this.props.original;
		clipboard.writeText( link );
		alert( "Copied to clipboard!" );
		// clipboard.write( { text: link, html: "<a href='" + link + "'>test</a>" } );
		// console.log( clipboard.readText() + " copied to the clipboard OK" );
	},
	onFavClick: function( e ) {
		e.stopPropagation();
		e.preventDefault();
		alert( "Sad trombone... this don't work yet :'(" );
	},
	render: function() {
		return (
			<div key={this.props.id}
				className="img-container">
					<a key={"gif-" + this.props.id} href="#"
						onMouseOver={ this.onMouseOver }
						onMouseOut={ this.onMouseOut }
						>
						<div className="img-actions" style={{ opacity: this.state.hovered ? 1 : 0 }}>
							<a className="btn btn-primary btn-sm" onClick={this.onClick}><i className="glyphicon glyphicon-copy"></i></a>
							<a className="btn btn-primary btn-sm" onClick={this.onFavClick}><i className="glyphicon glyphicon-star-empty"></i></a>
						</div>

						<img key={"img-" + this.props.id} ref="gif" className="img-responsive"
						src={this.props.still}
						onMouseOver={ this.onMouseOver }
						onMouseOut={ this.onMouseOut } />
					</a>
			</div> );
	}
} );
