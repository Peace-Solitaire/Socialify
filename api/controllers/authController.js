const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const generateToken = require("../config/generateToken.js");

const registerUser = asyncHandler(async (req, res) => {
  const formData = req.body;
  const name = formData.signupName;
  const email = formData.signupEmail;
  const password = formData.signupPassword;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({
      message: "User already exists",
    });
    throw new Error("User already exists");
  }
  const newUser = await User.create({
    name,
    email,
    password,
  });

  if (newUser) {
    const currToken = generateToken(newUser._id);
    res.status(201).json({
      user: newUser,
      token: currToken,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const formData = req.body;
  const email = formData.signinEmail;
  const password = formData.signinPassword;

  const currUser = await User.findOne({ email });
  if (currUser && (await currUser.matchPassword(password))) {
    const currToken = generateToken(currUser._id);
    res.status(200).json({
      user: currUser,
      token: currToken,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const googleAuthUser = asyncHandler(async (req, res) => {
  try {
    let currUser = await User.findOne({ email: req.body.email });

    if (!currUser) {
      currUser = await User.create({
        name: req.body.displayName,
        email: req.body.email,
        picturePath: req.body.photoUrl,
      });
    }
    const currToken = generateToken(currUser._id);
    res.status(200).json({
      user: currUser,
      token: currToken,
    });
  } catch (error) {
    res.status(401);
    throw new Error("Unable to Login with Google");
  }
});


module.exports = { registerUser, authUser, googleAuthUser };
