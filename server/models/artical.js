const mongoose = require('mongoose');

// authorityType 权限的等级
// admin为100
const ArticalModel = mongoose.model(
  'Artical',
  new mongoose.Schema({
    // 标题
    title: { type: String, default: '', required: true },
    author: String,
    // 标签
    categories: {
      type: [String],
      default: [],
    },
    // 创建日期
    date: {
      type: Date,
      default: Date.now,
    },
    // 更新日期
    updated: {
      type: Date,
      default: Date.now,
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
    draft: {
      type: String,
      default: '',
    },
    published: {
      type: Boolean,
      default: false,
    },
  })
);

module.exports = ArticalModel;
