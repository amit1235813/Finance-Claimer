const { User, validateUserReq } = require('../models/users');

const express = require('express');
const router = express.Router();

// console.log('entered the users route file');
// router.get('/', (req, res) => {
//     res.send('Hello World');
// });

router.post('/', async (req, res) => {
    //Add validation
    const { error } = validateUserReq(req.body);
    if (error) {
        //Joi returns a 400 bad request error - need to improve syntax of request body
        return res.status(400).send(error.details[0].message);
    }
    console.log('User details received by Express', req.body);
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userRole: req.body.userRole,
        accountName: req.body.accountName,
        bankName: req.body.bankName,
        bankAccountNumber: req.body.bankAccountNumber,
        ifscCode: req.body.ifscCode
    });

    user = await user.save();

    res.send(user) //Edit code to send only ID, first name and urerRole
});

module.exports = router;