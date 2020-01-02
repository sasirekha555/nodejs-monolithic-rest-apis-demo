'use strict';

const express = require( 'express');

const users = require( '../../handlers/users/routes');
const customers = require( '../../handlers/customers/routes');

let app = express();

new users(app).routesConfig();
new customers(app).routesConfig();

module.exports = app;



