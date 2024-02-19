const express = require("express");
const router = express.Router();
const { User } = require("../models/schema");
const { authToken } = require("../models/auth.js");

const middleware = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.json({
      status: "error",
      code: 401,
      message: "Token is empty",
    });
  }
  const user = await authToken(auth);
  const checkUser = await User.findOne({
    _id: user.id,
    password: user.password,
    email: user.email,
  }).lean();

  if (!checkUser) {
    return res.json({
      status: "error",
      code: 401,
      message: "User does not exist",
    });
  }
  req.user = user;
  next();
};

const list = router.get("/list", async (req, res) => {
  try {
    res.json({
      status: "success",
      code: 200,
      data: { id: req.user.id, email: req.user.email },
      message: "User is OK",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
});

module.exports = {
  middleware,
  list,
};
