var express = require('express');
var app = express();
var router = express.Router();
var models = require('../../models');
var importer = require('../../import/importer');
var ratesImporter = require('../../import/rates');
var path = require('path');
var auth = require('./../../auth').auth;
var _ = require('underscore');

router.use(auth);

router.get('/users', function (req, res) {
    models.User.findAll().success(function (users) {
        res.send(users);
    });
});

router.get('/import', function (req, res) {
    var file = path.resolve(__dirname + '/../data.xml');
    importer(file, function (err, data) {
        if (err) {
            res.send('error :' + err);
        } else {
            res.send(data);
        }
    });
});

router.get('/import-currencies', function (req, res) {

    ratesImporter(function (err, data) {
        if (err)
            res.send('error :' + err);
        else
            res.send(data);
    });
});



module.exports = router;
