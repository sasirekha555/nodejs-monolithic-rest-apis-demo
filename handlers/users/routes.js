const routeHandler = require('./route-handler');
var http = require('http');

class Routes {
  constructor(app) {
    this.app = app;
  }
  

  /* creating app Routes starts */
  appRoutes() {
    this.app.get('/v1.0/users/testapi', routeHandler.testApi);
  }

  
  /* creating app Routes ends */
  routesConfig() {
    this.appRoutes();
  }
}
module.exports = Routes;
