import * as express from "express";
import * as compression from "compression";  // compresses requests
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
// import * as path from "path";
// import * as passport from "passport";
import * as expressValidator from "express-validator";
// import * as bluebird from "bluebird";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env.default" });

// Controllers (route handlers)
import * as v1ApiController from "./controllers/v1/api";
// import * as v1MessageDtoValidator from "./controllers/v1/validators/messageDto";

// API keys and Passport configuration
// import * as passportConfig from "./config/passport";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.NODEJS_PORT || 8080);
app.set("host", process.env.NODEJS_HOST || "127.0.0.1");

app.use(compression());
app.use(bodyParser.json({type: "application/json"}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

/**
 * API examples routes.
 */
app.post("/api/v1/mail/send",           v1ApiController.postMailSend);
app.post("/api/v1/mail/send/send-grid", v1ApiController.postMailSendSendGrid);
app.post("/api/v1/mail/send/main-gun",  v1ApiController.postMailSendMailGun);

/**
 * Error handling
 */
app.use((req, res) => {
  res.status(404).send({error: req.originalUrl + " not found"});
});


module.exports = app;
