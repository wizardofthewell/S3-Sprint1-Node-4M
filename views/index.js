////////////////////////////////////////////////
// framework
const page = async (response) => {
  const name = "Landing Page";
  const style = global.STYLE;
  const head = `<head>${style}<title>${name}</title></head>`;
  const header = `<header><h1>${name}</h1>${global.NAV}</header>`;
  try {
    await response.end(`${head}<body>${header}</body>`);
  } catch (error) {
    response.statusCode = 500;
    console.error(error.message);
    throw error;
  }
};

////////////////////////////////////////////////
// exports
module.exports = { page };
