'use strict';

function MongooseProvider(config) {
    const mongoose = require('mongoose');
    mongoose.Promise = Promise;
    console.log(config.uri);
    var connection = mongoose.connect(config.uri);
    connection
        .then(() => console.log('Mongo connected'))
        .catch((error) => console.log('Mongo Error:', error));

    return connection;
}

module.exports = MongooseProvider;