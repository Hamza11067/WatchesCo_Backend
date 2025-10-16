const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate() {
      if (!validator.isEmail(this.email)) {
        throw new Error("Invalid email format");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100,
    validate() {
      if (!validator.isStrongPassword(this.password)) {
        throw new Error("Password must be strong");
      }
    },
  },
  role: {
    type: String,
    enum: ["buyer", "admin"],
    default: "buyer",
  }
}, { timestamps: true });

userSchema.methods.validatePassword = async function(password) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid;
}

userSchema.methods.getJWT = async function() {
  const user = this;
  const token = await jwt.sign({ id: user._id}, "WATCHESCO@123", { expiresIn: '1d' });
  return token;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
