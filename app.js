////////////////////////////////////////////////
// globals
global.DEBUG = true;
global.STYLE = '<link rel="stylesheet" href="files/style.css" />';
global.NAV = '<nav><a href="/subscribe">subscribe</a></nav>';

////////////////////////////////////////////////
// imports
const server = require("./server");

////////////////////////////////////////////////
// listeners
// listening for activity on localhost:3000
server.start();
