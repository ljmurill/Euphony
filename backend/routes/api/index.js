const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth.js');
const sessionRouter = require('./session');
const usersRouter = require('./user');
const songRouter = require('./song');
const router = require('express').Router();

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/songs', songRouter);

// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
// });

// router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//           username: 'Demolicious'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
// }));

// router.get(
//     '/restore-user',
//     restoreUser,
//     (req, res) => {
//       return res.json(req.user);
//     }
// );

// router.get(
//     '/require-auth',
//     requireAuth,
//     (req, res) => {
//       return res.json(req.user);
//     }
// );

module.exports = router;
