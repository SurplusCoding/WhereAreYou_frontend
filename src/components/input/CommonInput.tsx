import React from "react";
import styled from "styled-components";

interface InputPropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  height?: string;
  margin?: string;
}

const CommonInput = ({ width, height, margin, ...rest }: InputPropsType) => {
  return <InputBox style={{ width, height, margin }} {...rest} />;
};

const InputBox = styled.input`
  border-radius: 3px;
  background-color: #202225;
  border: none;
  color: white;
  font-size: 15px;
  padding: 3%;
`;

export default CommonInput;
