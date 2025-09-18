const express = require("express");
const app = express();
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
