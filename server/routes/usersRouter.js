const Router = require('express');
const router = new Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/table', authMiddleware, usersController.getAll);
router.post('/registration', usersController.registration);
router.post('/login', usersController.login);
router.put('/block', authMiddleware, usersController.blockUser);
router.put('/unlock', authMiddleware, usersController.unlockUser);
router.delete('/delete', authMiddleware, usersController.deleteUser);

module.exports = router;