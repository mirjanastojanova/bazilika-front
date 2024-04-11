import styled, { css } from "styled-components";

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: 600;
  color: #211e51;
  border-bottom: 1px #211e51 solid;
  width: 100%;
  @media screen and (min-width: 768px) {
    font-weight: 700;
  }
  ${(props) =>
    props.color &&
    css`
      color: #597e52;
      border-bottom: 1px #597e52 solid;
    `}
`;

export default Title;
