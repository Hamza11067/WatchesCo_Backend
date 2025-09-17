const express = require("express");
const app = express();
const connectDB = require("./src/config/db");

app.get("/", (req, res) => {
  res.send("Hello World! from Hamza Khalid!!!!!");
});

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
