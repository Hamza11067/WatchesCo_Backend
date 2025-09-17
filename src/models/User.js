const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

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
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
  },
  about: {
    type: String,
    trim: true,
    maxlength: 500,
    default: "No information provided.",
  },
  photoUrl: {
    type: String,
    trim: true,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s",
    validate() {
      if (!validator.isURL(this.photoUrl)) {
        throw new Error("Invalid URL format for photo");
      }
    },
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
