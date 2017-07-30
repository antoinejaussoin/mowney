var fs = require('fs');
var path = require('path');

function loadTestFile(name) {
    var testFile = path.join(__dirname, 'files', name);
    data = fs
        .readFileSync(testFile).toString();
    
    return data;
}

module.exports = {
    loadTestFile: loadTestFile
};