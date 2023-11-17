import Login from "@/page/Home/layout/Login";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Signup from "./Signup";
import backgroundImg from "../assets/bgi.svg";
import { useRecoilState } from "recoil";
import loginModalStore from "@/store/loginModal.store";

const Home = () => {
  const [isRegister] = useRecoilState(loginModalStore);
  return (
    <Container>
      <Ha src={backgroundImg} alt="ing" />
      {isRegister ? <Signup /> : <Login />}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #717bfe;

  overflow-y: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Ha = styled(Image)`
  /* z-index: 0; */
  position: fixed;
  width: 100vw;
  pointer-events: none;
`;

export default Home;
