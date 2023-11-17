import styled from "styled-components";
import PropsType from "./type";

const Column = ({ children, gap }: PropsType) => {
  return <FlexColumn style={{ gap }}>{children}</FlexColumn>;
};

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Column;
