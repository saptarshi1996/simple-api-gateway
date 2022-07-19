const { PrismaClient } = require('@prisma/client');

const {
  authentication,
} = new PrismaClient();

exports.getAuthenticationByUserId = ({
  id,
}) => authentication.findFirst({
  where: {
    userId: id,
    isValid: true,
  },
  select: {
    id: true,
  }
});

exports.updateAuthentication = ({
  where,
  data,
}) => authentication.updateMany({
  where,
  data,
});

exports.createAuthentication = ({
  data,
}) => authentication.create({
  data,
});
