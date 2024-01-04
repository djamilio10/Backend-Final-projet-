const express = require("express");
const cors = require("cors");
const port = 5000;
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/post", require("./routes/post.routes"));

app.listen(port, () => console.log("le server a demarer au port " + port));
