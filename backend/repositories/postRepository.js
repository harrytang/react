const fs = require('fs').promises;
const path = require('path');
const createError = require('http-errors');

const dataFile = path.join(__dirname, '..', 'db', 'posts.json');

const readDb = async () => {
  try {
    const posts = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(posts);
  } catch {
    throw createError(500, 'Cannot read data from json file');
  }
};

const writeToDb = async (data) => {
  try {
    await fs.writeFile(dataFile, JSON.stringify(data, null, 4), {
      encoding: 'utf-8',
      flag: 'w',
    });
  } catch {
    throw createError(500, 'Cannot write data to json file');
  }
};

const list = async () => {
  return await readDb();
};

const insert = async (post) => {
  const posts = await readDb();
  posts.push(post);
  await writeToDb(posts);
  return post;
};

module.exports = { list, insert };
