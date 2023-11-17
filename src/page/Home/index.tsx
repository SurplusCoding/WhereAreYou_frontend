import styled from "styled-components";
import Home from "./layout/Home";

const HomePage = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default HomePage;
