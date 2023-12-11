import styled from "styled-components";
import React from "react";
import MemberListItemType from "../interface/memberListItemType.interface";
import { useRecoilState } from "recoil";
import kickUserStore from "@/store/kickUser.store";
import kickModal from "@/store/kickModal.store";

const MemberListItem = ({ children }: MemberListItemType) => {
  const [user, setUser] = useRecoilState(kickUserStore);
  const [isModal, setIsModal] = useRecoilState(kickModal);

  const onClickEvent = () => {
    setUser({ userId: children.userId, name: children.name });
    setIsModal(true);
  };

  return (
    <ListItemWrapper onClick={onClickEvent}>
      <MemberName>
        {children.name}[{children.userId}]
      </MemberName>
      <Status>
        {children.place} | {children.what} | {children.howLong}m
      </Status>
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
  cursor: pointer;
`;

const MemberName = styled.div`
  font-size: 18px;
  margin-left: 1vw;
  color: white;
`;

const Status = styled.div`
  font-size: 15px;
  color: white;
  margin-left: auto;
  margin-right: 1vw;
`;

export default MemberListItem;
