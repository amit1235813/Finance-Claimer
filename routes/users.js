const { User, validateUserReq } = require('../models/users');

const express = require('express');
const router = express.Router();

const _ = require('lodash');

// console.log('entered the users route file');
// router.get('/', (req, res) => {
//     res.send('Hello World');
// });

router.get('/', async (req, res) => {
    const users = await User.find().sort('firstName');
    console.log(users);
    //https://stackoverflow.com/questions/37877860/lodash-pick-object-fields-from-array
    res.send(_.map(users, _.partialRight(_.pick, ['_id', 'firstName', 'lastName', 'userRole'])));
});

router.get('/:id', async (req, res) => {
    const users = await User.find().sort('firstName');
    console.log(users);
    //https://stackoverflow.com/questions/37877860/lodash-pick-object-fields-from-array
    res.send(_.map(users, _.partialRight(_.pick, ['_id', 'firstName', 'lastName', 'userRole'])));
});

router.post('/', async (req, res) => {
    //Add validation
    const { error } = validateUserReq(req.body);
    if (error) {
        //Joi returns a 400 bad request error - need to improve syntax of request body
        return res.status(400).send(error.details[0].message);
    }
    console.log('User details received by Express - create', req.body);
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

    //Condition - Do not save bank details for specific users
    //https://stackoverflow.com/questions/12636938/set-field-as-empty-for-mongo-object-using-mongoose
    if (user.userRole === 'Mumbai Team' ||  user.userRole === 'Delhi Team') {
        user.accountName = undefined;
        user.bankName = undefined;
        user.bankAccountNumber = undefined;
        user.ifscCode = undefined;
    }

    user = await user.save();

    res.send(_.pick(user, ['_id', 'firstName', 'userRole'])); //Edit code to send only ID, first name and userRole
});

router.put('/:id', async(req, res) => {
    const { error } = validateUserReq(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    console.log('User details received by Express - edit', req.body);
    const user = await User.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userRole: req.body.userRole,
        accountName: req.body.accountName,
        bankName: req.body.bankName,
        bankAccountNumber: req.body.bankAccountNumber,
        ifscCode: req.body.ifscCode
    }, {
        new: true //Shows the object in res after the update is applied
        //https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
    });

    if (!user) {
        return res.status(404).send('The user with the given ID was not found');
    }

    res.send(user);
});

module.exports = router;