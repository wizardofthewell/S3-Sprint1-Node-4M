////////////////////////////////////////////////
// imports
const http = require("http");
const router = require("./router");
const logger = require("./logger");
const events = require("events");
class Event extends events {}
const emitEvent = new Event();

////////////////////////////////////////////////
// constant
const cookieExp = new Date(Date.now() + 86400000);

////////////////////////////////////////////////
// server
const serverSwitch = http.createServer(async (req, res) => {
  // router switch
  switch (req.url) {
    case "/":
      res.statusCode = 100;
      res.setHeader(
        "Set-Cookie",
        `cookiename=server${req.url}cookie; Expires=${cookieExp}; Path=${req.url}`
      );
      await router.indexPage(res);
      emitEvent.emit("log", "server", "PAGE", `${req.url} visited`);
      break;

    case "/login":
      res.statusCode = 100;
      res.setHeader(
        "Set-Cookie",
        `cookiename=server${req.url}cookie; Expires=${cookieExp}; Path=${req.url}`
      );
      await router.loginPage(res);
      emitEvent.emit("log", "server", "PAGE", `${req.url} visited`);
      break;

    case "/signup":
      res.statusCode = 100;
      res.setHeader(
        "Set-Cookie",
        `cookiename=server${req.url}cookie; Expires=${cookieExp}; Path=${req.url}`
      );
      await router.signUpPage(res);
      emitEvent.emit("log", "server", "PAGE", `${req.url} visited`);
      break;

    case "/favicon.ico":
      res.statusCode = 100;
      res.setHeader(
        "Set-Cookie",
        `cookiename=server${req.url}cookie; Expires=${cookieExp}; Path=${req.url}`
      );
      await router.favicon(res);
      emitEvent.emit("log", "server", "PAGE", `${req.url} visited`);
      break;

    case "/views/components/Login-Form.js":
      res.statusCode = 100;
      res.setHeader(
        "Set-Cookie",
        "cookiename=server${req.url}cookie; Expires=${cookieExp}; Path=${req.url}"
      );
      await router.userLogin();
      emitEvent.emit("log", "server", "PAGE", `${req.url} visited`);
      break;

    case "/views/files/style.css":
      res.statusCode = 100;
      res.setHeader(
        "Set-Cookie",
        `cookiename=server${req.url}cookie; Expires=${cookieExp}; Path=${req.url}`
      );
      router.styleSheet(res);
      emitEvent.emit("log", "server", "STYLE", `${req.url} visited`);
      break;

    default:
      res.statusCode = 404;
      res.setHeader(
        "Set-Cookie",
        `cookiename=server${req.url}cookie; Expires=${cookieExp}; Path=${req.url}`
      );
      router.notFoundPage(res);
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
