var express = require('express');
var router = express.Router();
var auth = require('./../../auth').auth;
var models = require('../../models');
var accountRepository = require('../../repositories/account-repository');
var transactionRepository = require('../../repositories/transaction-repository');
var loadingService = require('../../loaders/loading-service');
var _ = require('lodash');

router.use(auth);

router.get('/list', function (req, res) {
    accountRepository.getAll(req.user, false).then(function (list) {
        res.send(list);
    });
});

router.get('/summary/:currency', function (req, res) {

    var currency = req.params.currency || 'GBP';
    accountRepository.getSummary(req.user, currency).then(function (summaries) {

        summaries = summaries.map(function (s) {
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

        var sum = _.reduce(_.map(summaries, 'balanceInCurrency'), function (sum, x) {
            return sum + x;
        });

        res.status(200).json({
            lines: summaries,
            total: sum
        });
    });
});

router.get('/list/all', function (req, res) {
    accountRepository.getAll(req.user, true).then(function (list) {
        res.send(list);
    });
});

router.post('/upload/:accountId', function (req, res) {
    console.log('Req: ', req);
    var file = req.files.file;
    var accountId = req.params.accountId;

    loadingService(req.user, [{
        path: file.path,
        name: file.name,
        accountId
    }]).then(function () {
        res.send('ok');
    }, function (err) {
        console.log(err);
        res.status(500).send(err);
    });
});

router.post('/new', function (req, res) {
    accountRepository.create(req.user, req.body).then(function (account) {
        res.send(account);
    }, function (err) {
        console.error(err);
        res.status(500).send(err);
    });
});

router.get('/:id', function (req, res) {
    accountRepository.getById(req.user, req.params.id).then(function (account) {
        res.send(account);
    });
});

router.get('/:id/transactions/:count', function (req, res) {
    transactionRepository.getByAccountId(req.user, req.params.id, req.params.count).then(function (transactions) {
        if (transactions) {
            res.send(transactions);
        } else {
            res.send([]);
        }
    });
});

router.get('/timeline/:currency', function (req, res) {
    transactionRepository.getTimeline(req.user, req.params.currency).then(function (timeline) {
        if (timeline) {
            res.status(200).send(timeline);
        } else {
            res.status(200).send([]);
        }
    }, function (err) {
        console.error(err);
        res.status(500).send(err);
    });
});

router.get('/:id/current', function (req, res) {
    transactionRepository.getTotal(req.user, req.params.id).then(function (total) {
        if (total) {
            res.status(200).send(total.toString());
        } else {
            res.status(200).send('0');
        }
    });
});

router.get('/saving/:currency/:rangeName', function (req, res) {
    transactionRepository.getSaving(req.user, req.params.currency, req.params.rangeName).then(function (saving) {
        res.status(200).send(saving);

    }, function (err) {
        console.error(err);
        res.status(500).send(err);
    });
});

router.get('/savings-per-year/:currency', function (req, res) {
    transactionRepository.getSavingsPerYear(req.user, req.params.currency).then(function (saving) {
        res.status(200).send(saving);

    }, function (err) {
        console.error(err);
        res.status(500).send(err);
    });
});

router.delete('/:id', function (req, res) {
    accountRepository.deleteAccount(req.user, req.params.id).then(function () {
        res.status(200).send('account deleted successfuly');
    }, function (err) {
        console.error(err);
        res.status(500).send(err);
    });
});

router.put('/:id/toggle-active', function(req, res){
    accountRepository.toggleActive(req.user, req.params.id).then(function (account) {
        res.status(200).send(account.isActive);
    }, function (err) {
        console.error(err);
        res.status(500).send(err);
    });
});

router.put('/:id/toggle-stat-enabled', function(req, res){
    accountRepository.toggleStatEnabled(req.user, req.params.id).then(function (account) {
        res.status(200).send(account.isStatEnabled);
    }, function (err) {
        console.error(err);
        res.status(500).send(err);
    });
});

module.exports = router;
