const { app } = require('electron');
const log = require('./components/log');

const appManager = require('./components/appManager');

log.info('App starting...');
appManager.init();

const shouldQuit = app.makeSingleInstance((argv) => {
  appManager.openFileFromArgs(argv);
});

if (shouldQuit) {
  app.quit();
  return;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  appManager.start();
  appManager.loadDevTools();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (process.platform === 'darwin') {
    appManager.restore();
  }
});

app.on('open-file', (event, filePath) => {
  appManager.openFile(filePath);
});
