const express = require("express");
const {
  updateUser,
  deleteUser,
  getNotifications,
  getUser,getUserFriends,addRemoveFriend
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/update/:id", protect, updateUser);
router.delete("/delete/:id", protect, deleteUser);
router.get("/notification/:id", protect, getNotifications);

router.get("/:id", getUser);
router.get("/friends/:id", getUserFriends);
router.post("/:id/:friendId", addRemoveFriend);


module.exports = router;
