const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
    description: {
    type: String,
    trim: true,
    maxlength: 1000,
    default: "No description available.",
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    },
    stock: {
    type: Number,
    required: true,
    min: 0,
    default: 1,
    },
    photoUrl: {
    type: String,
    trim: true,
    required: true,
    default:
      "https://hodinkee-production.s3.amazonaws.com/uploads/images/360ca4f0-38b0-49bf-a6d8-c55ae706c1a4/TW2T22700-Natural.jpg",
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);