'use strict';

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var statusEnum = ['new', 'block', 'inProgress', 'done'];

var TaskSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    story: {
        type: Schema.Types.ObjectId,
        ref: 'Story',
        required: true
    },
    number: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: statusEnum,
        default: 'new'
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
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
    estimatedHours: {
        type: Number,
        min: 1,
        max: 4,
    },
    actualHours: {
        type: Number,
        min: 1
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    modifiedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    modifiedDate: {
        type: Date
    }
});

var Task = mongoose.model('Task', TaskSchema);

module.exports = Task;