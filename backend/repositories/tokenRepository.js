const fs = require('fs').promises;
const path = require('path');
const createError = require('http-errors');

const dataFile = path.join(__dirname, '..', 'db', 'tokens.json');

const readDb = async () => {
  try {
    const tokens = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(tokens);
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

const insert = async (token) => {
  const tokens = await readDb();
  tokens.push(token);
  await writeToDb(tokens);
};

const list = async () => {
  return await readDb();
};

module.exports = { insert, list };
