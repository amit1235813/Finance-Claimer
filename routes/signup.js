const express = require('express');
const router = express.Router();

const _ = require('lodash');
const bcrypt = require('bcrypt');

const {User, validateEmail, validateUserReq} = require('../models/users');

router.get('/verify', async (req, res) => {
  console.log('Express - Request query received to verify email', req.query);
  //Validate email, issue with the validation function
  // const { error } = validateEmail(req.query.email); 
  // if (error) {
  //   console.log('User Model - Error while validating email');  
  //   return res.status(400).send(error.details[0].message);
  // }

  let user = await User.findOne({ email: req.query.email});
  console.log('Express - user found on email verification', user);
  if (!user) return res.status(400).send('Email not found');

  res.send(_.pick(user, ['email', '_id']));
});

router.put('/user', async (req, res) => {
  console.log('Express - Request object received to add password on signup', req.body);
  let user = await User.findById(req.body._id);
  if (!user) return res.status(400).send('User not found');
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  user = await user.save();
  res.send(_.pick(user, ['firstName', 'isAdmin']));
});

module.exports = router;