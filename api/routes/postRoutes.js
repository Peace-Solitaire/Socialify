const express = require("express");
const {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
} = require("../controllers/postController.js");
const { protect } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.post("/",protect, createPost);
router.get("/",protect, getFeedPosts);
router.get("/:id",protect, getUserPosts);
router.patch("/like/:id",protect, likePost);

module.exports = router;
