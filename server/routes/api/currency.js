var express = require('express');
var router = express.Router();
var auth = require('./../../auth').auth;
var models = require('../../models');
var currencyRepository = require('../../repositories/currency-repository');
var _ = require('lodash');

router.use(auth);

router.get('/list', function (req, res) {
    currencyRepository.getAll().then(function (list) {
        res.send(list);
    });
});

module.exports = router;
