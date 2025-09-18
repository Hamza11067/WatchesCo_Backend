const express = require("express");
const productRouter = express.Router();
const Product = require("../models/Product");

productRouter.post("/addproduct", async (req, res) => {
  try {
    const { name, description, price, photoUrl } = req.body;
    const product = new Product({ name, description, price, photoUrl });
    await product.save();
    res
      .status(201)
      .json({ message: "Product added successfully", data: product });
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

module.exports = productRouter;
