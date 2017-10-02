var express = require('express');
var app = express();
var server = require('http').Server(app);

server.listen(3000, function() {
    console.log("Server its ready");
});

var index = require('./routes/index');
var clients = require('./routes/clients');
var policies = require('./routes/policies');

app.use('/', index);
app.use('/client', clients);
app.use('/policy', policies);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    if (err.name === 'UnauthorizedError') {
        err.status = 401;
    }
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 400)
        .json({
            message: err.message,
            error: {},
            title: 'error'
        }
    );
});

module.exports = app;