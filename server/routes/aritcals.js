const Router = require('@koa/router');
const { addNewArtical } = require('../controller/articals');

const router = new Router();

const { handleFailed, handleSuccess, authVerify } = require('../utils');

router.prefix('/api/articals');

// 获取所有的文章
router.get('/', async (ctx) => {
  ctx.body = { articals: [] };
});

// 删除文章
router.post('/remove', authVerify(100), async (ctx) => {});

// add new artical
router.post('/add', authVerify(100), async (ctx) => {
  // const { data } = ctx.body;
  console.log(ctx.request.body);
  try {
    // await addNewArtical(data);
    ctx.body = handleSuccess({});
  } catch (error) {
    ctx.body = handleFailed(error);
  }
});

// modify
router.post('/modify', authVerify(100), async (ctx) => {});

// 文章内容 通过文章id获取
router.get('/:id', async (ctx) => {});

module.exports = router;
