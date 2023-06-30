const fs = require("fs");

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
  if (fs.existsSync("./json/users.json")) {
    console.log("Users file exists.");
  } else {
    console.log("Users file does not exist.");
  }
};

module.exports = {
  appStatus,
};
