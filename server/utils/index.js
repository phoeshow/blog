const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../serverConfig');
const UserModel = require('../models/user');
const httpStatus = require('http-status');

const handleSuccess = (data = {}) => {
  return {
    success: true,
    data,
    message: 'success',
  };
};

const handleFailed = (error) => {
  let err = 'failed';
  if (typeof error === 'string') {
    err = error;
  }
  if (error instanceof Error && error.message) {
    err = error.message;
  }
  return {
    success: false,
    message: err,
    data: {},
  };
};

const authVerify = (requestAuthorityType) => {
  return async (ctx, next) => {
    try {
      if (!ctx.headers.authorization) {
        throw new Error('未检测到token');
      }
      const token = String(ctx.headers.authorization).split(' ').pop();
      const { id } = jwt.verify(token, jwtSecretKey);
      const user = await UserModel.findById(id);
      if (!user) {
        throw new Error('未找到用户');
      }
      const { authorityType } = user;
      if (authorityType === requestAuthorityType) {
        next();
      } else {
        ctx.status = httpStatus.UNAUTHORIZED;
      }
    } catch (error) {
      console.log(error);
      ctx.status = httpStatus.UNAUTHORIZED;
    }
  };
};

module.exports = {
  handleSuccess,
  handleFailed,
  authVerify,
};
