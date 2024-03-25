import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../Friend"; // Reusing Friend for following list for simplicity
import WidgetWrapper from "../WidgetWrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const FollowingWidget = ({ userId }) => {
  const [following, setFollowing] = useState([]);
  const token = useSelector((state) => state.user.token);

  const getFollowing = async () => {
    try {
      const { data } = await axios.get(`/api/user/${userId}/following`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFollowing(data);
    } catch (error) {
      console.error("Error fetching following:", error);
    }
  };

//   useEffect(() => {
//     getFollowing();
//   }, []);

  return (
    <WidgetWrapper>
      
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {following.map((follow) => (
          <Friend
            key={follow._id}
            friendId={follow._id}
            name={follow.name}
            subtitle={"Following"} // Placeholder, adjust as needed
            userPicturePath={follow.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FollowingWidget;
