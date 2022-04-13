const Router = require('express');
const router = new Router();
const emailController = require('../controllers/emailController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/getmail', authMiddleware, emailController.getMail);
router.post('/newmail', authMiddleware, emailController.newMail);
router.put('/update', authMiddleware, emailController.updateState);

module.exports = router;