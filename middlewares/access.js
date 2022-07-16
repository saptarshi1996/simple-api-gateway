// Check if jwt token is present or user is using API key.
exports.accessMiddleware = (req, res, next) => {
  const {
    Authorization,
    'X-API-Key': apiKey,
  } = req.headers;

  // User has provided JWT key.
  if (Authorization) {

  }

  // User has provided API key.
  if (apiKey) {

  }

};
