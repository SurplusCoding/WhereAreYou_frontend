import styled from "styled-components";
import PropsType from "./type";

const Column = ({ children, gap, width, height, alignItems }: PropsType) => {
    return (
        <FlexColumn style={{ gap, width, height, alignItems }}>
            {children}
        </FlexColumn>
    );
};

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

export default Column;
