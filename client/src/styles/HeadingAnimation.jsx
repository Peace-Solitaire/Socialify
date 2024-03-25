import React from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const generateAnimation = (delay) => keyframes`
  0%, 100% { transform: scaleY(1); color: rgb(255, 0, 0); }
  10% { color: rgb(255, 165, 0); }
  20% { color: rgb(255, 255, 0); }
  30% { color: rgb(0, 128, 0); }
  40% { transform: scaleY(1.5); color: rgb(0, 0, 255); }
  50% { color: rgb(75, 0, 130); }
  60% { color: rgb(238, 130, 238); }
  70% { transform: scaleY(1.5); color: rgb(255, 0, 0); }
  80% { color: rgb(255, 165, 0); }
  90% { color: rgb(255, 255, 0); }
`;

const AnimatedLetter = styled.span`
  display: inline-block;
  animation: ${(props) => generateAnimation(props.delay)} 2s infinite;
  animation-delay: ${(props) => props.delay}s;
  transform-origin: bottom;
  font-size: ${(props) =>
    props.size || "1em"}; /* Use the size prop or a default value */
`;

const WaveText = ({ text, size }) => {
  const letters = text.split("");

  return (
    <div style={{ display: "inline-block" }}>
      {letters.map((letter, index) => (
        <AnimatedLetter key={index} delay={index * 0.1} size={size}>
          {letter}
        </AnimatedLetter>
      ))}
    </div>
  );
};

export default WaveText;
