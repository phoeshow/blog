const Router = require('@koa/router');
const router = new Router();
const jwt = require('jsonwebtoken');

const { jwtSecretKey } = require('../serverConfig');
const {
  createAdmin,
  checkAdminExist,
  validatePassword,
} = require('../controller/auth');

const { handleFailed, handleSuccess, authVerify } = require('../utils');

router.prefix('/api/auth');

const sleep = (ms) => new Promise((reslove) => setTimeout(reslove, ms));
// 检查管理员账户是否已经存在
router.get('/adminexist', async (ctx) => {
  const admin = await checkAdminExist();

  ctx.body = handleSuccess({ exist: admin ? true : false });
});

// 用户登录
router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body;
  const validateResult = await validatePassword(username, password);

  if (!validateResult.user) {
    ctx.body = handleFailed(validateResult.message);
  } else {
    const token = jwt.sign({ ...validateResult.user }, jwtSecretKey);
    ctx.body = handleSuccess({
      user: validateResult.user,
      token: token,
    });
  }
});

// 注册
router.post('/register', async (ctx) => {
  try {
    const { username, password } = ctx.request.body;
    await createAdmin(username, password);
    ctx.body = handleSuccess();
  } catch (error) {
    console.log(error);
    ctx.body = handleFailed(error);
  }
});

router.post('/test', authVerify(100), async (ctx) => {
  ctx.body = handleSuccess({ hello: 'world' });
});

router.get('/isLogin', authVerify(100), async (ctx) => {
  ctx.body = handleSuccess({ isLogin: true });
});

module.exports = router;
