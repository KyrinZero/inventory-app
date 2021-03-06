const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/build")));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const productRoute = require("./routes/product");
const historyRoute = require("./routes/history");
const userRoute = require("./routes/user");

app.use("/product", productRoute);
app.use("/history", historyRoute);
app.use("/user", userRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
