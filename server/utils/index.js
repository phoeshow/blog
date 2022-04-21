const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../../config/server.config');
const UserModel = require('../models/user');
// const httpStatus = require('http-status');
const httpErrors = require('http-errors');

const handleSuccess = (data = {}) => {
  if (typeof data === 'string') {
    return {
      success: true,
      message: data,
    };
  }
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
  return async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        res.send(handleFailed('未检测到token'));
      }
      const token = String(req.headers.authorization).split(' ').pop();
      const { id } = jwt.verify(token, jwtSecretKey);
      const user = await UserModel.findById(id);
      if (!user) {
        res.send(handleFailed('未找到用户'));
      }
      const { authorityType } = user;
      if (authorityType === requestAuthorityType) {
        next();
      } else {
        res.status(httpErrors.Unauthorized);
      }
    } catch (error) {
      res.status(httpErrors.Unauthorized);
    }
  };
};

module.exports = {
  handleSuccess,
  handleFailed,
  authVerify,
};
