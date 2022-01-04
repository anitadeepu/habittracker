const {Schema, model} = require('mongoose');

const userSchema = new Schema({
  createdOn: { type: Date, required: true, default: Date.now },
  userName: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  
  hashedPassword: {
    type: String,
    required: true,
  },
  roles: [String],
});

const User = model("User", userSchema);

module.exports = User;