export default function( apiKey ) {
	const defaultApiKey = "dc6zaTOxFJmzC";
	let _apiKey = apiKey || defaultApiKey;
	let request = require( "request-json" );
	let client = request.createClient( "http://api.giphy.com/" );

	let makeRequest = function( request, resolve, reject ) {
		if ( process.env.DEV ) {
			console.info( request );
		}

		client.get( request, function( err, res, body ) {
			if ( !err ) {
				if ( res.statusCode === 200 ) {
					resolve( body );
				} else {
					reject( res );
				}
			} else {
				reject( res );
			}
		} );
	};

	let search = function( terms, options ) {
		return new Promise( function( resolve, reject ) {
			let opt = options || {};
			let request = "v1/gifs/search?q=" + encodeURI( terms ) + "&api_key=" + _apiKey;
			if ( opt.limit ) {
				request += "&limit=" + opt.limit;
			}
			if ( opt.offset ) {
				request += "&offset=" + opt.offset;
			}
			if ( opt.rating ) {
				request += "&rating=" + opt.rating;
			}
			makeRequest( request, resolve, reject );
		} );
	};

	let getGifById = function( id ) {
		return new Promise( function( resolve, reject ) {
			if ( !id ) {
				reject( "Gif id must be specified." );
			} else {
				let request = "v1/gifs/" + id + "?api_key=" + _apiKey;
				makeRequest( request, resolve, reject );
			}
		} );
	};

	let getGifsByIds = function( idArray ) {
		return new Promise( function( resolve, reject ) {
			let request = "v1/gifs?api_key=" + _apiKey + "&ids=" + idArray.join();
			makeRequest( request, resolve, reject );
		} );
	};

	return {
		search: search,
		getGifById: getGifById,
		getGifsByIds: getGifsByIds
	};
};

