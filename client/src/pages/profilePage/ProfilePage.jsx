import {
  Box,
  useMediaQuery,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/NavBar";
import FriendListWidget from "../homePage/components/widgets/FriendListWidget";
import AddPostWidget from "../homePage/components/widgets/AddPostWidget";
import FeedWidget from "../homePage/components/widgets/FeedWidget";
import UserWidget from "../homePage/components/widgets/UserWidget";
import axios from "axios";
import FollowingWidget from "../homePage/components/widgets/FollowingWidget";
import FollowerWidget from "../homePage/components/widgets/FollowerWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.user.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [selectedWidget, setSelectedWidget] = useState("Followers");

  const getUser = async () => {
    const { data } = await axios.get(`/api/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <AddPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FeedWidget userId={userId} isProfile />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <ToggleButtonGroup
            value={selectedWidget}
            exclusive
            onChange={(event, newValue) => {
              setSelectedWidget(newValue);
            }}
            fullWidth
            sx={{ marginBottom: "1rem" }}
          >
            {selectedWidget !== "Followers" ? 
            (
              <ToggleButton
                sx={{
                  color: "#41C9E2",
                  background: "white",
                  borderRadius: "10px",
                }}
                value="Followers"
              >
                Followers
              </ToggleButton>
              )
            :
            (
              <ToggleButton
                sx={{
                  color: "#41C9E2",
                  background: "white",
                  borderRadius: "10px",
                }}
                value="Following"
              >
                Following
              </ToggleButton>
              )
            }
          </ToggleButtonGroup>

          {selectedWidget !== "Followers" ? (
            <FollowerWidget userId={userId} />
          ) : (
            <FollowingWidget userId={userId} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
