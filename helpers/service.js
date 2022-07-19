const { PrismaClient } = require('@prisma/client');

const {
  service,
  api,
} = new PrismaClient();

exports.getServiceByNameAndUser = ({
  where,
}) => service.findFirst({
  where,
  select: {
    id: true,
  },
});

exports.createService = ({
  data,
}) => service.create({
  data,
});

exports.getServices = ({
  id,
}) => service.findMany({
  where: {
    userId: id,
  },
  select: {
    id: true,
    name: true,
    type: true,
  }
});

exports.getServiceById = ({
  id,
}) => service.findFirst({
  where: {
    id,
  },
  select: {
    id: true,
    name: true,
    type: true,
  }
});

exports.deleteService = ({
  id,
}) => service.delete({
  where: {
    id,
  },
});

exports.createApi = ({
  serviceId,
  name,
  method,
  url,
}) => api.create({
  data: {
    serviceId,
    name,
    method,
    url,
  }
});
