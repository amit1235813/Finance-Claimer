const { User, validateUserReq } = require('../models/users');

const express = require('express');
const router = express.Router();
require('express-async-errors');
const _ = require('lodash');

// console.log('entered the users route file');
// router.get('/', (req, res) => {
//     res.send('Hello World');
// });

router.get('/', async (req, res) => {
    console.log('Express being called to view all users');
    const users = await User.find().sort('firstName');
    // console.log(users);
    //https://stackoverflow.com/questions/37877860/lodash-pick-object-fields-from-array
    res.send(_.map(users, _.partialRight(_.pick, ['_id', 'firstName', 'lastName', 'userRole'])));
});

router.get('/user', async (req, res) => {
    console.log('Express being called to view details of a single user');
    console.log('Req object received by Express to view details of a single user', req.body, req.params);
    const user = await User.find({
        firstName : req.query.p1,
        lastName : req.query.p2
    }).limit(1).select('-__v'); //Get only one response
    //Do not get version key - https://stackoverflow.com/questions/13699784/mongoose-v-property-hide/22436385
    console.log(user);
    //https://stackoverflow.com/questions/37877860/lodash-pick-object-fields-from-array
    res.send(user);
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

router.put('/user', async(req, res) => {
    console.log('Reached Express Put function to edit user details');
    const { error } = validateUserReq(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    console.log('User details received by Express - edit', req.body);
    const user = await User.findByIdAndUpdate(req.query.p1, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userRole: req.body.userRole,
            accountName: req.body.accountName,
            bankName: req.body.bankName,
            bankAccountNumber: req.body.bankAccountNumber,
            ifscCode: req.body.ifscCode
        }
    }, {
        new: true //Shows the object in res after the update is applied
        //https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
    });

    if (!user) {
        return res.status(404).send('The user with the given ID was not found');
    }

    res.send(user);
});

router.delete('/user', async(req, res) => {
    console.log('Reached Express Delete function to delete user details');
    const user = await User.deleteOne({
        firstName : req.query.p1,
        lastName : req.query.p2
    });

    if (!user) {
        return res.status(404).send('The user with the given ID was not found');
    }

    res.send(user);
})

module.exports = router;