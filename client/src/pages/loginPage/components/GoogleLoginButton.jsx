import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { Button } from "./styles";
import { useSnackbar } from "notistack";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { appFirebase } from "../../../firebase";

import { useDispatch } from "react-redux";
import { setLogin } from "../../../redux/slices/userSlice";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(appFirebase);
      const result = await signInWithPopup(auth, provider);

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post("/api/auth/google/login", result.user, {
        ...config,
        withCredentials: true,
      });

      enqueueSnackbar("Logged in with Google Successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });

      dispatch(setLogin(data));
      navigate("/home");
    } catch (error) {
      enqueueSnackbar("Logged in with Google Successfully", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
    }
  };

  return (
    <Button onClick={handleClick}>
      <div className="icon">
        <FcGoogle size="24px" />
      </div>
      <span className="text">Login with Google</span>
    </Button>
  );
};

export default GoogleLoginButton;
