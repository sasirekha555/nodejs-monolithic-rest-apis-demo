const serviceHandler = require('./service-handler');
const HttpStatus = require('http-status-codes');


/*
 Version : 1.0 
 author : Sasi rekha
*/


class RouteHandler {

// Test API - Start
async testApi(req, res) {

  let response = [
      {
          name : "Sasi rekha",
          role : "user"
      }
  ]

  res.status(HttpStatus.OK).json({success: true, msg: 'Ok',data:response});
  
};
// Test API - End
}


module.exports = new RouteHandler();
