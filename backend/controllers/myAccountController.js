const getUserUseCase = require("../usecases/getUserUseCase");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const invoke = async (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const [type, token] = authHeader.split(" ");

    if (token && type === "Bearer") {
      
      try {
        
        const result = jwt.verify(
          token,
          process.env.TOKEN_SECRET,
          async (err, decoded) => {
            if (err) {
              throw createError(403, err.message);
            } else {
              // console.log(decoded);
              const userId = decoded.payload;
              try {
                return {
                  "username": "mocked username",
                  "email": "mocked@gmail.com"
                }
          
                return await getUserUseCase.handle(userId);
              }
              catch (error) {
                
                throw createError(
                  500,
                  "Cannot verify the token due to Wynny bad code. The error was " +
                    error.message
                );
              }
            }
          }
        );
        
        return result;
      } catch (error) {
        createError(
          500,
          "Cannot verify the token due to Wynny bad code. The error was " +
            error.message
        );
      }
    }
  } else {
    throw createError(403, "Authentication is required.");
  }
};

module.exports = { invoke };
