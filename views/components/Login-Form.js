////////////////////////////////////////////////
// imports

////////////////////////////////////////////////
const form = () => {
  return `<form id="login-form" class="form" method="post" action="/userLogin">
  <h2 class="title">Login</h2>
  <div class="form">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>
  </div>
  <div class="form">
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>
  </div>
  <div class="submit-button">
    <input type="submit" value="Login">
  </div>
</form>
`;
};
{
  /* <script src="./views/components/Login-Form.js"></script> */
}
module.exports = { form };
