require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("err", (err) => console.log(err));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routing process
const todoRouter = require("./routes/todos");
app.use("/todos", todoRouter);

app.listen(3000, () => {
  console.log("Server Started");
});
