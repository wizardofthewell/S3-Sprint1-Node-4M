async function getUsers(query) {
  const fs = require("fs").promises;
  const data = await fs.readFile("./json/tokens.json");
  const tokens = JSON.parse(data);
  let users = [];
  tokens.forEach((username) => {
    users.push(username);
    console.log(users);
  });

  function searchUser(query) {
    const results = users.filter(
      (user) =>
        user.username === query || user.email === query || user.phone === query
    );

    return results;
  }

  const searchResults = searchUser(query);

  if (searchResults.length > 0) {
    console.log("Search Results:");
    searchResults.forEach((user) => {
      console.log(`Username: ${user.username}`);
      console.log(`Email: ${user.email}`);
      console.log(`Phone: ${user.phone}`);
      console.log("---");
    });
  } else {
    console.log("No matching user records found.");
  }
}

module.exports = {
  getUsers,
};
