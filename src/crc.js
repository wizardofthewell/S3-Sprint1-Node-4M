////////////////////////////////////////////////
// imports
const fs = require("fs");
const path = require("path");
const crc32 = require("crc/crc32");
const { format, add } = require("date-fns");

////////////////////////////////////////////////
// constants
const myArgs = process.argv.slice(2);

////////////////////////////////////////////////
// functions
var tokenCount = function () {
  if (DEBUG) console.log("token.tokenCount()");
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, "../json/tokens.json"), (err, data) => {
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
  if (DEBUG) console.log("token.tokenList()");
  fs.readFile(__dirname + "/../json/tokens.json", (err, data) => {
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
  if (DEBUG) console.log("token.newToken()");
  let date = format(new Date(), "y-MM-dd HH:mm.ss");
  let exp = add(date, { days: 1 });
  let tkn = crc32(`${userName}#${date}#${email}#`).toString(64);

  //   what does one mean by confirmed?
  let newToken = JSON.parse(`{
    "created": ${date},
    "username": ${userName},
    "email": ${email},
    "phone": ${phone},
    "token": ${tkn},
    "expires": ${exp},
    "confirmed": "tbd"
}`);
}
