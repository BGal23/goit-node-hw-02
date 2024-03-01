const express = require("express");
const router = express.Router();

const { signup } = require("../../controllers/signup");
const { login } = require("../../controllers/login");
const { current } = require("../../controllers/current");
const { logout } = require("../../controllers/logout");
const { middleware } = require("../../controllers/middleware");
const { subscription } = require("../../controllers/subscription");
const { avatars, upload } = require("../../controllers/avatars");
const { verifyToken } = require("../../controllers/verifyToken");

router.post("/signup", signup);
router.post("/login", login);
router.get("/current", middleware, current);
router.post("/logout", middleware, logout);
router.patch("/", middleware, subscription);
router.patch("/avatars", middleware, upload.single("avatar"), avatars);
router.get("/verifyToken/:verificationToken", verifyToken);

module.exports = router;
