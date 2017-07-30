var express = require('express');
var router = express.Router();
var userRepository = require('../repositories/user-repository');


router.post('/user', function(req, res) {
    userRepository.register(req.body, function(err) {
        if (err) {
            res.send(500, 'This user already exists');
        } else
            res.send(200);
    })
})

module.exports = router;
