import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, Link } from "@mui/material";
import UserImage from "../UserImage";
import FlexBetween from "../FlexBetween";
import WidgetWrapper from "../WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);

  const getUser = async () => {
    const { data } = await axios.get(`/api/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(data);
  };
  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  const { name, location, occupation, viewedProfile, impressions, friends } =
    user;

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color="black"
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
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined sx={{color: "black", "&:hover": {
                  color: "grey",
                  cursor: "pointer",
                },}}/>
      </FlexBetween>

      <Divider />

      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color="grey" fontWeight="500">
            Followers
          </Typography>
          <Typography color="grey.700" fontWeight="500">
            {friends.length}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color="grey" fontWeight="500">
            Following
          </Typography>
          <Typography color="grey.700" fontWeight="500">
            {friends.length}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />
      <Box p="1rem 0">
        <FlexBetween gap="1rem" mb="0.5rem">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: "grey.700" }} />
            <Typography color="grey">{location}</Typography>
          </Box>
          <EditOutlined sx={{ color: "grey.700" }} />
        </FlexBetween>
        <FlexBetween gap="1rem" mb="0.5rem">
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="large" sx={{ color: "grey.700" }} />
            <Typography color="grey">{occupation}</Typography>
          </Box>
          <EditOutlined sx={{ color: "grey.700" }} />
        </FlexBetween>
      </Box>
      <Divider />

      <Box p="1rem 0">
        <Typography fontSize="1rem" color="grey.700" fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <a href="https://www.linkedin.com/in/yourusername">
              <FontAwesomeIcon icon={faLinkedin} size="2x" color="#0077b5" />
            </a>
            <Box>
              <Link
                href="https://www.linkedin.com/in/yourusername"
                underline="none"
              >
                <Typography color="grey.700" fontWeight="500">
                  Linkedin
                </Typography>
              </Link>
              <Typography color="grey">Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: "grey.700" }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <a href="https://twitter.com/yourusername">
              <FontAwesomeIcon icon={faTwitter} size="2x" color=" #1DA1F2" />
            </a>

            <Box>
              <Link href="https://twitter.com/yourusername" underline="none">
                <Typography color="grey.700" fontWeight="500">
                  Twitter
                </Typography>
              </Link>
              <Typography color="grey">Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: "grey.700" }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
