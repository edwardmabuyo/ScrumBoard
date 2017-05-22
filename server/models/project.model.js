'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    stories: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Story'
        }]
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
});

var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;