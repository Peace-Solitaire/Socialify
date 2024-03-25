import React from "react";
import { FaGithub } from "react-icons/fa";
import { Button } from "./styles";
import styled from "styled-components";
import { useSnackbar } from "notistack";

const GitHubButton = styled(Button)`
  background-color: #000;
  &:hover {
    background-color: #333;
  }
  .icon {
    color: #fff;
  }
  .text {
    color: #fff;
  }
`;

const GitHubLoginButton = () => {
  const { enqueueSnackbar} = useSnackbar();
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
    <GitHubButton onClick={handleClick}>
      <div className="icon">
        <FaGithub size="24px" />
      </div>
      <span className="text">Login with GitHub</span>
    </GitHubButton>
  );
};

export default GitHubLoginButton;
