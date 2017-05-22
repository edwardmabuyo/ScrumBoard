'use strict';

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var storyPointEnum = [1, 2, 3, 5, 8];

var StorySchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
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
    point: {
        type: Number,
        enum: storyPointEnum
    },
    task: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }]
    }
});

var Story = mongoose.model('Story', StorySchema);

module.exports = Story;