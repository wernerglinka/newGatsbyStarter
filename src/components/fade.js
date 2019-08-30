import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

const FadeContainer = styled.div`
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const Fade = ({ show, children }) => {
  const [render, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    console.log("animationEnd");
    if (!show) setRender(false);
  };

  console.log(show);

  return (
    render && (
      <FadeContainer
        style={{ animation: `${show ? "fadeIn" : "fadeOut"} 0.5s` }}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </FadeContainer>
    )
  );
};

export default Fade;
