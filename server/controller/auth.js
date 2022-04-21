const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');

const { jwtSecretKey } = require('../../config/server.config');

const { handleFailed, handleSuccess } = require('../utils');

const checkAdminExist = async () => {
  const admin = await UserModel.findOne({ isAdmin: true }).exec();
  return admin;
};

const adminExist = async (req, res) => {
  try {
    const admin = await checkAdminExist();
    res.send(handleSuccess({ exist: admin ? true : false }));
  } catch (error) {
    res.send(handleFailed(error));
  }
};

const createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await checkAdminExist();
    if (!admin) {
      const newAdmin = new UserModel({
        username,
        password,
        isAdmin: true,
        authorityType: 100,
      });
      await newAdmin.save();
      res.send(handleSuccess());
    } else {
      throw new Error('已经存在 admin 用户');
    }
  } catch (error) {
    res.send(handleFailed(error));
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const validateResult = await validatePassword(username, password);
    const token = jwt.sign({ ...validateResult.user }, jwtSecretKey, {
      expiresIn: '12h',
    });

    res.send(
      handleSuccess({
        user: validateResult.user,
        token: token,
      })
    );
  } catch (error) {
    res.send(handleFailed(error));
  }
};

const validatePassword = async (username, password) => {
  try {
    const user = await UserModel.findOne({ username }).exec();
    if (!user) {
      throw new Error({
        message: '无效的用户',
      });
    }
    if (bcrypt.compareSync(password, user.password)) {
      return {
        user: {
          username: user.username,
          authorityType: user.authorityType,
          id: String(user._id),
        },
      };
    } else {
      throw new Error({
        message: '密码无效',
      });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAdmin,
  adminExist,
  login,
};
