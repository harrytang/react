const { v4: uuidv4 } = require('uuid');

class User {
  constructor(username, email, password) {
    this.userId = uuidv4();
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

module.exports = User;
