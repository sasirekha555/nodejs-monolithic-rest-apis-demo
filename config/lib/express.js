'use strict';

/**
 * Module dependencies.
 */

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const winston = require('winston');
const logger = require('logops');
const expressLogging = require('express-logging');
const expressValidator = require('express-validator');
const config = require('../config');
const routes = require('../routes/routes');
//import utils from '../../common/utils';


function initMiddleware(app) {
    // Showing stack errors
    app.set('showStackError', true);

    // Enable jsonp
    app.enable('jsonp callback');
    app.set('view engine', 'ejs');
    app.use(bodyParser.json({ limit: '100mb' }));
    app.use(bodyParser.urlencoded({
         limit: '100mb',
         parameterLimit: 100000000,
         extended: true //extended: true
     })); 
    app.use(methodOverride());
    app.use(expressValidator())
    // Add the cookie parser and flash middleware
    app.use(cookieParser());
    app.use(cors());
    app.use(helmet());
    app.use(express.static('public'));
    app.get('/',function(req,res){
        //res.render('index');
        res.send("Welcome to " +process.env.NODE_ENV+ " Environment");
    });
    
}



/**
 * Configure the modules server routes
 */
function initModulesRoutes(app) {
    // Globbing routing files
    // config.files.routes.forEach(function (routePath) {
    //   require(path.resolve(routePath))(app);
    // });
    app.use(routes);

}

/**
 * Configure Cors module to allow specific domains
 */

function handleCors(app) {
//     if(process.env.NODE_ENV == 'local' || process.env.NODE_ENV == 'dev'){
//         app.use(cors())
//     }else{
//     console.log(process.env.NODE_ENV,'cors');
//     var whitelist = config.cors.list;
//     var corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//         callback(null, true)
//         } else {
//         callback(new Error('Not allowed by CORS'))
//         }
//     }
//     }
//     app.use(cors(corsOptions));
//  }
app.use(cors())
}

/**
 * Initialize the Express application
 */
module.exports = function init(db) {
    // Initialize express app
    let app = express();
    app.use(expressLogging(logger));
    app.enable('trust proxy');

    initMiddleware(app);

    handleCors(app);

    initModulesRoutes(app);

    winston.loggers.add('platform-core', {
        console: config.winston.console,
        file: config.winston.file
    });

    winston.loggers.get('platform-core');

    return app;
}
