const os = require( "os" );
const path = require( "path" );
const spawn = require( "child_process" ).spawn;
const cmd = "\"node_modules/.bin/electron-packager-compile\"";
const pkginfo = require( "../package.json" );

const pkgdir = path.resolve( __dirname, "../" );

const getArgs = () => {
	const args = [ pkgdir, pkginfo.name ];
	// args.push( `--version=${ pkginfo.electronVersion }` );
	const arch = os.arch();
	const platform = os.platform();

	args.push( `--platform=${ platform }` );
	args.push( `--arch=${ arch }` );
	args.push( "--out ./build" );
	args.push( "--asar" );
	args.push( "--overwrite" );
	args.push( "--prune" );
	args.push( `--app-version=${ pkginfo.version }` );
	args.push( "--ignore=yarn.lock" );

	if ( platform === "darwin" ) {
		args.push( `--app-copyright="${ pkginfo.copyright }"` );
	}

	if ( platform === "win32" ) {
		args.push( `--version-string.CompanyName="${ pkginfo.companyName }"` );
		args.push( `--version-string.ProductName="${ pkginfo.productName }"` );
	}

	return args;
};

const args = getArgs();

const options = { shell: true };

const packager = spawn( cmd, args, options );

packager.stdout.on( "data", data => {
	console.log( `stdout: ${ data }` ); // eslint-disable-line
} );

packager.stderr.on( "data", data => {
	console.log( `stderr: ${ data }` ); // eslint-disable-line
} );

packager.on( "close", code => {
	console.log( `exited with code ${ code }` ); // eslint-disable-line
} );
