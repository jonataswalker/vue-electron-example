const path = require('path');
const electron = require('electron');
const { app, BrowserWindow } = electron;

const resolve = file => path.resolve(__dirname, file);
const isDev = process.argv.slice(1).includes('--dev');
const isPacked = process.mainModule.filename.includes('app.asar');
const rootPath = resolve('..');
const nodeModules = `${rootPath}/node_modules/`;

global.rootPath = rootPath;
global.node_modules = nodeModules;

if (!isPacked) {
  require('electron-reload')(rootPath + '/app/index.html', {
    electron: path.join(nodeModules, '.bin', 'electron')
  });

  require('electron-context-menu')({
    prepend: (params, browserWindow) => [{
      label: 'Rainbow',
      // only show it when right-clicking images
      visible: params.mediaType === 'image'
    }]
  });
}

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    icon: rootPath + '/app/assets/img/electron-logo.png',
    width: 1200,
    height: 800,
    show: false,
    backgroundColor: '#009688'
  });
  mainWindow.setMenu(null);

  mainWindow.loadURL(`file://${rootPath}/app/index.html`);
  // isDev && mainWindow.openDevTools();
  mainWindow.openDevTools();

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.maximize();
  });

  mainWindow.on('closed', () => { mainWindow = null });

  mainWindow.webContents.on('crashed', () => {
    console.warn('crashed');
  });

  mainWindow.on('unresponsive', () => {
    console.warn('page becomes unresponsive');
  });

  process.on('uncaughtException', () => {
    console.warn('uncaughtException');
  });
});

// when all windows are closed, quit the application on Windows/Linux
app.on('window-all-closed', () => {
  // only quit the application on OS X if the user hits cmd + q
  if (process.platform !== 'darwin') app.quit();
});
