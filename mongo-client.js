var mongojs = require('mongojs');
var config = require('./config');

var connStr = 'mongodb://' + config.mongo_host;
connStr += ':' + config.mongo_port;
connStr += '/' + config.mongo_database;

module.exports = mongojs(connStr, ['students']);