import React from "react";

export default React.createClass( {
    mixins: [ React.addons.PureRenderMixin ],
    isVisible: function() {
        return this.props.count > 0 && this.props.isSearching === false;
    },
    getPrevClass: function() {
        return this.props.offset > 0 ? "previous" : "previous disabled";
    },
    getNextClass: function() {
        return this.props.total > ( this.props.offset + this.props.pageSize ) ? "next" : "next disabled";
    },
    onThisPage: function() {
        let page = this.props.offset + this.props.pageSize;
        if ( page > this.props.total ) {
            page = this.props.total;
        }
        return page;
    },
    getStats: function() {
        return this.props.showStats ? ( <li><div className="stats">Total: {this.props.total} • Showing {this.props.offset + 1} – {this.onThisPage()}</div></li> ) : null;
    },
    render: function() {
        return this.isVisible() ? (
        <nav>
                        <ul className="pager">
                            <li className={this.getPrevClass()}><a href="#" onClick={this.props.onSearchPrev}>← Previous</a></li>
                            { this.getStats() }
                            <li className={this.getNextClass()}><a href="#" onClick={this.props.onSearchNext}>Next →</a></li>
                        </ul>
                        </nav>
        ) : null;
    }
} );
