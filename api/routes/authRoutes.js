const express = require("express");
const {
  registerUser,
  authUser,
  googleAuthUser,
} = require("../controllers/authController.js");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", authUser);
router.post("/google/login", googleAuthUser);

module.exports = router;
