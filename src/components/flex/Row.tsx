import styled from "styled-components";
import PropsType from "./type";

const Row = ({ children, gap, width, height, alignItems }: PropsType) => {
    return (
        <FlexRow style={{ gap, width, height, alignItems }}>{children}</FlexRow>
    );
};

const FlexRow = styled.div`
    display: flex;
`;

export default Row;
