import { ReactNode } from "react";
import styled from "styled-components";
import ListItemType from "../interface/groupListItemType.interface";
import { useRecoilState } from "recoil";
import currentGroupStore from "@/store/currentGroup.store";

const GroupListItem = ({ children }: ListItemType) => {
    const [currentGroup, setCurrentGroup] = useRecoilState(currentGroupStore);
    return (
        <ListItemWrapper onChange={() => setCurrentGroup(children)}>
            <GroupName type="radio" name="group" id={children} />
            <GroupLabel htmlFor={children}>{children}</GroupLabel>
        </ListItemWrapper>
    );
};

const ListItemWrapper = styled.div`
    width: 100%;
    height: 6vh;
    background-color: #3e4249;
    margin: 1vh auto;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const GroupLabel = styled.label`
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 5px;
`;

const GroupName = styled.input`
    position: absolute;
    font-size: 30px;
    color: white;
    visibility: hidden;

    &:checked + label {
        /* width: 100%;
        height: 100%; */
        border-radius: 5px;
        background-color: #383b41;
        color: white;
    }
`;

export default GroupListItem;
