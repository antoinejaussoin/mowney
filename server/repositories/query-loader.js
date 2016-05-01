var fs = require('fs');
var path = require('path');
var _ = require('lodash');

function loadFile(name) {
    try {
        var filePath = path.join(__dirname, 'queries', name + '.sql');
        return fs.readFileSync(filePath).toString();
    } catch (e) {
        console.error('Importing query error: ' + e);
        throw e;
    }
}

module.exports = _.memoize(loadFile);