const express = require('express');

const router = express.Router();
const passport = require('passport');
const auth = require('./../auth').auth;

// router.post('/login', passport.authenticate('local', { session: true }), function (req, res) {
//     res.send(req.user);
// });

// router.post('/logout', function (req, res) {
//     if (req.isAuthenticated()) {
//         req.logout();
//         req.session.messages = "Log out successfully";
//         res.send('ok');
//     }
// });
//
// router.get('/user', function (req, res) {
//     res.send(req.user);
// });


module.exports = router;
