/* eslint-disable global-require */
/* global cordova */

import Zip from 'jszip';
import environments from './environments';
import inEnvironment from './Environment';
import { getNestedPaths, ensurePathExists, readFile, writeStream, writeFile } from './filesystem';
import { protocolPath } from './protocol';

const extractZipDir = inEnvironment((environment) => {
  if (environment === environments.ELECTRON) {
    const path = require('path');

    return (zipObject, destination) => {
      const extractPath = path.join(destination, zipObject.name);

      return ensurePathExists(extractPath);
    };
  }

  if (environment === environments.CORDOVA) {
    return (zipObject, destination) => {
      const extractPath = `${destination}${zipObject.name}`;

      return ensurePathExists(extractPath);
    };
  }

  return () => Promise.reject('Environment not recognised');
});

const extractZipFile = inEnvironment((environment) => {
  if (environment === environments.ELECTRON) {
    const path = require('path');

    return (zipObject, destination) => {
      const extractPath = path.join(destination, zipObject.name);

      return writeStream(extractPath, zipObject.nodeStream());
    };
  }

  if (environment === environments.CORDOVA) {
    return (zipObject, destination) => {
      const extractPath = `${destination}${zipObject.name}`;

      console.log('extractZipFile', { zipObject, destination, extractPath });

      return zipObject.async('blob')
        .then((text) => {
          console.log('async', text);
          return writeFile(extractPath, text)
            .catch((err) => { console.log('err', err); });
        });
    };
  }

  return () => Promise.reject('Environment not recognised');
});

const extractZip = inEnvironment((environment) => {
  if (environment !== environments.WEB) {
    return (source, destination) =>
      readFile(source)
        .then(data => Zip.loadAsync(data))
        .then((zip) => {
          console.log(Object.keys(zip.files));
          return zip;
        })
        .then(zip =>
          Promise.all(
            Object.keys(zip.files)
              .map(filename => zip.files[filename])
              .map(zipObject => (
                zipObject.dir ?
                  extractZipDir(zipObject, destination) :
                  extractZipFile(zipObject, destination)
              )),
          ),
        );
  }

  return Promise.reject();
});

const importer = inEnvironment((environment) => {
  if (environment === environments.ELECTRON) {
    console.log('electron');
    const path = require('path');

    return () => { // return (protocolFile) => { TODO: Proper spec
      const protocolFile = `${window.__dirname}/demo.canvas`; // eslint-disable-line
      const basename = path.basename(protocolFile);
      const destination = protocolPath(basename);

      ensurePathExists(destination);

      return extractZip(protocolFile, destination);
    };
  }

  if (environment === environments.CORDOVA) {
    return () => { // return (protocolFile) => { TODO: Proper spec
      const protocolFile = `${cordova.file.applicationDirectory}www/demo.canvas`;
      const destination = protocolPath('demo.canvas');

      getNestedPaths(destination);

      ensurePathExists(destination);

      return extractZip(protocolFile, destination);
    };
  }

  return () => { console.log('Import feature not available for web'); return true; };
});

export default importer;
