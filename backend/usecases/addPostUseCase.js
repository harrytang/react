const postRepository = require('../repositories/postRepository');
const Post = require('../entities/Post');

const handle = async (validatedPost) => {
  const post = new Post(
    validatedPost.title,
    validatedPost.content,
    validatedPost.username
  );
  return await postRepository.insert(post);
};

module.exports = { handle };
