var express = require('express');
var router = express.Router();
var auth = require('./../../auth').auth;
var models = require('../../models');
var userRepository = require('../../repositories/user-repository');
var _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../../../config');

const expires = 1440*60*30; // 30 days

router.post('/login', function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    console.log('Login ', email, password);
    userRepository.login(email, password, (err, dbUser) => {
        if (err) {
            res.status(401).send(err);
            return;
        }

        const user = _.pick(dbUser, ['firstName', 'lastName', 'email', 'isAdmin', 'id']);
        var token = jwt.sign(user, config.tokenSecret, {
          expiresIn: expires
        });

        res.send({ token, user });
    });
});

module.exports = router;


//
//
//
// const jwt = require('jsonwebtoken');
// const db = require('../../models');
// const config = require('../../../config');
// const _ = require('lodash');
//
// module.exports = function(user, password) {
//     return new Promise((resolve, reject) => {
//         // find the user
//         console.log('Authenticating '+user);
//         const expires = 1440*60*30; // 30 days
//         db.User.findOne({
//             where: {
//                 email: user
//             }
//         }).then(function(dbUser) {
//
//           if (!dbUser) {
//              return resolve({ success: false, message: 'Authentication failed. User not found.' });
//         } else if (dbUser) {
//
//             // check if password matches
//             dbUser.verifyPassword(password).then(function (isOk) {
//                 if (!isOk) {
//                     return resolve({ success: false, message: 'Authentication failed. Wrong password.' });
//                 } else {
//                     // if user is found and password is right
//                     // create a token
//                     const user = _.pick(dbUser, ['firstName', 'lastName', 'email', 'isAdmin', 'id']);
//                     var token = jwt.sign(user, config.tokenSecret, {
//                       expiresIn: expires // expires in 24 hours
//                     });
//
//                     return resolve({ success: true, token, user });
//                 }
//             }, function (error){
//                 console.error(error);
//                 return reject({ success: false, message: 'Authentication failed. User not found.' });
//             });
//           }
//
//         });
//     });
//
//
//  };
