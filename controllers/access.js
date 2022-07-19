const { v4: uuidv4 } = require('uuid');

const userHelper = require('../helpers/user');
const authenticationHelper = require('../helpers/auth');

exports.createUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const userFound = await userHelper.getUser({
      userName,
    });

    if (userFound) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    const hash = userHelper.hashPassword({ password });
    await userHelper.createUser({
      data: {
        userName,
        password: hash,
      }
    });

    return res.status(200).json({
      message: 'User created successfully',
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const userFound = await userHelper.getUser({
      userName,
    });

    if (!userFound) {
      return res.status(404).json({
        message: 'User does not exists',
      });
    }

    const validPassword = userHelper.comparePassword({
      password,
      hash: userFound.password,
    });

    if (!validPassword) {
      return res.status(403).json({
        message: 'Invalid credentials',
      });
    }

    const token = await userHelper.generateToken({
      id: userFound.id,
    });

    return res.status(200).json({
      token,
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};

exports.generateApiKey = async (req, res) => {
  try {
    const apiKey = uuidv4();

    // disable previous API key.
    await authenticationHelper.updateAuthentication({
      where: {
        userId: req.user.id,
      },
      data: {
        isValid: false,
      }
    });

    await authenticationHelper.createAuthentication({
      data: {
        userId: req.user.id,
        apiKey,
        isValid: true,
      },
    });

    return res.status(200).json({
      message: 'Api Key generate for user',
      data: {
        apiKey,
      },
    });
  } catch (ex) {
    console.log(ex);
    return res.status(500).json({
      message: ex.message,
    });
  }
};
