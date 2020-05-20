var express = require('express');
var bodyParser = require('body-parser');

var users = require('./routes/');
var posts = require('./routes/posts');
var config = require('./config');
var errorHandler = require('./error-handler');

var app = express();

// parse application/json
app.use(bodyParser.json());

app.use('/', users);
app.use('/posts', posts);

app.use(errorHandler);

app.listen(config.port, function() {
    console.log('Server started on port ' + config.port)
});
