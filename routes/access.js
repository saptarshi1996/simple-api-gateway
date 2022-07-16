const router = require('express').Router();

const accessController = require('../controllers/access');

router.post('/authenticate', accessController.loginUser);
router.post('/register', accessController.createUser);

exports.router = router;
