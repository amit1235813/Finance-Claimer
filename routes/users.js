const { User } = require('../models/users');

const express = require('express');
const router = express.Router();

// console.log('entered the users route file');
// router.get('/', (req, res) => {
//     res.send('Hello World');
// });

router.post('/', async (req, res) => {
    //Add validation
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        userRole: req.body.userRole,
        accountName: req.body.accountName,
        bankName: req.body.bankName,
        bankAccountNumber: req.body.bankAccountNumber,
        ifscCode: req.body.ifscCode
    });

    user = await user.save();

    res.send(user) //Edit code to send only ID, name and urerRole
});

module.exports = router;