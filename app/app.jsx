import React from "react";
import ReactDOM from "react-dom";
import Search from "./components/search";
const $ = jQuery = global.$ = global.jQuery = require( "jquery" ); // eslint-disable-line
require( "bootstrap" );

document.addEventListener( "DOMContentLoaded", () => {
	ReactDOM.render( <Search />, document.getElementById( "main" ) );
} );
