const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      max: 255,
      default: null,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      select: false,
      min: 6,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('User', UserSchema);
