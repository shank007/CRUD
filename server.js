/**
 * @author Girijashankar Mishra
 * @version 1.0.0
 * @since 13-August-2018
 */
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var http = require('http');
var config = require('./config.json');

var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var cors = require('cors');

app.use(cors());
app.use(helmet());
app.use(cookieParser());

var server = http.createServer(app);

var mongo = require('mongodb').MongoClient;

app.get('/', function (req, res) {
    res.send('CRUD App');
})


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/app',require('./app/crud.js'));

var server = app.listen(config.port, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Server listening on http://%s:%s", host, port)
})

module.exports = server