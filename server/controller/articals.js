const ArticalModel = require('../models/artical');
const { handleSuccess, handleFailed } = require('../utils');

// 新增文章
const addArtical = async (req, res) => {
  try {
    const { title, author, categories, description, draft } = req.body;
    const artical = new ArticalModel({
      title,
      author,
      categories,
      description,
      draft,
    });
    await artical.save();
    res.send(
      handleSuccess({
        id: artical._id,
      })
    );
  } catch (error) {
    res.send(handleFailed(error));
  }
};

// 发布文章，将draft的内容用于正式
const publishArticalById = async (req, res) => {
  try {
    const { id } = req.body;
    const artical = await ArticalModel.findById(id);
    if (!artical) {
      throw new Error('未找到文章');
    }
    artical.content = artical.draft;
    artical.published = true;
    await artical.save();
    res.send(
      handleSuccess({
        id: artical._id,
      })
    );
  } catch (error) {
    res.send(handleFailed(error));
  }
};

// 修改文章
const modifyArticalById = async (req, res) => {
  try {
    const { id, title, categories, description, draft } = req.body;
    const artical = await ArticalModel.findById(id);
    if (!artical) {
      throw new Error('未找到文章');
    }
    artical.title = title;
    artical.categories = categories;
    artical.description = description;
    artical.draft = draft;

    artical.updated = Date.now();
    await artical.save();
    res.send(handleSuccess({ id: artical.id }));
  } catch (error) {
    res.send(handleFailed(error));
  }
};

// 删除文章
const removeArticalById = async (req, res) => {
  try {
    const { id } = req.body;
    const artical = await ArticalModel.findById(id);

    if (!artical) {
      throw new Error('未找到文章');
    }
    await artical.remove();
    res.send(handleSuccess('删除成功'));
  } catch (error) {
    res.send(handleFailed(error));
  }
};

module.exports = {
  addArtical,
  publishArticalById,
  removeArticalById,
  modifyArticalById,
};
