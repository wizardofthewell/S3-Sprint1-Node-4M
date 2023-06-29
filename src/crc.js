////////////////////////////////////////////////
// imports
const fs = require("fs");
const path = require("path");
const crc32 = require("crc/crc32");
const { format, add, parseISO } = require("date-fns");

////////////////////////////////////////////////
// constants
const myArgs = process.argv.slice(2);
global.DEBUG = true;

////////////////////////////////////////////////
// functions
var tokenCount = function () {
  if (global.DEBUG) console.log("token.tokenCount()");
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, "/json/tokens.json"), (err, data) => {
      if (err) reject(err);
      else {
        let tokens = JSON.parse(data);
        let count = Object.keys(tokens).length;
        console.log(`Current token count: ${count}`);
        myEmitter.emit(
          "log",
          "token.tokencount",
          "INFO",
          `Current token count: ${count}`
        );
        resolve(count);
      }
    });
  });
};

function tokenList() {
  if (global.DEBUG) console.log("token.tokenList()");
  fs.readFile(__dirname + "/json/tokens.json", (err, data) => {
    if (err) throw err;
    else {
      let tokens = JSON.parse(data);
      console.log("User List:");
      tokens.forEach((obj) => {
        console.log(" * " + obj.username + " : " + obj.token);
      });
      myEmitter.emit("log", "token.tokenList", "INFO", "User List: " + tokens);
    }
  });
}

function newToken(args) {
  if (global.DEBUG) console.log("token.newToken()");
  let date = format(new Date(), "y-MM-dd HH:mm.ss");
  let exp = add(parseISO(date), { days: 1 });
  let access = true;
  let tkn = crc32(`${access}#${date}#${exp}`).toString(36);
  if (args.length <= 2) {
    tmpToken = {
      created: date,
      username: "null",
      password: "null",
      email: "null",
      phone: "null",
      token: tkn,
      expires: exp,
      confirmed: access,
    };
  } else {
    tmpToken = {
      created: date,
      username: args[0].toString(),
      password: args[2].toString(),
      email: args[3].toString(),
      phone: args[4].toString(),
      token: tkn,
      expires: exp,
      confirmed: access,
    };
  }

  try {
    fs.readFile("./json/tokens.json", async (error, data) => {
      if (error) console.log(error);
      let tokens = await JSON.parse(data);
      if (!Array.isArray(tokens)) {
        tokens = [];
      }
      tokens.push(tmpToken);
      fs.writeFile("./json/tokens.json", JSON.stringify(tokens), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Token saved successfully.");
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
}

function updateToken(argv) {
  if (global.DEBUG) console.log("token.updateToken()");
  if (global.DEBUG) console.log(argv);
  fs.readFile("./json/tokens.json", async (err, data) => {
    if (err) console.log(err);
    let tokens = await JSON.parse(data);
    if (argv[2]);
    tokens.forEach((token) => {
      if (argv[2] === token.username) {
        console.log(token);
      }
    });
  });
}

////////////////////////////////////////////////
// newToken("alex", "assweed", "alex@duck.com", "(709)685-3999");
// updateToken(["alex", "password", "sixsinglebird@duck.com", "(709)685-3999"]);

module.exports = {
  newToken,
  tokenCount,
  tokenList,
  updateToken,
};
