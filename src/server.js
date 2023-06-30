////////////////////////////////////////////////
// imports
const http = require("http");
const router = require("./router");
const logger = require("./logger");
const events = require("events");
class Event extends events {}
const emitEvent = new Event();
const tokenApp = require("crc");

////////////////////////////////////////////////
// constant
const cookieExp = new Date(Date.now() + 86400000);

////////////////////////////////////////////////
// server
const serverSwitch = http.createServer(async (req, response) => {
  // router switch
  switch (req.url) {
    case "/":
      response.statusCode = 100;
      response.setHeader(
        "Set-Cookie",
        `cookiename=server${req.url}cookie; Expirespons=${cookieExp}; Path=${req.url}`
      );
      await router.indexPage(response);
      emitEvent.emit("log", "server", "PAGE", `${req.url} visited`);
      break;

    case "/login":
      response.statusCode = 100;
      response.setHeader(
        "Set-Cookie",
        `cookiename=server${req.url}cookie; Expiresponse=${cookieExp}; Path=${req.url}`
      );
      await router.loginPage(response);
      emitEvent.emit("log", "server", "PAGE", `${req.url} visited`);
      break;

    case "/userLogin":
      response.statusCode = 100;
      await router.loggedIn(response, req);
      emitEvent.emit("log", "server", "ACTION", `${req.url} visited`);
      break;

    case "/signup":
      response.statusCode = 100;
      response.setHeader(
        "Set-Cookie",
        `cookiename=server${req.url}cookie; Expiresponse=${cookieExp}; Path=${req.url}`
      );
      await router.signUpPage(response);
      emitEvent.emit("log", "server", "PAGE", `${req.url} visited`);
      break;

    case "/favicon.ico":
      response.statusCode = 100;
      response.setHeader(
        "Set-Cookie",
        `cookiename=server${req.url}cookie; Expiresponse=${cookieExp}; Path=${req.url}`
      );
      await router.favicon(response);
      emitEvent.emit("log", "server", "PAGE", `${req.url} visited`);
      break;

    case "/views/files/style.css":
      response.statusCode = 100;
      response.setHeader(
        "Set-Cookie",
        `cookiename=server${req.url}cookie; Expiresponse=${cookieExp}; Path=${req.url}`
      );
      router.styleSheet(response);
      emitEvent.emit("log", "server", "STYLE", `${req.url} visited`);
      break;

    default:
      response.statusCode = 404;
      response.setHeader(
        "Set-Cookie",
        `cookiename=server${req.url}cookie; Expiresponse=${cookieExp}; Path=${req.url}`
      );
      router.notFoundPage(response);
      emitEvent.emit(
        "log",
        "server",
        "WARNING",
        `${req.url} requested page non-existent`
      );
      break;
  }
});

const start = async () => {
  await serverSwitch.listen(3000, "localhost", () => {
    if (global.DEBUG) {
      console.log("Listening on port 3000...");
    }
  });
};

////////////////////////////////////////////////
// listen for event "log"
emitEvent.on("log", (event, level, message) => {
  if (global.DEBUG) logger.logEvent(event, level, message);
});

////////////////////////////////////////////////
// export
module.exports = {
  start,
};
