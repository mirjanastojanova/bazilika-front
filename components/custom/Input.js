import styled from "styled-components";

const InputStyle = styled.input`
  width: 95%;
  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 10px;
  margin: 0;
  @media screen and (min-width: 768px) {
    width: 100%;
    border: 1px solid #dddddd;
    border-radius: 5px;
    padding: 10px;
  }
`;

const Input = (props) => {
  return (
    <InputStyle
      type="text"
      placeholder="Пронајди производ"
      onChange={props.search}
    />
  );
};

export default Input;
