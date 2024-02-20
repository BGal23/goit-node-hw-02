const express = require("express");
const router = express.Router();

const { signup } = require("../../controllers/signup");
const { login } = require("../../controllers/login");
const { current } = require("../../controllers/current");
const { logout } = require("../../controllers/logout");
const { middleware } = require("../../controllers/middleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/current", middleware, current);
router.post("/logout", middleware, logout);

module.exports = router;
