const fs = require('fs');
const path_module = require('path');
const q = require('q');

const loaders = [];
const _ = require('underscore');

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function LoadModules(path) {
  const files = fs.readdirSync(path);
  loaders.list = [];

  files.forEach((f) => {
    const file = path_module.join(__dirname, f);

    if (endsWith(file.toString(), '-loader.js')) {
      const loader = require(file.toString());
      loaders[loader.type] = loader;
      loaders.list.push(loader);
    }
  });
}

const DIR = path_module.join(__dirname);
LoadModules(DIR);

module.exports = loaders;
