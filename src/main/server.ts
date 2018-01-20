import * as errorHandler from "errorhandler";

const app = require("./app");

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), app.get("host"), () => {
  console.log(("  App is running at http://%s:%d in %s mode"), app.get("host"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

export = server;
