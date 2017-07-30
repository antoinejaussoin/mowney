const fs = require('fs');
const path = require('path');
const _ = require('lodash');

function loadFile(name) {
  try {
    const filePath = path.join(__dirname, 'queries', `${name}.sql`);
    return fs.readFileSync(filePath).toString();
  } catch (e) {
    console.error(`Importing query error: ${e}`);
    throw e;
  }
}

module.exports = _.memoize(loadFile);
