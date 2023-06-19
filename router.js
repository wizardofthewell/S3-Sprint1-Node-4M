////////////////////////////////////////////////
// Imports
const index = require("./views/index");
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
  // .views bc stack begins at App.js
  fs.readFile("./views/files/style.css", (err, data) => {
    if (err) {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("File not found");
    } else {
    }
    response.writeHead(response.statusCode, { "Content-Type": "text/css" });
    response.end(data);
  });
};

const image = (path, response) => {
  fs.readFile(`./views${path}`, (err, data) => {
    if (err) {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("image not found");
    }
    response.writeHead(response.statusCode, { "Content-Type": "image/JPG" });
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
  // aboutPage,
  // contactPage,
  // productsPage,
  // subscribePage,
  // notFoundPage,
  // weatherPage,
  // stylePage,
  // imageRes,
  // newsPage,
};
