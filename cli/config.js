const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const configApp = async (myArgs) => {
  switch (myArgs[1]) {
    case "--reset":
    case "-r":
      if (fs.existsSync("./src/logs")) {
        console.log("Logs directory exists.");
      } else {
        fs.mkdirSync("./src/logs");
        console.log("./src/logs created");
      }
      if (fs.existsSync("./json")) {
        console.log("Json directory exists.");
      } else {
        fs.mkdirSync("./json");
        console.log("./json created");
      }
      fs.writeFileSync("./json/tokens.json", "[]");
      fs.writeFileSync("./json/users.json", "{}");
      console.log("./json/users.json created");
      console.log("Reset complete.");
  }
};

module.exports = {
  configApp,
};
