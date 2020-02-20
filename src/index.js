require('../model/User');
require('../model/Track');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRouter = require("./routes/authRouter");
const trackRouter = require('./routes/trackRouter');
const requireAuth = require('../middlewares/requireAuth');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(authRouter);
app.use(trackRouter);
const mongoUri =
  "mongodb+srv://admin:admin@cluster0-e0gq1.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

mongoose.connection.on("connected", () => {
  console.log("conneted to mongoDB");
});
mongoose.connection.on("error", err => {
  console.log("error to conneted with mongoDB", err);
});

app.get("/",requireAuth, (req, res) => {
  res.send(`Your email is: ${req.user.email}`);
});

app.listen(PORT, () => {
  console.log("server running!");
});
