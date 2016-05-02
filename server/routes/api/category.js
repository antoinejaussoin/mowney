var express = require('express');
var router = express.Router();
var auth = require('./../../auth').auth;
var models = require('../../models');
var categoryRepository = require('../../repositories/category-repository');
var _ = require('lodash');
var moment = require('moment');

router.use(auth);

router.get('/list', function (req, res) {
    categoryRepository.getAll().then(function (list) {
        res.send(list);
    });
});

router.get('/historic/:categoryId/:currency/:from/:to', function (req, res) {
    categoryRepository.categoryPerMonth(req.user,
            req.params.currency,
            req.params.categoryId,
            moment(req.params.from),
            moment(req.params.to))
        .then(function (data) {
            res.status(200).send(data);
        });
});

router.post('/clue', function (req, res) {
    //createClue(user, categoryId, isRegex, str) {
    categoryRepository.createClue(req.user, req.body.categoryId, req.body.isRegex, req.body.str)
        .then(function () {
            return categoryRepository.categoriseAll(req.user);
        })
        .then(function () {
            res.status(200).send();
        });
});

router.get('/clues', function (req, res) {
    categoryRepository.getAllClues(req.user).then(function (clues) {
        res.status(200).send(clues);
    });
});

router.delete('/clue/:id', function (req, res) {
    categoryRepository.deleteClue(req.user, req.params.id).then(function (result) {
        res.status(200).send();
    }, function (err) {
        res.status(500).send(err);
    });
});

router.post('/categorise-all', function (req, res) {
    categoryRepository.categoriseAll(req.user)
        .then(function () {
            res.send(200);
        });
});

module.exports = router;
