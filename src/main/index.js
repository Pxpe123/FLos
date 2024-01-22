/* eslint-disable no-unused-vars */
import { ipcMain, app, shell, BrowserWindow } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";
import { server } from "./server";
let mainWindow;

console.log(app.getPath("userData"));
function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		backgroundColor: "#252525",
		frame: false,
		movable: false,
		width: 800,
		maxWidth: 800,
		minWidth: 800,
		height: 480,
		center: true,
		transparent: true,
		fullscreen: true,
		maxHeight: 480,
		minHeight: 480,
		show: true,
		autoHideMenuBar: true,
		...(process.platform === "linux" ? { icon } : {}),
		webPreferences: {
			preload: join(__dirname, "../preload/index.mjs"),
			sandbox: false,
			nativeWindowOpen: true,
			nodeIntegration: false,
			enableRemoteModule: true,
			contextIsolation: true,
			devTools: true,
			webSecurity: true,
		},
	});
	mainWindow.loadFile(join(__dirname, "../renderer/splashScreen.html"));
	mainWindow.on("unresponsive", () => {
		console.log("Load time excessive");
	});
	if (is.dev) {
		mainWindow.webContents.openDevTools({ mode: "detach" });
	}

	mainWindow.once("ready-to-show", () => {
		server(mainWindow);
		// mainWindow.show();
		setTimeout(() => {
			mainWindow.webContents.send("fadeOut", "now");
			setTimeout(() => {
				if (process.env["ELECTRON_RENDERER_URL"]) {
					mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
				} else {
					mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
				}
			}, 2000);
		}, 1000);
	});

	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url);
		return { action: "deny" };
	});
}

ipcMain.on("close", (event, msg) => {
	app.quit();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	// Set app user model id for windows
	electronApp.setAppUserModelId("com.electron");

	// Default open or close DevTools by F12 in development
	// and ignore CommandOrControl + R in production.
	// see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
	app.on("browser-window-created", (_, window) => {
		optimizer.watchWindowShortcuts(window);
	});

	createWindow();

	app.on("activate", function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
