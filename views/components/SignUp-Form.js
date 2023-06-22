const form = () => {
  return `<form class="form" method="post" action="/signup">
  <h2 class="title">Sign-Up</h2>
  <div class="form">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
  </div>
  <div class="form">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div class="form">
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>
  </div>
  <div class="submit-button">
    <input type="submit" value="Sign Up">
  </div>
</form>

  `;
};

module.exports = { form };
