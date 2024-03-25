import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../Friend"; // Assuming Friend component can be reused for followers
import WidgetWrapper from "../WidgetWrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const FollowerWidget = ({ userId }) => {
  const [followers, setFollowers] = useState([]);
  const token = useSelector((state) => state.user.token);
  

  const getFollowers = async () => {
    try {
      const { data } = await axios.get(`/api/user/${userId}/followers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFollowers(data);
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

//   useEffect(() => {
//     getFollowers();
//   }, []);

  return (
    <WidgetWrapper>
     
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {followers.map((follower) => (
          <Friend
            key={follower._id}
            friendId={follower._id}
            name={follower.name}
            subtitle={"Follower"} // Placeholder, adjust as needed
            userPicturePath={follower.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FollowerWidget;
