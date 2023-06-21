// imports
const server = require("./src/server");
////////////////////////////////////////////////
{
  /* */
}

// globals
global.DEBUG = true;
global.STYLE = '<link rel="stylesheet" href="/views/files/style.css" />';
global.NAV = '<nav><a href="/login">Login</a></nav>';

////////////////////////////////////////////////

////////////////////////////////////////////////
// listeners
// listening for activity on localhost:3000
server.start();
