////////////////////////////////////////////////
// imports
const { exec } = require("child_process");
const fs = require("fs");
const { appStatus } = require("./status");
const { resetApp } = require("./reset");

////////////////////////////////////////////////
const configApp = async (myArgs) => {
  switch (myArgs[1]) {
    case "--reset":
    case "-r":
      resetApp();
    case "--status":
    case "-s":
      appStatus();
      break;
    // global does not work this way sadly
    case "--debug":
    case "-d":
      global.DEBUG = !global.DEBUG;
      break;
    default:
      console.log("fart stink butt");
  }
};

module.exports = {
  configApp,
};
