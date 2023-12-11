import CommonButton from "@/components/button/CommonButton";
import Column from "@/components/flex/Column";
import Row from "@/components/flex/Row";
import CommonInput from "@/components/input/CommonInput";
import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import loginModalStore from "@/store/loginModal.store";
import { signUp } from "@/api";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [isRegister, setIsRegister] = useRecoilState(loginModalStore);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignup = async () => {
    if (name === "") return alert("이름을 입력해주세요.");
    if (email === "") return alert("이메일을 입력해주세요.");
    if (password === "") return alert("비밀번호를 입력해주세요.");
    const result = await signUp({ name, email, password });
    if (result.success === false) return alert("회원가입에 실패하였습니다.");
    alert("회원가입에 성공하였습니다.");
    setIsRegister(false);
  };

  return (
    <Container>
      <LoginBox>
        <Column gap="3vh">
          <Welcome>Create an account</Welcome>
          <Column gap="2vh">
            <Column gap="2vh">
              <LoginText>name</LoginText>
              <CommonInput
                width="100%"
                height="5vh"
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </Column>
            <Column gap="2vh">
              <LoginText>email</LoginText>
              <CommonInput
                width="100%"
                height="5vh"
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </Column>
            <Column gap="2vh">
              <LoginText>password</LoginText>
              <CommonInput
                width="100%"
                height="5vh"
                onChange={(e) => setPassword(e.currentTarget.value)}
                type="password"
              />
            </Column>
          </Column>
          <Column gap="2vh">
            <CommonButton
              width="100%"
              height="5vh"
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
