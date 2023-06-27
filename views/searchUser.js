const users = [
  { username: "john_doe", email: "john@example.com", phone: "1234567890" },
  { username: "jane_smith", email: "jane@example.com", phone: "9876543210" },
  { username: "bob_johnson", email: "bob@example.com", phone: "5555555555" },
];

function searchUser(query) {
  const results = users.filter(
    (user) =>
      user.username === query || user.email === query || user.phone === query
  );

  return results;
}

const query = process.argv[2];

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
