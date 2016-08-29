'use strict';

var env = require('get-env')({
    dev: ['dv', 'dev', 'development'],
    qa: ['qa'],
    staging: ['stg', 'stage', 'staging'],
    prod: ['pr', 'prod', 'production']
});

if (!env) {
    env = 'dev';
}

module.exports = require('./config.json')[env];
