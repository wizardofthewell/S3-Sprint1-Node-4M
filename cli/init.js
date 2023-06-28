const { exec } = require("child_process");
const fs = require("fs");

const initializeApp = async () => {
  console.log("Initializing...");
  await exec("npm install");
  if (fs.existsSync("./src/logs")) {
    console.log("Logs directory exists.");
  } else {
    fs.mkdirSync("./src/logs");
  }
  console.log("Initialization complete.");
};

module.exports = { initializeApp };
