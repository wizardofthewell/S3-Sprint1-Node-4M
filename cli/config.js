////////////////////////////////////////////////
// imports
const { exec } = require("child_process");
const fs = require("fs");
const { appStatus } = require("./status");
const { resetApp } = require("./reset");
const {
  resetPKGConfigFile,
  updatePKGConfigFile,
  viewPKGConfigFiles,
} = require("./pkgconfig");
async function toggleDebug(query) {
  data = await fs.readFileSync("./json/config.json");
  config = JSON.parse(data);
  config.debug = query;
  await fs.writeFileSync("./json/config.json", JSON.stringify(config, null, 2));
}
////////////////////////////////////////////////
const configApp = async (myArgs) => {
  switch (myArgs[1]) {
    case "--reset":
    case "-r":
      resetApp(myArgs);
      resetPKGConfigFile();
    case "--status":
    case "-s":
      appStatus();
      break;
    case "--settings":
    case "-set":
      if (myArgs[2] == "debug") {
        if (myArgs[3] == "true") {
          toggleDebug(true);
        }
        if (myArgs[3] == "false") {
          toggleDebug(false);
        }
      }
      break;
    case "--help":
    case "-h":
      fs.readFile("./usage.txt", (error, data) => {
        if (error) throw error;
        console.log(data.toString());
      });
    default:
      fs.readFile("./usage.txt", (error, data) => {
        if (error) throw error;
        console.log(data.toString());
      });
      break;
  }
};

module.exports = {
  configApp,
};
