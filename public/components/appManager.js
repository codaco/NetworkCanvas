const { ipcMain, app, BrowserWindow } = require('electron');
const path = require('path');
const windowManager = require('./windowManager');
const registerProtocolProtocol = require('./protocolProtocol').registerProtocolProtocol;

function getFileFromArgs(argv) {
  if (argv.length >= 2) {
    const filePath = argv[1];
    if (path.extname(filePath) === '.netcanvas') {
      console.log('.netcanvas found in argv', JSON.stringify({ argv }, null, 2));
      return filePath;
    }
  }
  return null;
}

const appManager = {
  openFileWhenReady: null,
  init: function init() {
    ipcMain.on('GET_ARGF', (event) => {
      if (process.platform === 'win32') {
        const filePath = getFileFromArgs(process.argv);
        if (filePath) {
          event.sender.send('OPEN_FILE', filePath);
        }
      }

      if (this.openFileWhenReady) {
        event.sender.send('OPEN_FILE', this.openFileWhenReady);
        this.openFileWhenReady = null;
      }
    });
  },
  loadDevTools: () => {
    const extensions = process.env.NC_DEVTOOLS_EXENSION_PATH;
    if (process.env.NODE_ENV !== 'development' || !extensions) { return; }
    try {
      console.log(extensions);
      extensions.split(';').forEach(
        filepath =>
          BrowserWindow.addDevToolsExtension(filepath),
      );
    } catch (err) {
      /* eslint-disable no-console */
      console.warn(err);
      console.warn('A Chrome dev tools extension failed to load. If the extension has upgraded, update your NC_DEVTOOLS_EXENSION_PATH:');
      console.warn(process.env.NC_DEVTOOLS_EXENSION_PATH);
      /* eslint-enable */
    }
  },
  openFileFromArgs: function openFileFromArgs(argv) {
    return this.restore()
      .then((window) => {
        if (process.platform === 'win32') {
          const filePath = getFileFromArgs(argv);
          if (filePath) {
            window.webContents.send('OPEN_FILE', filePath);
          }
        }

        return window;
      });
  },
  restore: function restore() {
    if (!app.isReady()) { return Promise.reject(); }

    return windowManager.getWindow()
      .then((window) => {
        if (window.isMinimized()) {
          window.restore();
        }

        window.focus();

        return window;
      });
  },
  openFile: function openFile(fileToOpen) {
    if (!app.isReady()) {
      // defer action
      this.openFileWhenReady = fileToOpen;
    } else {
      windowManager.getWindow()
        .then((window) => {
          window.webContents.send('OPEN_FILE', fileToOpen);
        });
      this.openFileWhenReady = null;
    }
  },
  start: function start() {
    registerProtocolProtocol();

    return windowManager
      .getWindow();
  },
};

module.exports = appManager;
