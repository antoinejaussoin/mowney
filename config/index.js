/* eslint global-require: 0 */

const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

const fileExist = fs.existsSync(path.resolve(__dirname, 'config.json'));

if (fileExist) {
    module.exports = require('./config.json')[env];
} else {
    module.exports = require('./config_example.json')[env];
}
