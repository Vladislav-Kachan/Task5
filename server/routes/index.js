const Router = require('express');
const router = new Router();
const usersRouter = require('./usersRouter');
const emailRouter = require('./emailRouter');

router.use('/email', emailRouter);
router.use('/users', usersRouter);

module.exports = router;