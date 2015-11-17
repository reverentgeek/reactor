import React from "react/addons";
import Gif from "./gif";
// const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default React.createClass( {
	mixins: [ React.addons.PureRenderMixin ],
	render: function() {
		return (
		<div className="results">
		{this.props.isSearching ? ( <div key="searching" className="searching"></div> ) : null }
		{ this.props.searchResults.data.map( gif => {
			return ( <Gif key={gif.id} id={gif.id}
			still={gif.images["fixed_height_still"].url}
			animated={gif.images["fixed_height"].url}
			original={gif.images["original"].url} /> );
		} )}
		</div>
        );
	}
} );
