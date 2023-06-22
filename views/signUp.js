////////////////////////////////////////////////
// framework

const page = async (res) => {
  const name = "Sign Up";
  const style = global.STYLE;
  const head = `<head>${style}<title>${name}</title></head>`;
  const header = `<header><h1>${name}</h1><nav><a href="/login">Have an account?</a></nav></header>`;
  try {
    await res.writeHead(res.statusCode, { "Content-Type": "text/html" });
    await res.end(`${head}<body>${header}</body>`);
  } catch (error) {
    res.statusCode = 500;
    console.error(error.message);
    throw error;
  }
};
module.exports = { page };
