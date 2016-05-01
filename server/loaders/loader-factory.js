var fs = require('fs');
var path_module = require('path');
var q = require('q');
var loaders = [];
var _ = require('underscore');

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function LoadModules(path) {
    var files = fs.readdirSync(path);
    loaders.list = [];
    
    files.forEach(function(f) {
        var file = path_module.join(__dirname, f);

        if (endsWith(file.toString(), '-loader.js')) {
            var loader = require(file.toString());
            loaders[loader.type] = loader;
            loaders.list.push(loader);
        }
    })
}

var DIR = path_module.join(__dirname);
LoadModules(DIR);

module.exports = loaders;