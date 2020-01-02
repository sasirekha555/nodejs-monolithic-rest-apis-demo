'use strict';
/**
 * Module dependencies.
 */

const chalk = require('chalk');
const config = require('../config');
const express = require('./express');

const events = require("events");
events.EventEmitter.prototype._maxListeners = 100;

var app = express();
var http = require('http').Server(app);

var mongoose = require('mongoose');
mongoose.connect(config.db.mongodb.uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // console.log("h");
});


var server = app.listen(config.port,  function () {
	var port = server.address().port;
  console.log('Server running on port', port);
});


module.exports = app


