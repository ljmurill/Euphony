const sessionRouter = require('./session');
const usersRouter = require('./user');
const songRouter = require('./song');
const commentRouter = require('./comments');
const router = require('express').Router();

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/songs', songRouter);
router.use('/songs', commentRouter);

module.exports = router;
