import React from "react";
import { useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../../components/navbar/NavBar"
import UserWidget from "./components/widgets/UserWidget";
import AddPostWidget from "./components/widgets/AddPostWidget";
import AdvertisementWidget from "./components/widgets/AdvertisementWidget";
import FeedWidget from "./components/widgets/FeedWidget";
import FriendListWidget from "./components/widgets/FriendListWidget";

function HomePage() {
  const {_id, picturePath} = useSelector((state) => state.user.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <AddPostWidget picturePath={picturePath} />
          <FeedWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertisementWidget />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default HomePage;
