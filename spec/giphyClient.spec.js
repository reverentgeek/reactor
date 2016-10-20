import Client from "../app/giphyClient";
const chai = require( "chai" );
const should = chai.should();

describe( "Giphy Client Specs", () => {
	let client = {};
	let id = null;
	before( () => {
		client = new Client();
	} );

	it( "should get a list of gifs", () => {
		return client.search( "spock" )
			.then( res => {
				should.exist( res );
				res.should.have.property( "data" ).that.is.instanceOf( Array );
				res.should.have.property( "meta" );
				res.should.have.property( "pagination" );
				res.data.length.should.be.above( 0 );
				const gif = res.data[ 0 ];
				gif.should.have.property( "id" );
				gif.should.have.property( "type" ).that.is.equal( "gif" );
				id = gif.id;
			} )
			.catch( err => {
				should.not.exist( err );
			} );
	} );

	it( "should get a gif by id", () => {
		should.exist( id );
		return client.getGifById( id )
			.then( res => {
				should.exist( res );
				res.should.have.property( "data" );
				res.should.have.property( "meta" );
				const gif = res.data;
				gif.should.have.property( "id" );
				gif.should.have.property( "type" ).that.is.equal( "gif" );
			} )
			.catch( err => {
				should.not.exist( err );
			} );
	} );

	it( "should get an array of gifs by ids", () => {
		should.exist( id );
		return client.getGifsByIds( [ id ] )
			.then( res => {
				should.exist( res );
				res.should.have.property( "data" ).that.is.instanceOf( Array );
				res.should.have.property( "meta" );
				res.should.have.property( "pagination" );
				res.data.length.should.be.above( 0 );
				const gif = res.data[ 0 ];
				gif.should.have.property( "id" );
				gif.should.have.property( "type" ).that.is.equal( "gif" );
			} )
			.catch( err => {
				should.not.exist( err );
			} );
	} );
} );
