// Check if jwt token is present or user is using API key.
const userHelper = require('../helpers/user');

module.exports = async (req, res, next) => {
  try {
    const { 'x-api-key': apiKey } = req.headers;

    console.log(req.headers);

    if (!apiKey) {
      return res.status(403).json({
        message: 'X-API-Key is missing',
      });
    }

    // User has provided API key.
    const validApiKey = await userHelper.getApiKey({ apiKey });
    const userDetails = await userHelper.getUser({
      id: validApiKey.userId,
    });

    if (validApiKey) {
      req.user = userDetails;
      return next();
    }

    return res.status(403).json({
      message: 'Invalid credentials',
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};
