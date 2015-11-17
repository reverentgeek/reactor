import React from "react";
import clipboard from "clipboard";

export default React.createClass( {
	mixins: [ React.addons.PureRenderMixin ],
	onMouseOver: function( e ) {
		let gif = this.refs.gif.getDOMNode();
		gif.src = this.props.animated;
	},
	onMouseOut: function( e ) {
		let gif = this.refs.gif.getDOMNode();
		gif.src = this.props.still;
	},
	onClick: function( e ) {
		e.stopPropagation();
		e.preventDefault();
		let link = this.props.original;
		clipboard.writeText( link );
		// clipboard.write( { text: link, html: "<a href='" + link + "'>test</a>" } );
		// console.log( clipboard.readText() + " copied to the clipboard OK" );
	},
	render: function() {
		return (
			<div key={this.props.id}
				className="img-container">
					<a key={"gif-" + this.props.id} href="#"
						onClick={this.onClick}
						onMouseOver={ this.onMouseOver }
						onMouseOut={ this.onMouseOut }>

						<img key={"img-" + this.props.id} ref="gif" className="img-responsive"
						src={this.props.still}
						onMouseOver={ this.onMouseOver }
						onMouseOut={ this.onMouseOut } />
					</a>
			</div> );
	}
} );
