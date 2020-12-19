const refreshTokenStorage = (token) => {
  let refreshTokens = [];
  return [...refreshTokens, token];
};

module.exports = { refreshTokenStorage };
