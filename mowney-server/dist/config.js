"use strict";
/* eslint global-require: 0 */
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var env = process.env.NODE_ENV || 'development';
var configFile = path.resolve(__dirname, '..', '..', 'config', 'config.json');
var fileExist = fs.existsSync(configFile);
if (!fileExist) {
    console.error('Please create a config file');
}
var configContent = JSON.parse(fs.readFileSync(configFile).toString())[env];
exports.default = configContent;
