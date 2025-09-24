require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./src/config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173","https://watches-co.vercel.app"],
  credentials: true,
}));

const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");


app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", cartRoutes);

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
