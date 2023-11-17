import styled from "styled-components";

interface ButtonPropsType
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  children: string;
}

const CommonButton = ({
  width,
  height,
  padding,
  margin,
  children,
  ...rest
}: ButtonPropsType) => {
  return (
    <Button style={{ width, height, padding, margin }} {...rest}>
      {children}
    </Button>
  );
};

const Button = styled.button`
  border-radius: 3px;
  background-color: #5865f2;
  border: none;
  color: white;
  transition: all 0.2s;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #5253bd;
  }
`;

export default CommonButton;
