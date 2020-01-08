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
          role : "customer"
      }
  ]

  res.status(HttpStatus.OK).json({success: true, msg: 'Ok',data:response});
  
};
// Test API - End

// Test API - Start
async createCustomer(req, res) {

  req.assert("username", "User name is required").notEmpty(); // express validators
  req.assert("phone", "Phone number is required").notEmpty();
  req.assert("mail", "Mail is required").notEmpty();
  req.assert("password", "Password is required").notEmpty().isLength({ min: 6, max: 30 });;

 var errors = req.validationErrors();

    if (!errors) {
    let data = req.body;

    serviceHandler.createCustomer(data)
      .then((response) => {
        if(response.length != 0){
          return res.status(HttpStatus.OK).json({ success: true, msg: 'Ok!', data: response });
        }else{
          return res.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({ success: false, msg: 'No data' });
        }
        
      })
      .catch((error) => {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Internal server error', error: error });
      })
   }else {
          return res.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({ success: false, msg: 'Required params missing', errors: errors });
      }
};
// Test API - End
}


module.exports = new RouteHandler();
