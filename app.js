////////////////////////////////////////////////
// imports
const server = require("./src/server");
const fs = require("fs");
const { initializeApp } = require("./cli/init");
////////////////////////////////////////////////
// globals
global.DEBUG = true;
global.STYLE = '<link rel="stylesheet" href="/views/files/style.css" />';
global.NAV =
  '<nav><a href="/login">Login</a><a href="/signup">Sign-Up<a></nav>';

////////////////////////////////////////////////

const myArgs = process.argv.slice(2);
if (DEBUG) if (myArgs.length >= 1) console.log("the myapp.args: ", myArgs);

switch (myArgs[0]) {
  case "init":
  case "i":
    if (DEBUG) console.log(myArgs[0], " - initialize the app.");
    initializeApp(myArgs[1]);
    break;
  case "config":
  case "c":
    if (DEBUG) console.log(myArgs[0], " - display the configuration file");
    configApp(myArgs[1]);
    break;
  case "token":
  case "t":
    if (DEBUG) console.log(myArgs[0], " - generate a user token");
    tokenApp(myArgs[1]);
    break;
  case "--help":
  case "--h":
    fs.readFile(__dirname + "/usage.txt", (error, data) => {
      if (error) throw error;
      console.log(data.toString());
    });
    break;
  case "s":
  case "start":
    if (DEBUG) console.log(myArgs[0], " - start the app.");
    server.start();
    break;
  default:
    fs.readFile(__dirname + "/usage.txt", (error, data) => {
      if (error) throw error;
      console.log(data.toString());
      // server.start();
    });
}
