const express = require("express");
const productRouter = express.Router();
const Product = require("../models/Product");
const upload = require("../middlewares/multer");
const cloudinary = require("../config/cloudinary");

productRouter.post("/addproduct", upload.single("photo"), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    let photoUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "products" },
        async (error, result) => {
          if (error) {
            console.log("Cloudinary Upload Error:", error);
            return res.status(500).json({ error: "Image upload failed" });
          }
          photoUrl = result.secure_url;
          const product = new Product({ name, description, price, photoUrl });
          await product.save();

          res
            .status(201)
            .json({ message: "Product added successfully", data: product });
        }
      );
      result.end(req.file.buffer);
    } else {
      return res.status(400).json({ error: "Product photo is required" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to add product", details: error.message });
  }
});

productRouter.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ data: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

productRouter.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = productRouter;
