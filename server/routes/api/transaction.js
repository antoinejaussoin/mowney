var express = require('express');
var router = express.Router();
var auth = require('./../../auth').auth;
var models = require('../../models');
var accountRepository = require('../../repositories/account-repository');
var transactionRepository = require('../../repositories/transaction-repository');
var categoryRepository = require('../../repositories/category-repository');
var loadingService = require('../../loaders/loading-service');
var moment = require('moment');
var _ = require('lodash');

router.use(auth);

router.delete('/:id', function (req, res) {
    transactionRepository.deleteTransactions(req.user, [req.params.id]).then(function () {
        res.send(200);
    }, function (err) {
        res.send(500, err);
    });
});

router.post('/:id', function (req, res) {
    transactionRepository.saveManualTransaction(req.params.id, moment(req.body.date), req.body.description, +req.body.amount).then(function () {
        res.send(200);
    }, function (err) {
        res.send(500, err);
    });
});

router.patch('/uncategorise/:id', function (req, res) {
    categoryRepository.unCategorise(req.user, req.params.id).then(function () {
        res.status(200).send();
    }, function (err) {
        res.status(500).send(err);
    });
});

router.patch('/uncategorise/:id', function (req, res) {
    categoryRepository.unCategorise(req.user, req.params.id).then(function () {
        res.status(200).send();
    }, function (err) {
        res.status(500).send(err);
    });
});

router.patch('/categorise/:id', function (req, res) {
    categoryRepository.categorise(req.user, req.params.id, req.body.categoryId).then(function () {
        res.status(200).send();
    }, function (err) {
        res.status(500).send(err);
    });
});

module.exports = router;
