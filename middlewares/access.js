// Check if jwt token is present or user is using API key.
const userHelper = require('../helpers/user');

module.exports = async (req, res, next) => {
  try {
    const { authorization, 'X-API-Key': apiKey } = req.headers;

    // User has provided JWT key.
    if (authorization) {
      const validated = await userHelper.validateToken({
        token: authorization,
      });

      const user = await userHelper.getUser({
        id: validated.id,
      });

      if (validated) {
        req.user = user;
        return next();
      }
    }

    // User has provided API key.
    if (apiKey) {
      const validApiKey = await userHelper.getApiKey({ apiKey });
      const userDetails = await userHelper.getUser({
        id: validApiKey.userId,
      });

      if (validApiKey) {
        req.user = userDetails;
        return next();
      }
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
