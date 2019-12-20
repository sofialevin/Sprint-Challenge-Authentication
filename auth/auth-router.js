const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/usersModel.js');

router.post('/register', (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  const token = signToken(user);

  Users.add(user)
    .then(saved => {
      res.status(201).json({
        token: token,
        message: `Welcome ${user.username}!`,
      });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  // implement login
});

function signToken(user) {
  const payload = {
    username: user.username,
    department: user.department
  };

  const secret = process.env.JWT_SECRET || "shhhhh, secret!";

  const options = {
    expiresIn: "24h"
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
