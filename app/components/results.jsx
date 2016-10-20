import React from "react";
import Gif from "./gif";

class Results extends React.Component {
	render() {
		return (
			<div className="results">
				{this.props.isSearching ? ( <div key="searching" className="searching"></div> ) : null}
				{this.props.searchResults.data.map( gif => {
					return ( <Gif key={gif.id} id={gif.id}
						still={gif.images["fixed_height_still"].url}
						animated={gif.images["fixed_height"].url}
						original={gif.images.original.url} /> );
				} )}
		</div>
        );
	}
}

Results.propTypes = {
	searchResults: React.PropTypes.object,
	isSearching: React.PropTypes.bool
};

export default Results;
