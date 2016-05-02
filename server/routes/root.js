var express = require('express');
var router = express.Router();
var passport = require('passport');
var auth = require('./../auth').auth;

router.post('/login', passport.authenticate('local', { session: false }), function (req, res) {
    res.redirect('/');
});

router.post('/logout', function (req, res) {
    if (req.isAuthenticated()) {
        req.logout();
        req.session.messages = "Log out successfully";
        res.send('ok');
    }
});

router.get('/user', function (req, res) {
    res.send(req.user);
});


module.exports = router;
