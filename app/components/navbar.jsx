import React from "react";

class Navbar extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-default navbar-fixed-top navbar-inverse">
				<div className="container-fluid">
					<div className="navbar-brand">
						Reactor
					</div>
					<form className="navbar-form navbar-left" role="search">
						<div className="input-group">
							<div className="input-group-btn">
								<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Rating: {this.props.rating} <span className="caret"></span></button>
								<ul className="dropdown-menu">
									<li><a href="#" onClick={this.props.onRatingChange}>Any</a></li>
									<li><a href="#" onClick={this.props.onRatingChange}>Y</a></li>
									<li><a href="#" onClick={this.props.onRatingChange}>G</a></li>
									<li><a href="#" onClick={this.props.onRatingChange}>PG</a></li>
									<li><a href="#" onClick={this.props.onRatingChange}>PG-13</a></li>
									<li><a href="#" onClick={this.props.onRatingChange}>R</a></li>
								</ul>
								</div>
								<input type="text"
									value={this.props.text}
									onChange={this.props.onSearchTextChange}
									className="form-control"
									placeholder="Search"
									name="search-term" />
								<div className="input-group-btn">
									<button className="btn btn-default" type="submit" onClick={this.props.onSearch}><i className="glyphicon glyphicon-search"></i></button>
								</div>
							</div>
							<div className="input-group"></div>
							<div className="input-group menu-right">
						</div>
					</form>
				</div>
			</nav>
		);
	}
}

Navbar.propTypes = {
	rating: React.PropTypes.string,
	text: React.PropTypes.string,
	onRatingChange: React.PropTypes.func,
	onSearchTextChange: React.PropTypes.func,
	onSearch: React.PropTypes.func
};

export default Navbar;
