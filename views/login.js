////////////////////////////////////////////////
// components
const LoginForm = require("./components/Login-Form");

////////////////////////////////////////////////
// framework
const page = async (res) => {
  const name = "Login";
  const style = global.STYLE;
  const head = `<head>${style}<title>${name}</title></head>`;
  const header = `<header><h1>${name}</h1><nav><a href="/signup">No account?</a></nav></header>`;
  try {
    await res.writeHead(res.statusCode, { "Content-Type": "text/html" });
    await res.end(
      `${head}<body>${header}<div id="box">${LoginForm.form()}</div></body>`
    );
  } catch (error) {
    res.statusCode = 500;
    console.error(error.message);
    throw error;
  }
};
module.exports = { page };
