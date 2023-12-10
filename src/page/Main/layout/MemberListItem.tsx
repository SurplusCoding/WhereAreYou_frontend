import { ReactNode } from "react";
import styled from "styled-components";
import MemberListItemType from "../interface/memberListItemType.interface";

const MemberListItem = ({ children }: MemberListItemType) => {
  return (
    <ListItemWrapper>
      <MemberName>{children.name}</MemberName>
      <div>
        {children.place}, {children.what}, {children.howLong}
      </div>
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

const MemberName = styled.div`
  font-size: 20px;
  width: 100%;
  color: white;
`;

export default MemberListItem;
