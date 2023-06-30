////////////////////////////////////////////////
// Imports
const index = require("../views/index");
const login = require("../views/login");
const signUp = require("../views/signUp");
const logger = require("./logger");
const events = require("events");
class Event extends events {}
const emitEvent = new Event();
const fs = require("fs");

////////////////////////////////////////////////
// website routes
const indexPage = (response) => {
  if (global.DEBUG) console.log("Index page requested");
  response.statusCode = 200;
  index.page(response);
  console.log("stinky fart");
};

const loginPage = (response) => {
  if (global.DEBUG) console.log("Login page requested");
  response.statusCode = 200;
  login.page(response);
};

const signUpPage = (response) => {
  if (global.DEBUG) console.log("Login page requested");
  response.statusCode = 200;
  signUp.page(response);
};

const notFoundPage = (response) => {
  if (global.DEBUG) console.log("Requested page does not exist.");
  response.statusCode = 404;
  response.end();
};

////////////////////////////////////////////////
// functionality paths
const styleSheet = (response) => {
  fs.readFile("./views/files/style.css", (err, data) => {
    if (err) {
      console.log(err);
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("File not found");
    } else {
    }
    response.writeHead(200, { "Content-Type": "text/css" });
    response.end(data);
  });
};

const favicon = (response) => {
  fs.readFile("favicon.ico", (err, data) => {
    if (err) {
      console.log(err);
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("File not found");
    } else {
    }
    response.writeHead(200, { "Content-Type": "image/x-icon" });
    response.end(data);
  });
};
////////////////////////////////////////////////
// listener
emitEvent.on("log", (event, level, message) => {
  if (global.DEBUG) logger.logEvent(event, level, message);
});

////////////////////////////////////////////////
// export
module.exports = {
  indexPage,
  notFoundPage,
  styleSheet,
  loginPage,
  signUpPage,
  favicon,
};
