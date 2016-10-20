import { clipboard } from "electron";
import React from "react";

class Gif extends React.Component {
	constructor( props ) {
		super( props );
		this.state = { hovered: false };
	}

	onMouseOver( e ) {
		this.setState( { hovered: true } );
		let gif = this.refs.gif;
		gif.src = this.props.animated;
	}

	onMouseOut( e ) {
		this.setState( { hovered: false } );
		let gif = this.refs.gif;
		gif.src = this.props.still;
	}

	onClick( e ) {
		e.stopPropagation();
		e.preventDefault();
		let link = this.props.original;
		clipboard.writeText( link );
		new Notification( "Reactor", { body: "Copied to clipboard!" } );
	}

	onFavClick( e ) {
		e.stopPropagation();
		e.preventDefault();
		alert( "Sad trombone... this don't work yet :'(" );
	}

	render() {
		return (
			<div key={this.props.id}
				className="img-container">
					<div key={"gif-" + this.props.id}
						onMouseOver={this.onMouseOver.bind( this )}
						onMouseOut={this.onMouseOut.bind( this )}
						>
						<div className="img-actions" style={{ opacity: this.state.hovered ? 1 : 0 }}>
							<div className="btn btn-primary btn-sm" onClick={this.onClick.bind( this )}><i className="glyphicon glyphicon-copy"></i></div>
							<div className="btn btn-primary btn-sm" onClick={this.onFavClick.bind( this )}><i className="glyphicon glyphicon-star-empty"></i></div>
						</div>

						<img key={"img-" + this.props.id} ref="gif" className="img-responsive"
						src={this.props.still}
						onMouseOver={this.onMouseOver.bind( this )}
						onMouseOut={this.onMouseOut.bind( this )} />
					</div>
			</div> );
	}
}

Gif.propTypes = {
	animated: React.PropTypes.string,
	still: React.PropTypes.string,
	original: React.PropTypes.string,
	id: React.PropTypes.string
};

export default Gif;
