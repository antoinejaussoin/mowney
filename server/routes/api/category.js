const express = require('express');

const router = express.Router();
const auth = require('./../../auth').auth;
const models = require('../../models');
const categoryRepository = require('../../repositories/category-repository');
const _ = require('lodash');
const moment = require('moment');

router.use(auth);

router.get('/list', (req, res) => {
  categoryRepository.getAll().then((list) => {
    res.send(list);
  });
});

router.get('/historic/:categoryId/:currency/:from/:to', (req, res) => {
  categoryRepository.categoryPerMonth(req.user,
    req.params.currency,
    req.params.categoryId,
    moment(req.params.from),
    moment(req.params.to))
    .then((data) => {
      res.status(200).send(data);
    });
});

router.post('/clue', (req, res) => {
  // createClue(user, categoryId, isRegex, str) {
  categoryRepository.createClue(req.user, req.body.categoryId, req.body.isRegex, req.body.str)
    .then(() => categoryRepository.categoriseAll(req.user))
    .then(() => {
      res.status(200).send();
    });
});

router.get('/clues', (req, res) => {
  categoryRepository.getAllClues(req.user).then((clues) => {
    res.status(200).send(clues);
  });
});

router.delete('/clue/:id', (req, res) => {
  categoryRepository.deleteClue(req.user, req.params.id).then((result) => {
    res.status(200).send();
  }, (err) => {
    res.status(500).send(err);
  });
});

router.post('/categorise-all', (req, res) => {
  categoryRepository.categoriseAll(req.user)
    .then(() => {
      res.send(200);
    });
});

module.exports = router;
