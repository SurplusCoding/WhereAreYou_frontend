import styled from "styled-components";
import PropsType from "./type";

const Row = ({ children, gap }: PropsType) => {
  return <FlexRow style={{ gap }}>{children}</FlexRow>;
};

const FlexRow = styled.div`
  display: flex;
`;

export default Row;
