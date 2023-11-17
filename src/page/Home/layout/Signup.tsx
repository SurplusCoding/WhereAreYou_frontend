import CommonButton from "@/components/button/CommonButton";
import Column from "@/components/flex/Column";
import Row from "@/components/flex/Row";
import CommonInput from "@/components/input/CommonInput";
import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import loginModalStore from "@/store/loginModal.store";
import { signUp } from "@/api";

const Signup = () => {
  const [isRegister, setIsRegister] = useRecoilState(loginModalStore);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignup = async () => {
    const result = await signUp({ name, email, password });
    console.log(result);
  };

  return (
    <Container>
      <LoginBox>
        <Column gap="5vh">
          <Welcome>Create an account</Welcome>
          <Column gap="20px">
            <Column gap="10px">
              <LoginText>name</LoginText>
              <CommonInput
                width="100%"
                height="40px"
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </Column>
            <Column gap="10px">
              <LoginText>email</LoginText>
              <CommonInput
                width="100%"
                height="40px"
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </Column>
            <Column gap="10px">
              <LoginText>password</LoginText>
              <CommonInput
                width="100%"
                height="40px"
                onChange={(e) => setPassword(e.currentTarget.value)}
                type="password"
              />
            </Column>
          </Column>
          <Column gap="15px">
            <CommonButton
              width="100%"
              height="50px"
              margin="20px 0 0 0"
              onClick={handleSignup}
            >
              Continue
            </CommonButton>
            <Row gap="10px">
              <ToRegister onClick={() => setIsRegister(false)}>
                Already have an account
              </ToRegister>
            </Row>
          </Column>
        </Column>
      </LoginBox>
    </Container>
  );
};

const Container = styled.div`
  width: 25%;
  height: 70%;
  z-index: 1;
`;

const LoginBox = styled.div`
  background-color: #36393f;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 40px;
`;

const Welcome = styled.div`
  width: 20vw;
  /* background-color: red; */
  font-size: 30px;
  color: white;
  text-align: center;
  margin: 20px 0;
`;

const LoginText = styled.div`
  font-size: 13px;
  text-transform: uppercase;
  color: #afb1b4;
`;
const ToRegister = styled.div`
  color: #01acf1;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default Signup;
