import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { Button } from "./styles";
import styled from "styled-components";
import { useSnackbar } from "notistack";

const FacebookButton = styled(Button)`
  background-color: #4267b2;
  &:hover {
    background-color: #365899;
  }
  .icon {
    color: #fff;
    left: 10.5px;
  }
  .text {
    color: #fff;
  }
`;

const FaceBookLoginButton = () => {
  const {enqueueSnackbar} = useSnackbar();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
        enqueueSnackbar("Login with GitHub is unavailable at the moment.", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
        });
      return;
    } catch (error) {
      enqueueSnackbar("Unable to Login at the moment.", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
    }
  };
  return (
    <FacebookButton onClick={handleClick}>
      <div className="icon">
        <FaFacebookF size="24px" />
      </div>
      <span className="text">Login with Facebook</span>
    </FacebookButton>
  );
};

export default FaceBookLoginButton;
