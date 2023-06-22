const form = () => {
  return `<form id="login-form" method="post" action="/login">
  <h2 class="title">Login</h2>
  <div class="form">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>
  </div>
  <div class="form">
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>
  </div>
  <div class="login-button">
    <input type="submit" value="Login">
  </div>
</form>
`;
};

module.exports = { form };
