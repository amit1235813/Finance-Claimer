const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const billGroupSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User KEY is required'],
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required'],
        validate: {
            validator: function() {
                return this.startDate <= this.endDate;
            },
            message: 'End date should be greater than start date'
        }
    },
    projectKey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, 'Project KEY is required']
    },
    checkedById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Checked by is required']
    },
    checkedStatus: {
        type: String,
        enum: ['Unchecked', 'Checked by Bangalore team'],
        required: [true, 'Checked status is required']
    },
    approvedById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Approved by KEY is required']  
    },
    approvalStatus: {
        type: String,
        enum: ['Approved by Bangalore team',
            'Hold By Bangalore team',
            'Rejected by Bangalore team',
            'Approved by Mumbai team',
            'Hold By Mumbai team',
            'Rejected by Mumbai team',
            'Approved by Delhi team',
            'Hold By Delhi team',
            'Rejected by Delhi team'],
        required: [true, 'Approval status is required']
    },
    billIssueId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bill'
    }]

});

const billGroup = mongoose.model('billGroups', billGroupSchema);

function validatebillGroupReq (billGroup) {
    const schema = Joi.object({
        startDate: Joi.date().required(),
        endDate: Joi.date().required()
    });

    return schema.validate(billGroup);
};

module.exports.billGroup = billGroup;
module.exports.validatebillGroupReq = validatebillGroupReq;