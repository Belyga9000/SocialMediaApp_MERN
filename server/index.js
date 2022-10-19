import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/posts", postRoutes);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/SocialMedia",
  { useUnifiedTopology: true, useNewUrlParser: true },
  function (err) {
    if (err) return console.log(err);
    app.listen(PORT, function () {
      console.log("Сервер работает");
    });
  }
);
