const express = require('express');

const app = express();
const router = express.Router();
const models = require('../../models');
const importer = require('../../import/importer');
const ratesImporter = require('../../import/rates');
const path = require('path');
const auth = require('./../../auth').auth;
const _ = require('underscore');

router.use(auth);

router.get('/users', (req, res) => {
  models.User.findAll().success((users) => {
    res.send(users);
  });
});

router.get('/import', (req, res) => {
  const file = path.resolve(`${__dirname}/../data.xml`);
  importer(file, (err, data) => {
    if (err) {
      res.send(`error :${err}`);
    } else {
      res.send(data);
    }
  });
});

router.get('/import-currencies', (req, res) => {
  ratesImporter((err, data) => {
    if (err) { res.send(`error :${err}`); } else { res.send(data); }
  });
});


module.exports = router;
