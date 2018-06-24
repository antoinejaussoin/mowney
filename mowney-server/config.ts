/* eslint global-require: 0 */

import * as fs from 'fs';
import * as path from 'path';

const env = process.env.NODE_ENV || 'development';

const configFile = path.resolve(__dirname, '..', '..', 'config', 'config.json');

const fileExist = fs.existsSync(configFile);

if (!fileExist) {
  console.error('Please create a config file');
}

const configContent = JSON.parse(fs.readFileSync(configFile).toString())[env];

export default configContent;
