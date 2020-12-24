const tokenRepository = require('../repositories/tokenRepository');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const handle = async (token) => {
  const tokens = await tokenRepository.list();
  const validToken = tokens.includes(token);

  if (validToken) {
    const result = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          throw createError(400, err.message);
        } else {
          const userId = decoded.payload;
          return {
            accesstoken: jwt.sign({ userId }, process.env.TOKEN_SECRET, {
              expiresIn: '10s',
            }),
          };
        }
      }
    );
    return result;
  } else {
    throw createError(403, 'Invalid token');
  }
};

module.exports = { handle };
