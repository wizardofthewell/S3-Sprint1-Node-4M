////////////////////////////////////////////////
// Imports
const index = require("../views/index");
const logger = require("./logger");
const events = require("events");
class Event extends events {}
const emitEvent = new Event();
const fs = require("fs");

////////////////////////////////////////////////
// website routes
const indexPage = (response) => {
  if (global.DEBUG) console.log("index.html requested");
  response.statusCode = 200;
  index.page(response);
};

////////////////////////////////////////////////
// functions
const styleSheet = (response) => {
  fs.readFile("./views/files/style.css", (err, data) => {
    if (err) {
      console.log(err);
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("File not found");
    } else {
    }
    response.end(data);
  });
};

const notFoundPage = (response) => {
  if (global.DEBUG) console.log("Requested page does not exist.");
  response.statusCode = 404;
  response.end();
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
};
