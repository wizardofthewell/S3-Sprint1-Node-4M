function updateToken(argv) {
  if (DEBUG) console.log("token.updateToken()");
  if (DEBUG) console.log(argv);
  fs.readFile(__dirname + "/json/tokens.json", "utf-8", (error, data) => {
    if (error) throw error;
    let tokens = JSON.parse(data);
    tokens.forEach((obj) => {
      if (obj.username === argv[3]) {
        if (DEBUG) console.log(obj);
        switch (argv[2]) {
          case "p":
          case "P":
            obj.phone = argv[4];
            break;
          case "e":
          case "E":
            obj.email = argv[4];
            break;
          default:
        }
        if (DEBUG) console.log(obj);
      }
    });
    userTokens = JSON.stringify(tokens);
    fs.writeFile(__dirname + "/json/tokens.json", userTokens, (err) => {
      if (err) console.log(err);
      else {
        console.log(`Token record for ${argv[3]} was updated with ${argv[4]}.`);
        myEmitter.emit(
          "log",
          "token.updateToken()",
          "INFO",
          `Token record for ${argv[3]} was updated with ${argv[4]}.`
        );
      }
    });
  });
}

function newToken(userName, password, email, phone) {
  if (global.DEBUG) console.log("token.newToken()");
  let date = format(new Date(), "y-MM-dd HH:mm.ss");
  let exp = add(parseISO(date), { days: 1 });
  let tkn = crc32(`${userName}#${date}#${email}`).toString(36);
  let access = true;
  let newToken = {
    created: date,
    username: userName,
    password: password,
    email: email,
    phone: phone,
    token: tkn,
    expires: exp,
    confirmed: access,
  };
  // now, i was gonna use listTokens, but they serve different purpose. list posts to console.
  // we need to read to a variable
  fs.readFile("./json/tokens.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (global.DEBUG) {
        console.log(JSON.parse(data));
      }
      let tokens = JSON.parse(data);
      tokens.map((token) => {
        // if token === passed uusername we want to overwrite the users old token
        if (token.username === userName) {
          token.created = date;
          token.expires = exp;
          token.token = tkn;
          console.log(token);
        } else {
          fs.writeFileSync("./json/tokens.json", token, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Token saved successfully.");
            }
          });
        }
      });
    }
  });
}
