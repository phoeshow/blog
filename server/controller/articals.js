const ArticalModel = require('../models/artical');

async function addNewArtical(data) {
  const { title, author, categories, description, draft } = data;
  // 回头做个validate
  const artical = new ArticalModel({
    title,
    author,
    categories,
    description,
    draft,
  });

  await artical.save();
}

module.exports = {
  addNewArtical,
};
