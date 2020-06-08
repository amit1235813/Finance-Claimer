const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const projectSchema = new mongoose.Schema({
    projectId: {
        type: Number,
        required: [true, 'Project ID is required'],
        min: 100,
        max: 999
    },
    projectName: {
        type: String,
        trim: true,
        required: [true, 'Project name is required'],
        minlength: 1,
        maxlength: 255
    },
    projectManagerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: [true, 'Project Manager KEY is required']
    }
});

const Project = mongoose.model('projects', projectSchema);

function validateProjectReq (project) {
    const schema = Joi.object({
        projectName: Joi.string().min(1).max(255).required(),
        projectId: Joi.number().integer().min(100).max(999).required(),
    });

    return schema.validate(project);
};

module.exports.Project = Project;
module.exports.validateProjectReq = validateProjectReq;