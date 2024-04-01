import styled from "styled-components";

const InputStyle = styled.input`
  width: 100%;
  border: 1px solid #999;
  border-radius: 5px;
  padding: 10px;
`;

const Input = (props) => {
  return <InputStyle type="text" placeholder="Пронајди производ" onChange={props.search}/>;
};

export default Input;
