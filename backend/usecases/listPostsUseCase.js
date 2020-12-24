const postRepository = require('../repositories/postRepository');

const handle = async () => {
  return await postRepository.list();
};

module.exports = { handle };
