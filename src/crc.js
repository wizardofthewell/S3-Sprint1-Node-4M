////////////////////////////////////////////////
// imports
const fs = require("fs");
const path = require("path");
const crc32 = require("crc/crc32");
const { format, add, parseISO } = require("date-fns");

////////////////////////////////////////////////
// constants
const myArgs = process.argv.slice(2);

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

function newToken(userName, email, phone) {
  if (global.DEBUG) console.log("token.newToken()");
  let date = format(new Date(), "y-MM-dd HH:mm.ss");
  let exp = add(parseISO(date), { days: 1 });
  let tkn = crc32(`${userName}#${date}#${email}`).toString(36);
  let access = true;
  let newToken = {
    created: date,
    username: userName,
    email: email,
    phone: phone,
    token: tkn,
    expires: exp,
    confirmed: access,
  };

  fs.readFile("./json/tokens.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let tokens = JSON.parse(data);
      console.log(JSON.parse(data));
      tokens.push(newToken);
      fs.writeFile("./json/tokens.json", JSON.stringify(tokens), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Token saved successfully.");
        }
      });
    }
  });
}

newToken("alex", "alex@duck.com", "(709)685-3999");

module.exports = {
  newToken,
  tokenCount,
  tokenList,
};
