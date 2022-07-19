const router = require('express').Router();

const serviceController = require('../controllers/service');

router.post('/createService', serviceController.createService);
router.get('/listService', serviceController.listService);
router.get('/getService/:serviceId', serviceController.getService);
router.delete('/deleteService/:serviceId', serviceController.deleteService);

module.exports = router;
