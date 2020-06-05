const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        //Removes whitespace from beginning and end of a string
        //https://docs.mongodb.com/manual/reference/operator/aggregation/trim/
        trim: true,
        required: [true, 'First name is required'],
        minlength: 1,
        maxlength: 255
        
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last name is required'],
        minlength: 1,
        maxlength: 255
        
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
        unique: true,
        //https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
        match: [/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]+)(\.[a-z]+)*$/, 'Please enter a valid email address'],
        minlength: 1,
        maxlength: 255
    },
    userRole: {
        type: String,
        required: [true, 'Uuser role is required'],
        enum: ['Project Manager',
                'Associate Project Manager',
                'Bangalore Team',
                'Mumbai Team',
                'Delhi Team'
            ],
        minlength: 1,
        maxlength: 255
    },
    accountName: {
        type: String,
        trim: true,
        //Required function checks if type is string
        //https://mongoosejs.com/docs/api.html#schematype_SchemaType-checkRequired,
        //required: function() [{ return this.userRole === 'Project Manager'; }, 'YOUR CUSTOME MSG HERE'],
        // required: function () {
        //     return this.userRole === 'Project Manager';
        // },
        minlength: 1,
        maxlength: 255,
        //required: function() { return this.userRole === 'Project Manager' }
    },
    bankName: {
        type: String,
        trim: true,
        //required: [true, 'Bank name is required'],
        minlength: 1,
        maxlength: 255
    },
    bankAccountNumber: {
        type: Number,
        //required: true
    },
    ifscCode: {
        type: String,
        trim: true,
        uppercase: true,
        //required: [true, 'IFSC Code is required'],
        minlength: 11,
        maxlength: 11,
        //Any 4 alphabets followed by a 0 followed by 6 alphabets
        //https://en.wikipedia.org/wiki/Indian_Financial_System_Code
        match: [/^[a-zA-Z]{4}0[a-zA-Z]{6}$/, 'Please enter a valid IFSC code'],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String        
    }
});

//userSchema.path('accountName').required(function() { return this.userRole === 'Project Manager'; }, 'your custom message here');

const User = mongoose.model('user', userSchema);

function validateUserReq (user) {
    const schema = Joi.object({
        firstName: Joi.string().min(1).max(255).required(),
        lastName: Joi.string().min(1).max(255).required(),
        email: Joi.string().min(1).max(255).required(),
        userRole: Joi.string().min(1).max(255).required()
                    .valid('Project Manager',
                    'Associate Project Manager',
                    'Bangalore Team',
                    'Mumbai Team',
                    'Delhi Team'),
                    accountName: Joi.any(),
                    bankName: Joi.any(),
                    bankAccountNumber: Joi.any(),
                    ifscCode: Joi.any()
        // accountName: Joi.string().min(1).max(255),
        // bankName: Joi.string().min(1).max(255),
        // bankAccountNumber: Joi.number(),
        // ifscCode: Joi.string().min(1).max(255).regex(RegExp("^[a-zA-Z]{4}0[a-zA-Z\d]{6}$")),
    });

    return schema.validate(user);
};

function validateEmail (emailId) {
    const schema = Joi.object({
        email: Joi.string().min(1).max(255).required(),
    });

    return schema.validate(emailId);
};

module.exports.User = User;
module.exports.validateUserReq = validateUserReq;
module.exports.validateEmail = validateEmail;