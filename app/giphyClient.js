import request from "request";
const defaultApiKey = "dc6zaTOxFJmzC";

export default class Client {
	constructor( apiKey = defaultApiKey, options = null ) {
		this.apiKey = apiKey;
		this.options = options || {};
		if ( !this.options.baseUrl && !this.options.uri && !this.options.url ) {
			this.options.baseUrl = "http://api.giphy.com/v1";
		}
		this.options.qs = {
			api_key: apiKey //eslint-disable-line
		};
		this.options.json = true;
		if ( this.options.proxy ) {
			process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		}
		this.client = request.defaults( this.options );
	}

	search( terms, options ) {
		return new Promise( ( resolve, reject ) => {
			const opt = options || {};
			const limit = ( opt.limit ) ? opt.limit : 25; //eslint-disable-line
			const offset = ( opt.offset ) ? opt.offset : 0;
			const rating = ( opt.rating ) ? opt.rating : "pg";
			const path = `gifs/search?q=${ encodeURI( terms ) }&limit=${ limit }&offset=${ offset }&rating=${ rating }`;
			this.client.get( path, ( err, res, body ) => {
				if ( err ) {
					return reject( err );
				}
				return resolve( body );
			} );
		} );
	}

	getGifById( id ) {
		return new Promise( ( resolve, reject ) => {
			if ( !id ) {
				return reject( "Gif id must be specified." );
			}
			const path = `gifs/${ id }`;
			return this.client.get( path, ( err, res, body ) => {
				if ( err ) {
					return reject( err );
				}
				return resolve( body );
			} );
		} );
	}

	getGifsByIds( idArray ) {
		return new Promise( ( resolve, reject ) => {
			if ( !idArray || idArray.length === 0 ) {
				return reject( "Gif ids must be an array of at least one id." );
			}
			const ids = idArray.join();
			const path = `gifs?ids=${ ids }`;
			return this.client.get( path, ( err, res, body ) => {
				if ( err ) {
					return reject( err );
				}
				return resolve( body );
			} );
		} );
	}
}
