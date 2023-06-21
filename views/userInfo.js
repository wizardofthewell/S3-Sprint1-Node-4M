const readline = require('readline');

let users = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '1234567890' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '9876543210' },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayUsers() {
  console.log('Current user records:');
  console.log('----------------------');
  users.forEach(user => {
    console.log(`ID: ${user.id}`);
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
    console.log(`Phone: ${user.phone}`);
    console.log('----------------------');
  });
}

function updateUserRecord(userId, email, phone) {
  const user = users.find(user => user.id === userId);
  if (user) {
    user.email = email;
    user.phone = phone;
    console.log('User record updated successfully!');
  } else {
    console.log('User not found!');
  }
}

function addUserRecord(name, email, phone) {
  const userId = users.length + 1;
  users.push({ id: userId, name, email, phone });
  console.log('User record added successfully!');
}

rl.question('Do you want to (1) add or (2) update a user record? Enter 1 or 2: ', function (option) {
  if (option === '1') {
    rl.question('Enter user name: ', function (name) {
      rl.question('Enter user email: ', function (email) {
        rl.question('Enter user phone number: ', function (phone) {
          addUserRecord(name, email, phone);
          displayUsers();
          rl.close();
        });
      });
    });
  } else if (option === '2') {
    displayUsers();
    rl.question('Enter user ID to update: ', function (userId) {
      rl.question('Enter updated email: ', function (email) {
        rl.question('Enter updated phone number: ', function (phone) {
          updateUserRecord(Number(userId), email, phone);
          displayUsers();
          rl.close();
        });
      });
    });
  } else {
    console.log('Invalid option!');
    rl.close();
  }
});
