const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: 'string',
    unique: true,
    required: true,
  },
  password: {
    type: 'string',
    required: true,
  },
});
const User = model('users', userSchema);
module.exports = User;
