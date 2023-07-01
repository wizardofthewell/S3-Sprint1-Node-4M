const fs = require("fs");
const {
  resetPKGConfigFile,
  updatePKGConfigFile,
  viewPKGConfigFiles,
} = require("./pkgconfig");
const appStatus = () => {
  if (fs.existsSync("./src/logs")) {
    console.log("Logs directory exists.");
  } else {
    console.log("Logs directory does not exist.");
  }
  if (fs.existsSync("./json")) {
    console.log("Json directory exists.");
  } else {
    console.log("Json directory does not exist.");
  }
  if (fs.existsSync("./json/tokens.json")) {
    console.log("Tokens file exists.");
  } else {
    console.log("Tokens file does not exist.");
  }
  if (fs.existsSync("./json/config.json")) {
    console.log("Config file exists.");
  } else {
    console.log("Config file does not exist.");
  }
  if (fs.existsSync("./json/defaultpkglck.json")) {
    console.log("DefaultPKGLock file exists.");
  } else {
    console.log("DefaultPKGLock file does not exist.");
  }
  viewPKGConfigFiles();
};

module.exports = {
  appStatus,
};
