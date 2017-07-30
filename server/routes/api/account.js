const express = require('express');

const router = express.Router();
const auth = require('./../../auth').auth;
const models = require('../../models');
const accountRepository = require('../../repositories/account-repository');
const transactionRepository = require('../../repositories/transaction-repository');
const loadingService = require('../../loaders/loading-service');
const _ = require('lodash');

router.use(auth);

router.get('/list', (req, res) => {
  accountRepository.getAll(req.user, false).then((list) => {
    res.send(list);
  });
});

router.get('/summary/:currency', (req, res) => {
  const currency = req.params.currency || 'GBP';
  accountRepository.getSummary(req.user, currency).then((summaries) => {
    summaries = summaries.map((s) => {
      if (s.currency === currency) {
        s.balanceInCurrency = s.balance;
      } else if (s.currency === 'USD') {
        s.balanceInCurrency = s.balance * s.rateToCurrency;
      } else if (currency === 'USD') {
        s.balanceInCurrency = s.balance / s.rateToUsd;
      } else {
        s.balanceInCurrency = s.balance * s.rateToCurrency / s.rateToUsd;
      }

      return s;
    });

    const sum = _.reduce(_.map(summaries, 'balanceInCurrency'), (sum, x) => sum + x);

    res.status(200).json({
      lines: summaries,
      total: sum
    });
  });
});

router.get('/list/all', (req, res) => {
  accountRepository.getAll(req.user, true).then((list) => {
    res.send(list);
  });
});

router.post('/upload/:accountId', (req, res) => {
  console.log('Req: ', req);
  const file = req.files.file;
  const accountId = req.params.accountId;

  loadingService(req.user, [{
    path: file.path,
    name: file.name,
    accountId
  }]).then(() => {
    res.send('ok');
  }, (err) => {
    console.log(err);
    res.status(500).send(err);
  });
});

router.post('/new', (req, res) => {
  accountRepository.create(req.user, req.body).then((account) => {
    res.send(account);
  }, (err) => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', (req, res) => {
  accountRepository.getById(req.user, req.params.id).then((account) => {
    res.send(account);
  });
});

router.get('/:id/transactions/:count', (req, res) => {
  transactionRepository.getByAccountId(req.user, req.params.id, req.params.count).then((transactions) => {
    if (transactions) {
      res.send(transactions);
    } else {
      res.send([]);
    }
  });
});

router.get('/timeline/:currency', (req, res) => {
  transactionRepository.getTimeline(req.user, req.params.currency).then((timeline) => {
    if (timeline) {
      res.status(200).send(timeline);
    } else {
      res.status(200).send([]);
    }
  }, (err) => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id/current', (req, res) => {
  transactionRepository.getTotal(req.user, req.params.id).then((total) => {
    if (total) {
      res.status(200).send(total.toString());
    } else {
      res.status(200).send('0');
    }
  });
});

router.get('/saving/:currency/:rangeName', (req, res) => {
  transactionRepository.getSaving(req.user, req.params.currency, req.params.rangeName).then((saving) => {
    res.status(200).send(saving);
  }, (err) => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/savings-per-year/:currency', (req, res) => {
  transactionRepository.getSavingsPerYear(req.user, req.params.currency).then((saving) => {
    res.status(200).send(saving);
  }, (err) => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.delete('/:id', (req, res) => {
  accountRepository.deleteAccount(req.user, req.params.id).then(() => {
    res.status(200).send('account deleted successfuly');
  }, (err) => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.put('/:id/toggle-active', (req, res) => {
  accountRepository.toggleActive(req.user, req.params.id).then((account) => {
    res.status(200).send(account.isActive);
  }, (err) => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.put('/:id/toggle-stat-enabled', (req, res) => {
  accountRepository.toggleStatEnabled(req.user, req.params.id).then((account) => {
    res.status(200).send(account.isStatEnabled);
  }, (err) => {
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
