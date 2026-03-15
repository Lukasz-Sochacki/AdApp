const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true, minlenght: 3 },
  password: { type: String, required: true },
  avatar: { type: String },
  phoneNumber: { type: Number, required: true, minlength: 9, maxlength: 12 },
});

module.exports = mongoose.model('User', userSchema);
