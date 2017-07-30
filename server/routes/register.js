const express = require('express');

const router = express.Router();
const userRepository = require('../repositories/user-repository');


router.post('/user', (req, res) => {
  userRepository.register(req.body, (err) => {
    if (err) {
      res.send(500, 'This user already exists');
    } else { res.send(200); }
  });
});

module.exports = router;
