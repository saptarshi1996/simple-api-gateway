const {
  PrismaClient,
} = require('@prisma/client');

const {
  user,
} = new PrismaClient();

exports.createUser = async (req, res) => {
  try {
    const {
      userName,
      password,
    } = req.body;

    const userFound = await user.findFirst({
      where: {
        userName,
      },
      select: {
        password: true,
      }
    });

    return res.json(200).json({
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
    const {
      userName,
      password,
    } = req.body;

    const userFound = await user.findFirst({
      where: {
        userName,
      },
      select: {
        password: true,
        id: true,
      }
    });

    if (!userFound) {
      return res.json(404).status({
        message: 'User does not exists',
      });
    }

  } catch (ex) {
    return res.json(500).message({
      message: ex.message,
    });
  }
};
