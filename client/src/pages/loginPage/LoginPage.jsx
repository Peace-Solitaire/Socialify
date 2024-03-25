import React, { useState } from "react";
import "./styles.css";

import { useSnackbar } from "notistack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import GoogleLoginButton from "./components/GoogleLoginButton.jsx";
import FaceBookLoginButton from "./components/FaceBookLoginButton.jsx";
import GitHubLoginButton from "./components/GitHubLoginButton.jsx";

import { useDispatch } from "react-redux";
import {
  setLogin,
} from "../../redux/slices/userSlice.js";

import logImage from "../../assets/authentication.svg";
import registerImage from "../../assets/register.svg";

import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const LoginPage = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [signIn, toggle] = useState(true);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const submitHandlerLogin = async (e) => {
    e.preventDefault();

    const { signinEmail, signinPassword } = formData;

    if (!signinEmail || !signinPassword) {
     enqueueSnackbar("Please Fill all the Fields", {
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
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post("/api/auth/signin", formData, {
        ...config,
        withCredentials: true,
      });

     enqueueSnackbar("Login Successful", {
       variant: "success",
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
      if (data.success === false) {
        return;
      }
      dispatch(setLogin(data));
      navigate("/home");
    } catch (error) {
      enqueueSnackbar("Invalid Email or Password", {
        variant: "error",
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
    }
  };

  const validateEmail = (email) => {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return validRegex.test(email);
  };

  const submitHandlerSignup = async (e) => {
    e.preventDefault();
    const { signupName, signupEmail, signupPassword, signupConfirmPassword } =
      formData;

    if (
      !signupName ||
      !signupEmail ||
      !signupPassword ||
      !signupConfirmPassword
    ) {
      enqueueSnackbar("Please Fill all the Fields", {
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
    if (!validateEmail(signupEmail)) {
      enqueueSnackbar("Invalid Email Address", {
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
    if (signupPassword !== signupConfirmPassword) {
      enqueueSnackbar("Password does not match", {
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
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("/api/auth/signup", formData, {
        ...config,
        withCredentials: true,
      });
      enqueueSnackbar("Registration Successful", {
        variant: "success",
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

      if (data.success === false) {
        return;
      }
      dispatch(setLogin(data));
      navigate("/home");
    } catch (error) {
      enqueueSnackbar("Error Occured", {
        variant: "error",
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
    }
  };

  return (
    <div className={`container ${signIn ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Login to your account</h2>
            <div className="input-field">
              <i className="fas fa-user">
                <FaUser />
              </i>
              <input
                name="signinEmail"
                type="text"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock">
                <FaLock />
              </i>
              <input
                name="signinPassword"
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <input
              type="submit"
              value="Login"
              className="btn solid"
              onClick={submitHandlerLogin}
            />

            <p className="social-text">Or Sign in with</p>
            <div className="social-media">
              <GoogleLoginButton />
              <FaceBookLoginButton />
              <GitHubLoginButton />
            </div>
          </form>

          <form action="#" className="sign-up-form">
            <h2 className="title">Create Account</h2>
            <div className="input-field">
              <i className="icon">
                <FaUser />
              </i>
              <input
                name="signupName"
                type="text"
                placeholder="Name"
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <i className="icon">
                <FaEnvelope className="icon" />
              </i>
              <input
                name="signupEmail"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <i className="icon">
                <FaLock />
              </i>
              <input
                name="signupPassword"
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <i className="icon">
                <FaLock />
              </i>
              <input
                name="signupConfirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            </div>
            <input
              type="submit"
              className="btn solid"
              value="Sign up"
              onClick={submitHandlerSignup}
            />
            <p className="social-text">Or Sign up with</p>
            <div className="social-media">
              <GoogleLoginButton />
              <FaceBookLoginButton />
              <GitHubLoginButton />
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Hello, Friend!</h3>
            <p>Enter Your personal details and start your journey with us</p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={() => toggle(true)}
            >
              Sign up
            </button>
          </div>
          <img src={logImage} className="image" alt="" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>Welcome Back!</h3>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={() => toggle(false)}
            >
              Sign in
            </button>
          </div>
          <img src={registerImage} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
