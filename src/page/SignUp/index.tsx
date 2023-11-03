import React from "react";
import styled from "styled-components";
import SignUp from "./layout/SignUp";

const SignUpPage = () => {
  return (
    <Layout>
      <Container>
        <SignUp />
      </Container>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 76%;
  height: 100vh;
  display: flex;
`;

export default SignUpPage;
