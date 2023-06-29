const { exec } = require("child_process");
const fs = require("fs");

const initializeApp = async () => {
  console.log("Initializing...");
  await exec("npm install");
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
  if (fs.existsSync("./json/tokens.json")) {
    console.log("Tokens file exists.");
  } else {
    fs.writeFileSync("./json/tokens.json", "[]");
    console.log("./json/tokens.json created");
  }
  console.log("Initialization complete.");
};

module.exports = { initializeApp };
