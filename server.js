require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./src/config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");

app.use("/", userRoutes);
app.use("/", productRoutes);

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
