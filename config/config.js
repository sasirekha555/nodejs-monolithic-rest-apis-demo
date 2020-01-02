'use strict';

/**
 * Module dependencies.
 */

const _ = require('lodash');
const glob = require('glob');
const chalk = require('chalk');
const path = require('path');

/**
 * Get files by glob patterns
 */
const getGlobbedFiles = function (globPatterns, removeRoot) {
  // For context switching
  let _this = this;

  // URL paths regex
  let urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

  // The output array
  let output = [];

  // If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
  if (_.isArray(globPatterns)) {
    globPatterns.forEach(function (globPattern) {
      output = _.union(output, getGlobbedFiles(globPattern, removeRoot));
    });
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      let files = glob.sync(globPatterns);

      if (removeRoot) {
        files = files.map(function (file) {
          return file.replace(removeRoot, '');
        });
      }

      output = _.union(output, files);
    }
  }

  return output;
};

const validateEnvironmentVariable = function () {
  /**
   * Before we begin, lets set the environment variable
   * We'll Look for a valid NODE_ENV variable and if one cannot be found load the development NODE_ENV
   */
  console.log(process.env.NODE_ENV);
  if (!process.env.NODE_ENV || process.env.NODE_ENV === undefined) {
    console.error(chalk.red('NODE_ENV is not defined! Using default development environment'));
    process.env.NODE_ENV = '';
  } else {
    let environmentFiles = glob.sync('./config/env/' + process.env.NODE_ENV + '.js');

    if (environmentFiles.length) {
      console.log(chalk.green.bgWhite('Application loaded using the "' +
      process.env.NODE_ENV + '" environment configuration'));
    } else {
      console.error(chalk.red('+ Error: No configuration file found for "' +
      process.env.NODE_ENV + '" environment using development instead'));
      process.env.NODE_ENV = '';
    }
  }
};

/**
 * Initialize global configuration files
 */
const initGlobalAppFiles = function (config, assetss) {
  // Appending files
  const assets = {
    gruntConfig: 'gruntfile.js',
    allJS: ['server.js', 'config/**/*.js', 'api/**/*.js'],
    models: 'api/*/models/**/*.js',
    routes: ['api/*/routes/**/*.js'],
    policies: 'api/*/policies/**/*.js'
  };

  config.files = {};

  // Setting Globbed model files
  config.files.models = getGlobbedFiles(assets.models);

  // Setting Globbed route files
  config.files.routes = getGlobbedFiles(assets.routes);

  // Setting Globbed policies files
  config.files.policies = getGlobbedFiles(assets.policies);
};

/**
 * Initialize global configuration
 */
function initGlobalConfig() {

  //dev, local, qa, production

  process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

  //mongodb://<dbuser>:<dbpassword>@ds263520.mlab.com:63520/heroku_cr8kplvv

  validateEnvironmentVariable();

  let config = _.merge(
    require('./env/' + process.env.NODE_ENV) || {}
  );

  // let assets = require(path.join(process.cwd(), 'config/assets/default'));

  // read package.json for MEAN.JS project information
  let pkg = require(path.resolve('./package.json'));
  config.packageJson = pkg;

  // Initialize global globbed applicaiton files
  initGlobalAppFiles(config, {});

  // // Expose configuration utilities
  config.utils = {
    getGlobbedFiles: getGlobbedFiles
  };

  return config;
};

module.exports = initGlobalConfig();

