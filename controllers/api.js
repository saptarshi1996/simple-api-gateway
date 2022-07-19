exports.createApi = (req, res) => {
  try {
    return res.status(200).json({
      message: 'Api created successfully',
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};

exports.listApi = (req, res) => {
  try {
    return res.status(200).json({
      message: [],
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};

exports.getApi = (req, res) => {
  try {
    return res.status(200).json({
      data: null
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};
