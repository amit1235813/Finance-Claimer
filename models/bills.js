const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const billSchema = new mongoose.Schema({
    billGroupKey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'billGroup', 
        required: true
    },
    billDate: {
        type: Date,
        required: [true, 'Bill date is required']
    },
    billPurpose: {
        type: String,
        enum: ['Travelling', 'Food', 'Admin', 'Miscellaneous'],
        required: [true, 'Bill purpose is required'],
    },
    travelMode: {
        type: String,
        required: [true, 'Mode of travel is required'],
        minlength: 3,
        maxlength: 255
    },
    travelOrigin: {
        type: String,
        required: [true, 'Origin of travel is required'],
        minlength: 3,
        maxlength: 255
    },
    travelDestination: {
        type: String,
        required: [true, 'Destination of travel is required'],
        minlength: 3,
        maxlength: 255
    },
    billAmount: {
        type: Number,
        required: [true, 'Bill amount is required'],
        min: 0,
        max: 50000
    }

});

const Bill = mongoose.model('bills', billSchema);

function validateBillReq (bill) {
    const schema = Joi.object({
        billDate: Joi.date().required(),
        billPurpose: Joi.string().required().min(1).max(255),
        travelMode: Joi.string().required().min(1).max(255), 
        travelOrigin: Joi.string().required().min(1).max(255),
        travelDestination: Joi.string().required().min(1).max(255),
        billAmount: Joi.number().integer().min(0).max(50000);
    });

    return schema.validate(bill);
};

module.exports.Bill = Bill;
module.exports.validateBillReq = validateBillReq;