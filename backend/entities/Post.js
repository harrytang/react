const { v4: uuidv4 } = require('uuid');

class Post {
  constructor(title, content, username) {
    this.postId = uuidv4();
    this.title = title;
    this.content = content;
    this.author = username;
    this.createdAt = Date.now();
  }
}

module.exports = Post;
