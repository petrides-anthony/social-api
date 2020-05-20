var express = require("express");
var users = require("./routes/");
var config = require('./config');

var app = express();

app.use("/", users);

app.listen(config.port, function() {
    console.log("Server started on port " + config.port)
});