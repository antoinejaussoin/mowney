const express = require('express');

const router = express.Router();
const auth = require('./../../auth').auth;
const models = require('../../models');
const currencyRepository = require('../../repositories/currency-repository');
const _ = require('lodash');

router.use(auth);

router.get('/list', (req, res) => {
  currencyRepository.getAll().then((list) => {
    res.send(list);
  });
});

module.exports = router;
