const mongoose = require('mongoose');

const {
  mongo_host,
  mongo_port,
  mongo_database,
} = require('./config');

const connStr = `mongodb://${mongo_host}:${mongo_port}/${mongo_database}`;

mongoose.connect(connStr, {useNewUrlParser: true});