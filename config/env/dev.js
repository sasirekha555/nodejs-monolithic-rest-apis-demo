'use strict';

module.exports = {
  app: {
      title: 'demo',
      description: 'demo'
  },
  db: {
      mongodb: {
          uri: 'Your DB link goes here',
          options: {
              user: '',
              pass: ''
          },
          debug: process.env.MONGODB_DEBUG || false
      }
  },
  jwt: {
      normal: {
          secret: 'qCZe6np3uSELbnQDP4JBvFkRmbbFw4aAwq',
          expiresIn: '30d' //30 days
      },
      password: {
        secret: 'gJdFGPq22rVZDJWP9XnhUwRjy3U5whDy',
        expiresIn: '1h'
      }
  },
  cors : {
    list : [,'http://127.0.0.1:3000','http://localhost:3001']
  },

  winston: {
      console: {
          colorize: true,
          timestamp: true,
          prettyPrint: true
      },
      file: {
          filename: 'logs/error.log',
          timestamp: true,
          maxsize: 2048,
          json: true,
          colorize: true,
          level: 'error'
      }
  },

  website: '',
  port: process.env.PORT || 3030
};

