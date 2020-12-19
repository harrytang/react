const { v4: uuidv4 } = require('uuid');

class Post {
  constructor(title, content, author) {
    this.postId = uuidv4();
    this.title = title;
    this.content = content;
    this.author = author;
    this.createdAt = Data.now();
  }
}

module.exports = Post;
