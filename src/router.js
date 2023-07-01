////////////////////////////////////////////////
// Imports
const index = require("../views/index");
const login = require("../views/login");
const signUp = require("../views/signUp");
const logger = require("./logger");
const tokenApp = require("./crc");
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

const loggedIn = (response, req) => {
  if (global.DEBUG) console.log("User Login requested");
  let body = "";
  response.statusCode = 200;

  req.on("data", (data) => {
    body += data;
  });

  req.on("end", async () => {
    // Parse the form data
    const formData = new URLSearchParams(body);

    // Access values from named elements
    const username = formData.get("username");
    const password = formData.get("password");

    // Do something with the username and password
    await validate({ user: username, password: password });

    // Send a response back to the client
    response.statusCode = 200;
    // response.setHeader("Content-Type", "text/plain");
    response.end("Form submitted successfully");
  });
  index.page(response);
};

const userSignUp = (response, req) => {
  if (global.DEBUG) console.log("User Sign-up requested");
  let body = "";
  response.statusCode = 200;

  req.on("data", (data) => {
    body += data;
  });

  req.on("end", async () => {
    // Parse the form data
    const formData = new URLSearchParams(body);

    // Access values from named elements
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");
    const phone = formData.get("phone");

    // Do something with the username and password
    await validate({ user: username, password: password });

    // Send a response back to the client
    response.statusCode = 200;
    // response.setHeader("Content-Type", "text/plain");
    response.end("Form submitted successfully");
  });
  index.page(response);
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
// main

async function validate(args) {
  fs.readFile("./json/tokens.json", async (err, data) => {
    if (err) console.log(err);
    let tokens = await JSON.parse(data);
    await tokens.forEach(async (token) => {
      // console.log("stink fart", args);
      tokenApp.newToken(args);

      // if (args[0] === token.username && args[1] === token.password) {
      //   console.log(args);
      //   await tokenApp.updateToken(args);
      //   index.page();
      // } else {
      //   console.log(args);
      //   tokenApp.newToken();
      //   login.page();
      // }
    });
  });

  // console.log(username, password);
  // await fs.writeFileSync("./json/users.json", JSON.stringify(config, null, 2));
}

////////////////////////////////////////////////
// export
module.exports = {
  indexPage,
  notFoundPage,
  styleSheet,
  loginPage,
  signUpPage,
  favicon,
  loggedIn,
  userSignUp,
};
