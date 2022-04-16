const mongoose = require('mongoose');

// authorityType 权限的等级
// admin为100
const ArticalModel = mongoose.model(
  'Artical',
  new mongoose.Schema({
    // 标题
    title: { type: String },
    author: String,
    // 标签
    catigories: {
      type: [String],
    },
    // 创建日期
    date: {
      type: Date,
      default: Date.now,
    },
    // 更新日期
    updated: {
      type: Date,
    },
    // 描述，会在首页显示
    description: {
      type: String,
      default: '',
    },
    // 文章内容
    content: {
      type: String,
      default: '',
    },
    // 评论系统我还没有想好等等再说
    // allowComment: {
    //   type: Boolean,
    //   default: false,
    // },
    // comments: [
    //   {
    //     author: String,
    //   },
    // ],
  })
);

module.exports = ArticalModel;
