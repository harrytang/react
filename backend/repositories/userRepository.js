const fs = require('fs').promises;
const path = require('path');
const createError = require('http-errors');

const dataFile = path.join(__dirname, '..', 'db', 'users.json');

const readDb = async () => {
  try {
    const users = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(users);
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

const checkExist = async (username) => {
  const users = await readDb();
  const filteredUsers = users.filter((u) => u.username === username);
  return filteredUsers.length > 0;
};

const insert = async (user) => {
  const users = await readDb();
  users.push(user);
  await writeToDb(users);
  return user;
};

const find = async (username) => {
  const users = await readDb();
  const filteredUsers = users.filter((u) => u.username === username);
  return filteredUsers[0] || null;
};

const get = async (userId) => {
  const users = await readDb();
  const foundUser = users.find((u) => u.userId === userId);
  return foundUser || null;
};

module.exports = { checkExist, insert, find, get };
