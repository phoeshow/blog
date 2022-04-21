const router = require('express').Router();
const { createAdmin, adminExist, login } = require('../controller/auth');
const { authVerify, handleSuccess } = require('../utils');

router.get('/adminexist', adminExist);
router.get('/isLogin', authVerify(100), async (req, res) => {
  res.send(handleSuccess());
});
router.post('/login', login);
router.post('/register', createAdmin);

module.exports = router;
