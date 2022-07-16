const router = require('express').Router();

const accessController = require('../controllers/access');
const authMiddleware = require('../middlewares/auth');

router.post('/authenticate', accessController.loginUser);
router.post('/register', accessController.createUser);
router.post('/generateApiKey', authMiddleware, accessController.generateApiKey);

module.exports = router;
