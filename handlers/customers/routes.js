const routeHandler = require('./route-handler');

class Routes {
  constructor(app) {
    this.app = app;
  }
  

  /* creating app Routes starts */
  appRoutes() {
    this.app.get('/v1.0/customers/testapi', routeHandler.testApi);
  }
  /* creating app Routes ends */


  routesConfig() {
    this.appRoutes();
  }
}
module.exports = Routes;
