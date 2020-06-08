const {User, validateEmail} = require('../models/users');

const express = require('express');
const router = express.Router();

const _ = require('lodash');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  console.log('Express - Request object received to login', req.body);
  //Validate email, issue with the validation function
  // const { error } = validateEmail(req.query.email); 
  // if (error) {
  //   console.log('User Model - Error while validating email');  
  //   return res.status(400).send(error.details[0].message);
  // }

  let user = await User.findOne({ email: req.body.email});
  console.log('Express - user found on email verification', user);
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  // console.log('Hashed password from database :', user.password);
  // console.log('Password being sent while login :', req.body.password);
  // console.log('Express - password validity check on login :', validPassword);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();
  res.cookie('jwt', token, {httpOnly: true});
  res.send('Login was successful');
});

module.exports = router;