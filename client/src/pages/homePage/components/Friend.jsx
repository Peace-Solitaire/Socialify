import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../../../redux/slices/userSlice";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const friends = useSelector((state) => state.user.user.friends);
  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
      const {data} = await axios.patch(
        `/api/user/${_id}/${friendId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color="black"
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: "grey",
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color="grey" fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{
          backgroundColor: "grey.200",
          p: "0.6rem",
          "&:hover": {
            background: "#41C9E2",
            cursor: "pointer",
          },
        }}
      >
        {isFriend ? (
          <PersonRemoveOutlined
            sx={{ backgroundColor: "#41C9E2", color: "grey.200" }}
          />
        ) : (
          <PersonAddOutlined
            sx={{
              color: "#008DDA",
              "&:hover": {
                color: "grey.200",
                cursor: "pointer",
              },
            }}
          />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
