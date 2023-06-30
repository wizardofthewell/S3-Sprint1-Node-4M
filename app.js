////////////////////////////////////////////////
// imports
const server = require("./src/server");
const fs = require("fs");
const { initializeApp } = require("./cli/init");
const { configApp } = require("./cli/config");
const { tokenApp } = require("./cli/token");

////////////////////////////////////////////////
// globals
global.STYLE = '<link rel="stylesheet" href="/views/files/style.css" />';
global.NAV =
  '<nav><a href="/login">Login</a><a href="/signup">Sign-Up<a></nav>';
// global.DEBUG = readConfig().debug;
let debugval;
readConfig().then(async (data) => {
  debugval = await data.JSON;
});
console.log(debugval);
////////////////////////////////////////////////
// functions
function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

async function readConfig() {
  try {
    const data = await readFileAsync("./json/config.json");
    const config = JSON.parse(data);
    return config;
  } catch (error) {
    console.log(error);
  }
}

////////////////////////////////////////////////
// switch and logic
const myArgs = process.argv.slice(2);
if (global.DEBUG)
  if (myArgs.length >= 1) console.log("the myapp.args: ", myArgs);

switch (myArgs[0]) {
  case "init":
  case "i": {
    if (global.DEBUG) console.log(myArgs[0], " - initialize the app.");
    initializeApp(myArgs[1]);
    break;
  }
  case "config":
  case "c": {
    if (global.DEBUG) console.log(myArgs[1], " - reset the app config.");
    configApp(myArgs);
    break;
  }
  case "token":
  case "t": {
    if (global.DEBUG) console.log(myArgs[0], " - generate a user token");
    tokenApp(myArgs);
    break;
  }
  case "--help":
  case "--h": {
    fs.readFile(__dirname + "/usage.txt", (error, data) => {
      if (error) throw error;
      console.log(data.toString());
    });
    break;
  }
  case "s":
  case "start": {
    if (global.DEBUG) console.log(myArgs[0], " - start the app.");
    server.start();
    break;
  }
  default: {
    fs.readFile(__dirname + "/usage.txt", (error, data) => {
      if (error) throw error;
      console.log(data.toString());
      // server.start();
    });
    break;
  }
}
