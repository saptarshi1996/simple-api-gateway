const router = require('express').Router();

const apiController = require('../controllers/api');

router.post('/service/:serviceId/createApi', apiController.createApi);
router.post('/service/:serviceId/listApi', apiController.listApi);
router.get('/service/api/:apiId', apiController.getApi);

module.exports = router;
