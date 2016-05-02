/* eslint global-require: 0 */

const fs = require('fs');
const path = require('path');

const fileExist = fs.existsSync(path.resolve(__dirname, 'config.json'));

if (fileExist) {
    module.exports = require('./config.json');
} else {
    module.exports = require('./config_example.json');
}
