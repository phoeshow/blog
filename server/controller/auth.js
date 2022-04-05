const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');

const createAdmin = async (username, password) => {
  try {
    const admin = await checkAdminExist();
    if (!admin) {
      const newAdmin = new UserModel({
        username,
        password,
        isAdmin: true,
        authorityType: 100,
      });
      await newAdmin.save();
    } else {
      throw new Error('admin exist');
    }
  } catch (error) {
    throw error;
  }
};

const checkAdminExist = async () => {
  const admin = await UserModel.findOne({ isAdmin: true }).exec();
  return admin;
};

const validatePassword = async (username, password) => {
  try {
    const user = await UserModel.findOne({ username }).exec();
    if (!user) {
      return {
        message: '无效的用户',
      };
    }
    console.log(user);
    if (bcrypt.compareSync(password, user.password)) {
      return {
        user: {
          username: user.username,
          authorityType: user.authorityType,
          id: String(user._id),
        },
      };
    } else {
      return {
        message: '密码无效',
      };
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createAdmin,
  checkAdminExist,
  validatePassword,
};
