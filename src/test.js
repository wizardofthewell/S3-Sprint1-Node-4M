// define/extend an EventEmitter class
// const EventEmitter = require("events");
// class MyEmitter extends EventEmitter {}

// initialize an new emitter object
// const myEmitter = new MyEmitter();
// add the listener for the logEvent
// myEmitter.on("log", (event, level, msg) => logEvents(event, level, msg));

// Node.js common core global modules
const fs = require("fs");
const path = require("path");

const crc32 = require("crc/crc32");
const { format, addDays } = require("date-fns");

function newToken(username) {
  if (global.DEBUG) console.log("token.newToken()");
  let newToken = JSON.parse(`{
        "created": "1969-01-31 12:30:00",
        "username": "username",
        "email": "user@example.com",
        "phone": "5556597890",
        "token": "token",
        "expires": "1969-02-03 12:30:00",
        "confirmed": "tbd"
    }`);

  let now = new Date();
  let expires = addDays(now, 3);

  newToken.created = `${format(now, "yyyy-MM-dd HH:mm:ss")}`;
  newToken.username = username;
  newToken.token = crc32(username).toString(16);
  newToken.expires = `${format(expires, "yyyy-MM-dd HH:mm:ss")}`;

  fs.readFile(__dirname + "../json/tokens.json", "utf-8", (error, data) => {
    if (error) throw error;
    let tokens = JSON.parse(data);
    tokens.push(newToken);
    userTokens = JSON.stringify(tokens);

    fs.writeFile(__dirname + "../json/tokens.json", userTokens, (err) => {
      if (err) console.log(err);
      else {
        console.log(`New token ${newToken.token} was created for ${username}.`);
        // myEmitter.emit(
        //   "log",
        //   "token.newToken()",
        //   "INFO",
        //   `New token ${newToken.token} was created for ${username}.`
        // );
      }
    });
  });
  return newToken.token;
}
newToken("username");
