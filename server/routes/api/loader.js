const express = require('express');

const router = express.Router();
const auth = require('./../../auth').auth;
const models = require('../../models');
const loaders = require('../../loaders/loader-factory');
const _ = require('lodash');

router.use(auth);

router.get('/list', (req, res) => {
  res.send(loaders.list.map((l) => ({
    name: l.name,
    type: l.type
  })));
});

module.exports = router;
