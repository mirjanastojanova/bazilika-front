import styled, { css } from "styled-components";
import { primary } from "../lib/colors";

export const ButtonStyle = css`
  border: 0;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-weight: semi-bold;
  svg {
    height: 16px;
    margin-right: 5px;
  }
  ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}
  ${(props) =>
    props.catplus &&
    css`
      background-color: inherit;
      color: white;
      font-size: 1.5rem;
    `}
  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #001b79;
      color: white;
    `}
    ${(props) =>
    props.numbers &&
    css`
      background-color: white;
      color: black;
      font-weight: 700;
    `}
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #211e51;
      border: 1px solid #211e51;
    `}
  ${(props) =>
    props.black &&
    !props.outline &&
    css`
      background-color: #000;
      color: #fff;
    `}
  ${(props) =>
    props.black &&
    props.outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;
      display: inline-flex;
    `}
  ${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: ${primary};
      border: 1px solid ${primary};
      color: #fff;
    `}
  ${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      border: 1px solid ${primary};
      color: ${primary};
    `}
    
  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
      }
    `}
    ${(props) =>
    props.flexButton &&
    props.block &&
    css`
      display: flex;
      justify-content: center;
      background-color: #001b79;
      border: 1px solid #001b79;
      color: white;
      font-weight: 700;
      @media screen and (min-width: 768px) {
        width: 150px;
      }
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

const Button = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
