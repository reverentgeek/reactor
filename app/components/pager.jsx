import React from "react";

class Pager extends React.Component {
	// constructor( props ) {
	// 	super( props );
	// }

	isVisible() {
		return this.props.count > 0 && this.props.isSearching === false;
	}

	getPrevClass() {
		return this.props.offset > 0 ?
			"previous" : "previous disabled";
	}

	getNextClass() {
		return this.props.total > ( this.props.offset + this.props.pageSize ) ? "next" : "next disabled";
	}

	onThisPage() {
		let page = this.props.offset + this.props.pageSize;
		if ( page > this.props.total ) {
			page = this.props.total;
		}
		return page;
	}

	getStats() {
		return this.props.showStats ? ( <li><div className="stats">Total: {this.props.total} • Showing {this.props.offset + 1} – {this.onThisPage()}</div></li> ) : null;
	}

	render() {
		return this.isVisible() ? (
		<nav>
			<ul className="pager">
				<li className={this.getPrevClass()}><a href="#" onClick={this.props.onSearchPrev}>← Previous</a></li>
				{this.getStats()}
				<li className={this.getNextClass()}><a href="#" onClick={this.props.onSearchNext}>Next →</a></li>
			</ul>
		</nav>
		) : null;
	}
}

Pager.propTypes = {
	count: React.PropTypes.number,
	offset: React.PropTypes.number,
	total: React.PropTypes.number,
	pageSize: React.PropTypes.number,
	isSearching: React.PropTypes.bool,
	showStats: React.PropTypes.bool,
	onSearchPrev: React.PropTypes.func.isRequired,
	onSearchNext: React.PropTypes.func.isRequired
};

export default Pager;
