import styled, { keyframes } from "styled-components";
const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const expandButton = keyframes`
  from { width: 46px; } 
  to { width: 230px; }
`;

export const Button = styled.button`
  background-color: #f2f2f2;
  margin: 1rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  width: 46px;
  height: 46px;
  transition: border-radius 0.3s ease, background-color 0.3s ease;

  &:hover {
    border-radius: 30px; // Smooth transition to rounded corners
    animation: ${expandButton} 0.5s forwards ease;
    .text {
      display: inline;
      animation: ${fadeIn} 0.5s forwards ease;
      animation-delay: 0.25s;
    }
  }

  .icon {
    position: absolute;
    left: 11px;
    top: 11px;
  }

  .text {
    white-space: nowrap;
    font-weight: bold;
    color: #000;
    padding-left: 1rem;
    opacity: 0;
    font-size: 1.1rem;
  }
`;
