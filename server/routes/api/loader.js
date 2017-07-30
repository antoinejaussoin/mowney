var express = require('express');
var router = express.Router();
var auth = require('./../../auth').auth;
var models = require('../../models');
var loaders = require('../../loaders/loader-factory');
var _ = require('lodash');

router.use(auth);

router.get('/list', function (req, res) {
    res.send(loaders.list.map(function(l){
        return {
            name: l.name,
            type: l.type
        };
    }));
});

module.exports = router;
