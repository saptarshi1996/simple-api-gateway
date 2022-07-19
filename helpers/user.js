require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { PrismaClient } = require('@prisma/client');

const { user, authentication } = new PrismaClient();

const { JWT_SECRET } = process.env;

exports.createUser = ({
  data,
}) => user.create({
  data,
});

exports.getUser = ({
  id,
  userName,
}) => new Promise((resolve) => {
  try {
    const where = {};

    if (id) {
      where.id = id;
    }

    if (userName) {
      where.userName = userName;
    }

    resolve(user.findFirst({
      where,
      select: {
        id: true,
        userName: true,
        password: true,
      }
    }));
  } catch (ex) {
    throw new Error({
      message: ex.message,
    });
  }
});

exports.comparePassword = ({
  password,
  hash,
}) => bcrypt.compareSync(password, hash);

exports.hashPassword = ({
  password,
}) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

exports.generateToken = ({
  id,
}) => jwt.sign({ id }, JWT_SECRET, {
  expiresIn: '1h',
});

exports.validateToken = ({
  token,
}) => new Promise((resolve, reject) => {
  try {
    const validate = jwt.verify(token, JWT_SECRET);
    resolve({
      validate,
    });
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.getApiKey = ({
  apiKey,
}) => authentication.findFirst({
  where: {
    apiKey,
    isValid: true,
  },
  select: {
    id: true,
    userId: true,
  }
});
