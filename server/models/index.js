const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require(`${__dirname}/../../config`);
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {};
const initialised = false;

db.init = function () {
  fs
    .readdirSync(__dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
    .forEach((file) => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db);
    }
  });

  // sequelize.query('SET sql_mode=""').then(res => {
  //     console.log('Setting sql_mode done ', res);
  // });
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
