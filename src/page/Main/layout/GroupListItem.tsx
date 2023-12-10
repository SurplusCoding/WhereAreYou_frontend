import { ReactNode } from "react";
import styled from "styled-components";
import ListItemType from "../interface/groupListItemType.interface";
import { useRecoilState } from "recoil";
import currentGroupStore from "@/store/currentGroup.store";
import Image from "next/image";
import Kebab from "../assets/kebab.svg";
import deleteModal from "@/store/deleteModal.store";

const GroupListItem = ({ children }: ListItemType) => {
  const [currentGroup, setCurrentGroup] = useRecoilState(currentGroupStore);
  const [isModal, setIsModal] = useRecoilState(deleteModal);

  return (
    <Container
      onChange={() => setCurrentGroup({ id: children.id, name: children.name })}
    >
      <GroupInput type="radio" name="group" id={children.name} />
      <GroupLabel htmlFor={children.name}>
        <GroupName>
          {children.name}({children.id})
        </GroupName>
        <GroupMenu
          src={Kebab}
          alt="GROUP_MENU_ICON"
          onClick={() => setIsModal(true)}
        />
      </GroupLabel>
    </Container>
  );
};

const Container = styled.div`
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

  display: flex;
`;

const GroupInput = styled.input`
  position: absolute;
  font-size: 30px;
  color: white;
  visibility: hidden;

  &:checked + label {
    border-radius: 5px;
    background-color: #383b41;
    color: white;
  }
`;

const GroupName = styled.div`
  height: 1em;
  line-height: 50%;
  margin: auto 0;
`;

const GroupMenu = styled(Image)`
  width: auto;
  height: 4.5vh;
  margin: 4% 0 0 auto;
  cursor: pointer;
`;

export default GroupListItem;
