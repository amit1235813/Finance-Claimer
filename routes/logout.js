// const {User, validateEmail, validateUserReq} = require('../models/users');

const express = require('express');
const router = express.Router();

// const _ = require('lodash');
// const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  console.log('Express - Request received to logout');

  res.clearCookie('jwt')
  
  res.send('User logged out');
});

module.exports = router;