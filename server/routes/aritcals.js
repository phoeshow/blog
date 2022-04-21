const router = require('express').Router();
const { authVerify } = require('../utils');
const {
  addArtical,
  publishArticalById,
  removeArticalById,
  modifyArticalById,
} = require('../controller/articals');

router.post('/add', authVerify(100), addArtical);
router.post('/publish', authVerify(100), publishArticalById);
router.post('/remove', authVerify(100), removeArticalById);
router.post('/modify', authVerify(100), modifyArticalById);

module.exports = router;
