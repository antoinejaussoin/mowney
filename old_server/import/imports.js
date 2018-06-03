const models = require('../models');
const moment = require('moment');
const async = require('async');

function importImports(importedImports, cb) {
  let completed = 0;
  const results = [];
  importedImports.forEach((i) => {
    const imp = models.Import.create({
      // id: i['id'][0],
      date: moment(i.date[0]),
      fileName: i['file-name'][0],
      isManual: i['is-manual'][0] === 'true'
    })
      .complete((err, createdImport) => {
        if (err) {
          console.log(`error: ${err}`);
          return cb(err, null);
        }
        // i.imported = createdImport;
        results.push(createdImport);
        completed++;
        console.log(`imported ${completed} imports`);
        if (completed === importedImports.length) {
          return cb(null, results);
        }
      });
  });
}

module.exports = importImports;
