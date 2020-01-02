'use strict';

/**
 * Module dependencies.
 */

const config = require('../config');
const chalk = require('chalk');
const path = require('path');
const mongoose = require('mongoose');

// Load the mongoose models
export function loadModels(callback) {
    // Globbing model files
    config.files.models.forEach(function(modelPath) {
        require(path.resolve(modelPath));
    });
};

// Initialize Mongoose
export function connect(cb) {
    var _this = this;

    var db = mongoose.connect(config.db.mongodb.uri, config.db.mongodb.options, function(err) {
        // Log Error
        if (err) {
            console.error(chalk.red('Could not connect to MongoDB!'));
            console.log(err);
        } else {

            // Enabling mongoose debug mode if required
            mongoose.set('debug', config.db.debug);

            // Call callback FN
            if (cb) cb(db);
        }
    });
};

export function disconnect(cb) {
    mongoose.disconnect(function(err) {
        console.info(chalk.yellow('Disconnected from MongoDB.'));
        cb(err);
    });
};