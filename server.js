const express = require('express');
const bodyParser = require('body-parser');
const posts = require('./routes/posts/index');
const config = require('./config');
const errorHandler = require('./error-handler');

require('./mongo-client');
const app = express();

// parse application/json
app.use(bodyParser.json());

app.use('/posts', posts);

app.use(errorHandler);

app.listen(config.port, function() {
    console.log('Server started on port ' + config.port)
});
