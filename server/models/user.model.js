'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userRoleEnum = ['engineer', 'productowner', 'scrummaster', 'qa'];

var UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        match: /^.+@.+\..+$/,
        required: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    projects: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }]
    },
    role: {
        type: String,
        enum: userRoleEnum
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;