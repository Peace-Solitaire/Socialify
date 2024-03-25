import {
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import { useSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import FlexBetween from "../FlexBetween";
import UserImage from "../UserImage";
import WidgetWrapper from "../WidgetWrapper";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../../../redux/slices/userSlice";
import { appFirebase } from "../../../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";

function AddPostWidget({ picturePath }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { _id } = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [formData, setFormData] = useState({});

  const handleAddImage = async (e) => {
    setIsImage(true);
    setImage(e.target.files[0]);
  };
  const handlePost = async () => {
    if (!image) {
      enqueueSnackbar("No file selected", {
        variant: "warning",
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        action: (key) => (
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => closeSnackbar(key)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        ),
      });
      return;
    }

    try {
      const storage = getStorage(appFirebase);
      const fileName = `${new Date().getTime()}${image.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  userId: _id,
                  description: post,
                  picturePath: downloadURL,
                }));
                resolve(downloadURL);
              })
              .catch((error) => reject(error));
          }
        );
      });
      const { data } = await axios.post("/api/posts/", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setPosts({ posts: data }));
      setImage(null);
      setPost("");
    } catch (error) {
      console.error("Failed to upload post or image", error);
    }
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: "2rem",
            padding: "1rem 2rem",
            fontSize: "0.9rem"
          }}
        />
      </FlexBetween>
      {isImage && image && (
        <Box
          border={`1px solid grey`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            onLoad={() => URL.revokeObjectURL(image)}
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              borderRadius: "4px",
            }}
          />
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem">
          <input
            accept="image/jpeg,image/jpg,image/png"
            type="file"
            onChange={handleAddImage}
            style={{ display: "none" }}
            id="raised-button-file"
          />
          <label htmlFor="raised-button-file">
            <Button
              component="span"
              sx={{
                textTransform: "none",
                "&:hover": { backgroundColor: "#41C9E2" },
              }}
            >
              <ImageOutlined sx={{ color: "grey.600" }} />
              <Typography sx={{ color: "grey.600", paddingLeft: "0.25rem" }}>
                Image
              </Typography>
            </Button>
          </label>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: "grey.600" }} />
              <Typography color="grey.600">Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: "grey.600" }} />
              <Typography color="grey.600">Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: "grey.600" }} />
              <Typography color="grey.600">Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: "grey.600" }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post && !isImage}
          onClick={handlePost}
          sx={{
            color: "grey.600",
            backgroundColor: "white",
            borderRadius: "3rem",
            textTransform: "none",
            "&:hover": { backgroundColor: "#41C9E2" },
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
}

export default AddPostWidget;
