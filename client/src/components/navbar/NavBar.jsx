import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Search,
  Message,
  Notifications,
  DarkMode,
  LightMode,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setMode } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../pages/homePage/components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const fullName = user.name;
  return (
    <FlexBetween padding="1rem 6%" backgroundColor="white">
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="#41C9E2"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: "#008DDA",
              cursor: "pointer",
            },
          }}
        >
          Socialify
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor="grey.100"
            border="2px solid #41C9E2"
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
            sx={{
              "&:hover": {
                border: "2px solid #008DDA",
                cursor: "pointer",
              },
            }}
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <Message sx={{ fontSize: "25px", color: "#41C9E2", "&:hover": {
                color: "#008DDA",
                cursor: "pointer",
              }, }} />
          <Notifications sx={{ fontSize: "25px", color: "#41C9E2", "&:hover": {
                color: "#008DDA",
                cursor: "pointer",
              }, }} />
          <Help sx={{ fontSize: "25px", color: "#41C9E2", "&:hover": {
                color: "#008DDA",
                cursor: "pointer",
              }, }} />
          <FormControl variant="standard" value={fullName} >
            <Select
              value={fullName}
              sx={{
                backgroundColor: "grey.100",
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: "grey.100",
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName} >
                <Typography >{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="50%"
          minWidth="20%"
          backgroundColor="white"
        >
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: "white",
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: "white",
                  },
                  "&:hover": {
                    backgroundColor: "white",
                  },
                  // color: "#008DDA",
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "& .MuiOutlinedInput-root:hover fieldset": {
                    borderColor: "white",
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
