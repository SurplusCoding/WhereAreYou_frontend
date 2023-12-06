import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import CommonButton from "@/components/button/CommonButton";
import Column from "@/components/flex/Column";
import Row from "@/components/flex/Row";
import CommonInput from "@/components/input/CommonInput";
import loginModalStore from "@/store/loginModal.store";
import Image from "next/image";
import QR from "../assets/qrcode.svg";
import { loginUser } from "@/api";
import isLoginStore from "@/store/isLogin.store";
import { useRouter } from "next/navigation";

const Login = () => {
    const [isRegister, setIsRegister] = useRecoilState(loginModalStore);
    const [isLogined, setIsLogined] = useRecoilState(isLoginStore);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const router = useRouter();

    const handleLogin = async () => {
        const result = await loginUser({ email, password });
        if (result.success === false) return alert("로그인에 실패하였습니다.");
        alert("로그인에 성공하였습니다.");
        setIsLogined(true);
        localStorage.setItem("access_token", result.token);
        router.push("/main");
    };

    return (
        <Container>
            <LoginBox>
                <Left>
                    <Column gap="20px">
                        <div>
                            <Welcome>Welcome User!</Welcome>
                            <SubWelcome>
                                We&apos;re so excited to see you again!
                            </SubWelcome>
                        </div>
                        <Column gap="20px">
                            <Column gap="10px">
                                <LoginText>email</LoginText>
                                <CommonInput
                                    width="100%"
                                    height="40px"
                                    onChange={(e) =>
                                        setEmail(e.currentTarget.value)
                                    }
                                />
                            </Column>
                            <Column gap="10px">
                                <LoginText>password</LoginText>
                                <CommonInput
                                    width="100%"
                                    height="40px"
                                    onChange={(e) =>
                                        setPassword(e.currentTarget.value)
                                    }
                                    type="password"
                                />
                            </Column>
                        </Column>
                        <Column gap="15px">
                            <CommonButton
                                width="100%"
                                height="50px"
                                margin-top="20px"
                                onClick={handleLogin}
                            >
                                Log in
                            </CommonButton>
                            <Row gap="10px">
                                <Register>Need an account?</Register>
                                <ToRegister onClick={() => setIsRegister(true)}>
                                    Register
                                </ToRegister>
                            </Row>
                        </Column>
                    </Column>
                </Left>
                <Right>
                    <Column gap="10px">
                        <QRImage src={QR} alt="GITHUB" />
                        <Welcome>Visit our Github</Welcome>
                    </Column>
                </Right>
            </LoginBox>
        </Container>
    );
};

const QRImage = styled(Image)`
    width: 13vw;
    height: 13vw;
    pointer-events: none;
    margin: 0 auto;
`;

const Container = styled.div`
    width: 45%;
    height: 50%;
    z-index: 1;
`;

const LoginBox = styled.div`
    background-color: #36393f;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    display: flex;
    overflow: hidden;
`;

const Left = styled.div`
    width: 60%;
    height: 100%;
    padding: 40px;
`;

const Right = styled.div`
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Welcome = styled.div`
    font-size: 30px;
    color: white;
    text-align: center;
`;

const LoginText = styled.div`
    font-size: 13px;
    text-transform: uppercase;
    color: #afb1b4;
`;

const SubWelcome = styled.div`
    font-size: 15px;
    text-align: center;
    color: #afb1b4;
    margin: 10px 0;
`;

const Register = styled.div`
    color: #898d92;
    font-size: 14px;
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

export default Login;
