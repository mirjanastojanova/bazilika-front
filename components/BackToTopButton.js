import { useEffect, useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 50px;
  background-color: #222;
  color: white;
  border: 0;
  @media screen and (min-width: 768px) {
    .button {
      position: fixed;
      bottom: 40px;
      right: 20px;
      width: 38px;
      height: 35px;
      border-radius: 50px;
      background-color: #d20000;
      color: white;
      border: 0;
    }
  }
`;

export const BackToTopButton = () => {
  const [backToTop, setBackToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return <div>{backToTop && <Button onClick={scrollUp}>↑</Button>}</div>;
};
