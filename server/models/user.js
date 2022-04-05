const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// authorityType 权限的等级
// admin为100
const UserModel = mongoose.model(
  'User',
  new mongoose.Schema({
    username: { type: String, unique: true },
    password: {
      type: String,
      set(val) {
        return bcrypt.hashSync(val, 10);
      },
    },
    isAdmin: { type: Boolean },
    authorityType: { type: Number },
  })
);

module.exports = UserModel;
