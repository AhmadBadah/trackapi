const express = require("express");
const mangoose = require("mongoose");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = mangoose.model("User");
router.post("/signUp", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token: token });
  } catch (err) {
    res.status(422).send(err.errmsg);
  }
});

router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "You must Enter Email And Password" });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).send({ error: "This Email is not found" });
  }
  try {
    await user.comparPassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "password is not correct" });
  }
});

module.exports = router;
