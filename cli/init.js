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
  if (fs.existsSync("./json/users.json")) {
    console.log("Tokens file exists.");
  } else {
    fs.writeFileSync("./json/users.json", "[]");
    console.log("./json/tokens.json created");
  }
  if (fs.existsSync("./json/config.json")) {
    console.log("Tokens file exists.");
  } else {
    fs.writeFileSync("./json/config.json", `{"debug":false}`);
    console.log("./json/tokens.json created");
  }
  if (fs.existsSync("./json/defaultpkglck.json")) {
    console.log("Package Lock file exists.");
  } else {
    fs.writeFileSync(
      "./json/defaultpkglck.json",
      `{
      "name": "s3-sprint1-node-4m",
      "version": "1.0.0",
      "lockfileVersion": 3,
      "requires": true,
      "packages": {
        "": {
          "name": "s3-sprint1-node-4m",
          "version": "1.0.0",
          "license": "MIT",
          "dependencies": {
            "crc": "~4.3.2",
            "crc32": "~0.2.2",
            "date-fns": "~2.30.0",
            "uuid": "~9.0.0"
          }
        },
        "node_modules/@babel/runtime": {
          "version": "7.22.5",
          "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.22.5.tgz",
          "integrity": "sha512-ecjvYlnAaZ/KVneE/OdKYBYfgXV3Ptu6zQWmgEF7vwKhQnvVS6bjMD2XYgj+SNvQ1GfK/pjgokfPkC/2CO8CuA==",
          "dependencies": {
            "regenerator-runtime": "^0.13.11"
          },
          "engines": {
            "node": ">=6.9.0"
          }
        },
        "node_modules/crc": {
          "version": "4.3.2",
          "resolved": "https://registry.npmjs.org/crc/-/crc-4.3.2.tgz",
          "integrity": "sha512-uGDHf4KLLh2zsHa8D8hIQ1H/HtFQhyHrc0uhHBcoKGol/Xnb+MPYfUMw7cvON6ze/GUESTudKayDcJC5HnJv1A==",
          "engines": {
            "node": ">=12"
          },
          "peerDependencies": {
            "buffer": ">=6.0.3"
          },
          "peerDependenciesMeta": {
            "buffer": {
              "optional": true
            }
          }
        },
        "node_modules/crc32": {
          "version": "0.2.2",
          "resolved": "https://registry.npmjs.org/crc32/-/crc32-0.2.2.tgz",
          "integrity": "sha512-PFZEGbDUeoNbL2GHIEpJRQGheXReDody/9axKTxhXtQqIL443wnNigtVZO9iuCIMPApKZRv7k2xr8euXHqNxQQ==",
          "bin": {
            "crc32": "bin/runner.js"
          },
          "engines": {
            "node": ">= 0.4.0"
          }
        },
        "node_modules/date-fns": {
          "version": "2.30.0",
          "resolved": "https://registry.npmjs.org/date-fns/-/date-fns-2.30.0.tgz",
          "integrity": "sha512-fnULvOpxnC5/Vg3NCiWelDsLiUc9bRwAPs/+LfTLNvetFCtCTN+yQz15C/fs4AwX1R9K5GLtLfn8QW+dWisaAw==",
          "dependencies": {
            "@babel/runtime": "^7.21.0"
          },
          "engines": {
            "node": ">=0.11"
          },
          "funding": {
            "type": "opencollective",
            "url": "https://opencollective.com/date-fns"
          }
        },
        "node_modules/regenerator-runtime": {
          "version": "0.13.11",
          "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.13.11.tgz",
          "integrity": "sha512-kY1AZVr2Ra+t+piVaJ4gxaFaReZVH40AKNo7UCX6W+dEwBo/2oZJzqfuN1qLq1oL45o56cPaTXELwrTh8Fpggg=="
        },
        "node_modules/uuid": {
          "version": "9.0.0",
          "resolved": "https://registry.npmjs.org/uuid/-/uuid-9.0.0.tgz",
          "integrity": "sha512-MXcSTerfPa4uqyzStbRoTgt5XIe3x5+42+q1sDuy3R5MDk66URdLMOZe5aPX/SQd+kuYAh0FdP/pO28IkQyTeg==",
          "bin": {
            "uuid": "dist/bin/uuid"
          }
        }
      }
    }
    `
    );
    console.log("defaultpkglck.json created");
  }
  console.log("Initialization complete.");
};

module.exports = { initializeApp };
