import { app, BrowserWindow, Menu } from "electron";
import path from "path";
import os from "os";
import shortcut from "electron-localshortcut";
import windowState from "./windowState";
require( "electron-debug" )();

const appPath = path.resolve( path.join( __dirname, "./" ) );
const urlPath = path.join( appPath, "app.html" );

const isDevMode = !!process.execPath.match( /[\\\/]electron[\\\/]dist[\\\/]Electron\.app[\\\/]/ );
if ( isDevMode === true ) {
	const reload = require( "electron-reload" ); //eslint-disable-line
	reload( appPath );
}

let mainWindow;
const mainWindowState = windowState( "main", {
	width: 800,
	height: 600
} );

const initMenus = () => {
	if ( os.platform() === "darwin" ) {
		const template = [ {
			label: "Application",
			submenu: [
				{ label: "About Application", selector: "orderFrontStandardAboutPanel:" },
				{ type: "separator" },
				{ label: "Preferences", accelerator: "CmdOrCtrl+,", click: () => {
					mainWindow.webContents.send( "open-settings" );
				} },
				{ type: "separator" },
				{ label: "Quit", accelerator: "Command+Q", click: () => {
					app.quit();
				} }
			] }, {
				label: "Edit",
				submenu: [
					{ label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
					{ label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
					{ type: "separator" },
					{ label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
					{ label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
					{ label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
					{ label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
				] }
			];

		Menu.setApplicationMenu( Menu.buildFromTemplate( template ) );
	} else {
		shortcut.register( mainWindow, "Ctrl+,", () => {
			mainWindow.webContents.send( "open-settings" );
		} );
	}
};

const createWindow = () => {
	mainWindow = new BrowserWindow( {
		x: mainWindowState.x,
		y: mainWindowState.y,
		width: mainWindowState.width,
		height: mainWindowState.height,
		minWidth: 600,
		minHeight: 400
	} );

	if ( mainWindowState.isMaximized ) {
		mainWindow.maximize();
	}

	mainWindow.loadURL( `file://${ urlPath }` );
	// mainWindow.webContents.openDevTools();

	mainWindow.on( "close", function() {
		mainWindowState.saveState( mainWindow );
	} );

	mainWindow.on( "closed", () => {
		mainWindow = null;
	} );

	initMenus();
};

app.on( "ready", createWindow );

app.on( "window-all-closed", () => {
	app.quit();
} );

app.on( "activate", () => {
	if ( mainWindow === null ) {
		createWindow();
	}
} );
