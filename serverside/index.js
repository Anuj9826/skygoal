const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const route = require("./src/routes/route");
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;
const URL = process.env.MONGOURL || "mongodb+srv://Pragesh_Yadav:Mongoblog22@cluster0.ebq4hak.mongodb.net/skygoal";

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use("/", route);

app.listen(PORT, function () {
  console.log("Express app running on port", PORT);
});