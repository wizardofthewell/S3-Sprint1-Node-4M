const form = () => {
  return `<form id="login-form" method="post" action="/login">
  <div>
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>
  </div>
  <div>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>
  </div>
  <div>
    <input type="submit" value="Login">
  </div>
</form>
`;
};

module.exports = { form };
