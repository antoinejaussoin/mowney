const express = require('express');

const router = express.Router();
const auth = require('./../../auth').auth;
const models = require('../../models');
const accountRepository = require('../../repositories/account-repository');
const transactionRepository = require('../../repositories/transaction-repository');
const categoryRepository = require('../../repositories/category-repository');
const loadingService = require('../../loaders/loading-service');
const moment = require('moment');
const _ = require('lodash');

router.use(auth);

router.delete('/:id', (req, res) => {
  transactionRepository.deleteTransactions(req.user, [req.params.id]).then(() => {
    res.send(200);
  }, (err) => {
    res.send(500, err);
  });
});

router.post('/delete-batch', (req, res) => {
  transactionRepository.deleteTransactions(req.user, req.body.ids).then(() => {
    res.send(200);
  }, (err) => {
    res.send(500, err);
  });
});

router.post('/search', (req, res) => {
  transactionRepository.search(req.user, req.body.currency, req.body.search, req.body.limit).then(t => {
    res.status(200).send(t);
  }, (err) => {
    res.send(500, err);
  });
});

router.post('/:id', (req, res) => {
  transactionRepository.saveManualTransaction(req.params.id, moment(req.body.date), req.body.description, +req.body.amount).then(t => {
    res.status(200).send(t);
  }, (err) => {
    res.send(500, err);
  });
});

router.patch('/uncategorise/:id', (req, res) => {
  categoryRepository.unCategorise(req.user, req.params.id).then(() => {
    res.status(200).send();
  }, (err) => {
    res.status(500).send(err);
  });
});

router.patch('/uncategorise/:id', (req, res) => {
  categoryRepository.unCategorise(req.user, req.params.id).then(() => {
    res.status(200).send();
  }, (err) => {
    res.status(500).send(err);
  });
});

router.patch('/categorise/:id', (req, res) => {
  categoryRepository.categorise(req.user, req.params.id, req.body.categoryId).then(() => {
    res.status(200).send();
  }, (err) => {
    res.status(500).send(err);
  });
});

module.exports = router;
