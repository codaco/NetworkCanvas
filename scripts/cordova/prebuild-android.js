const fs = require('fs');
const path = require('path');
const deferral = require('q').defer();

/**
 * Cordova 'before build' hook for android.
 *
 * Note: android platform must be created for this script to succeed.
 * Ensure you have run `cordova platform add android`
 */
module.exports = (ctx) => {
  if (ctx.opts.platforms.indexOf('android') < 0) {
    deferral.reject('Must be run for android');
    return deferral.promise;
  }

  const CustomActivityName = 'MainActivity.java';
  const javaRoot = path.join(ctx.opts.projectRoot, 'platforms', 'android', 'app', 'src', 'main', 'java');

  const srcFile = path.join(__dirname, CustomActivityName);
  const destFile = path.join(javaRoot, 'org', 'codaco', 'NetworkCanvasInterviewer6', CustomActivityName);

  const errorMsg = 'Could not copy custom Android activity: Have you run `cordova platform add android`?';

  console.log('Copy', srcFile, '->', destFile);

  fs.copyFile(srcFile, destFile, (err) => {
    if (err) {
      console.error(errorMsg, '\n', err);
      deferral.reject(errorMsg);
    } else {
      deferral.resolve();
    }
  });

  return deferral.promise;
};
