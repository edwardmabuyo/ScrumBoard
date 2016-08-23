'use strict';

const http = require('http');
const fs = require('fs');
const config = require('./config/config');

var httpPort = 8080;
const server = http.createServer();
require('./server/app')(config, server);

server.listen(httpPort, function () {
    console.log('NODE_ENV: ', process.env.NODE_ENV);
    console.log('[HTTP SERVER] Listening to port ' + httpPort);
});



