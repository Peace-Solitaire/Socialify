const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const Post = require("../models/postModel.js");
const { errorHandler } = require("../middleware/errorMiddleware.js");

const createPost = asyncHandler(async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      name: user.name,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
    });
    await newPost.save();

    const post = await Post.find().sort({ createdAt: -1 });

    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

const getFeedPosts = asyncHandler(async (req, res) => {
  try {
    const post= await Post.find().sort({ createdAt: -1 });

    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

const getUserPosts = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

const likePost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});


module.exports = { createPost, getUserPosts, getFeedPosts, likePost };
