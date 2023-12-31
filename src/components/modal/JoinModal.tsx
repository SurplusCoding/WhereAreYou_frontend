import Image from "next/image";
import styled from "styled-components";
import CancelIcon from "@/page/Main/assets/cancelIcon.svg";
import { useRecoilState } from "recoil";
import React from "react";
import Column from "@/components/flex/Column";
import joinModal from "@/store/joinModal.store";
import CommonInput from "../input/CommonInput";
import CommonButton from "../button/CommonButton";
import { getGroups, joinGroup } from "@/api";
import groupListStore from "@/store/groupList.store";

const JoinModal = () => {
  const [isModal, setIsModal] = useRecoilState(joinModal);
  const [groupList, setGroupList] = useRecoilState(groupListStore);
  const [groupId, setGroupId] = React.useState("");

  const hadleJoinGroup = async (groupId: string) => {
    if (!groupId) return alert("그룹 아이디를 입력해주세요.");
    if (groupId.includes(".")) return alert("올바른 값을 입력해주세요.");
    const result = await joinGroup(parseInt(groupId));
    if (result.success === false) return alert("그룹 참가에 실패하였습니다.");
    alert("그룹 참가에 성공하였습니다.");
    handleGroupList();
    setIsModal(false);
  };

  const handleGroupList = async () => {
    const result = await getGroups();
    if (result.success === false) return -1;
    setGroupList(result);
  };

  const handleChildClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Wrapper onClick={() => setIsModal(false)}>
      <ModalBox onClick={handleChildClick}>
        <ModalHeader>
          <ModalText>Join Group</ModalText>
          <Cancel
            src={CancelIcon}
            alt="CANCEL_ICON"
            onClick={() => setIsModal(false)}
          />
        </ModalHeader>
        <ModalContent>
          <Column gap="2vh">
            <ModalText>Group Id</ModalText>
            <CommonInput
              width="20vw"
              height="4vh"
              margin="0 2.2vw"
              type="number"
              min="1"
              max="100"
              onChange={(e) => setGroupId(e.target.value)}
            />
          </Column>
          <CommonButton
            width="90%"
            height="15%"
            margin="auto auto 2vh auto"
            onClick={() => hadleJoinGroup(groupId)}
          >
            Join Group
          </CommonButton>
        </ModalContent>
      </ModalBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #00000032;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const ModalBox = styled.div`
  width: 45vw;
  height: 55vh;
  background-color: #3e4249;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: 5px 5px 0 0;
  border-bottom: 2px solid #2d3034;
`;

const ModalText = styled.div`
  color: white;
  font-size: 18px;
  margin-left: 5%;
`;

const ModalContent = styled.div`
  width: 100%;
  height: 90%;
  padding: 5vh 0;
  display: flex;
  flex-direction: column;
`;

const Cancel = styled(Image)`
  width: 2.5vh;
  height: 2.5vh;
  margin: 0 1.5vh 0 auto;
  cursor: pointer;
`;

export default JoinModal;
