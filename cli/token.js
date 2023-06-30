////////////////////////////////////////////////
// imports
const token = require("../src/crc");

////////////////////////////////////////////////
const tokenApp = async (args) => {
  switch (args[1]) {
    case "--count":
    case "-c":
      token.tokenCount();
      break;
    case "--new":
    case "-n":
      token.newToken(args.slice(1));
      break;
    case "--list":
    case "-l":
      token.tokenList();
      break;
    case "--update":
    case "-u":
      token.updateToken(args);
      break;
    case "--search":
    case "-s":
      switch (args[2]) {
        case "u":
          token.searchForUser(args);
          break;
        case "p":
          token.searchForPhone(args);
          break;
        case "e":
          token.searchForEmail(args);
          break;
      }
      break;
    case "--help":
    case "-h":
      console.log(`
app token --count                     displays a count of the tokens created
app token --new <username>            generates a token for a given username, saves tokens to the json file
app token --upd p <username> <phone>  updates the json entry with phone number
app token --upd e <username> <email>  updates the json entry with email
app token --search u <username>       fetches a token for a given username
app token --search e <email>          fetches a token for a given email
app token --search p <phone>          fetches a token for a given phone number
app token --list                      Lists the current Tokens stored in tokens.json file
app token --help                      displays this menu
        `);
      break;
    default: {
      console.log(`
app token --count                     displays a count of the tokens created
app token --new <username>            generates a token for a given username, saves tokens to the json file
app token --upd p <username> <phone>  updates the json entry with phone number
app token --upd e <username> <email>  updates the json entry with email
app token --search u <username>       fetches a token for a given username
app token --search e <email>          fetches a token for a given email
app token --search p <phone>          fetches a token for a given phone number
app token --list                      Lists the current Tokens stored in tokens.json file
app token --help                      displays this menu
        `);
      break;
    }
  }
};

////////////////////////////////////////////////
// exports
module.exports = {
  tokenApp,
};
