const serviceHelper = require('../helpers/service');

exports.createService = async (req, res) => {
  try {
    const { user, body: servicePayload } = req;

    // Check if service exists.
    const serviceExists = await serviceHelper.getServiceByNameAndUser({
      where: {
        userId: user.id,
        name: servicePayload.name,
      }
    });

    if (serviceExists) {
      return res.status(400).json({
        message: 'Service already exists',
      });
    }

    // Create service.
    await serviceHelper.createService({
      data: {
        userId: user.id,
        name: servicePayload.name,
        type: servicePayload.type,
      },
    });

    return res.status(200).json({
      message: 'Service created successfully',
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};

exports.listService = async (req, res) => {
  try {
    const { user } = req;
    const services = await serviceHelper.getServices({
      id: +user.id,
    });
    return res.status(200).json({
      data: services,
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};

exports.getService = async (req, res) => {
  try {
    const { params } = req;
    const service = await serviceHelper.getServiceById({
      id: +params.serviceId,
    });
    return res.status(200).json({
      data: service,
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { params } = req;
    await serviceHelper.deleteService({
      id: +params.serviceId,
    });

    return res.status(200).json({
      message: 'Service deleted',
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};
