import Image from "next/image";
import styled from "styled-components";
import CancelIcon from "@/page/Main/assets/cancelIcon.svg";
import { useRecoilState } from "recoil";
import React from "react";
import deleteModal from "@/store/deleteModal.store";
import CommonButton from "../button/CommonButton";
import { deleteGroup, quitGroup } from "@/api";
import currentGroupStore from "@/store/currentGroup.store";
import refreshStore from "@/store/refresh.store";
import currentConditionStore from "@/store/currentCondition.store";

const DeleteModal = () => {
  const [userData] = useRecoilState(currentConditionStore);
  const [isModal, setIsModal] = useRecoilState(deleteModal);
  const [currentGroup] = useRecoilState(currentGroupStore);
  const [refresh, setRefresh] = useRecoilState(refreshStore);

  const hadleDeleteGroup = async (teamId: number) => {
    if (userData.name !== currentGroup.manager)
      return alert("그룹 매니저만 삭제할 수 있습니다.");
    const result = await deleteGroup(teamId);
    if (result.success === false) return alert("그룹 삭제에 실패하였습니다.");
    alert(`${currentGroup.name}을/를 삭제하였습니다.`);
    setRefresh((prev) => !prev);
    setIsModal(false);
  };

  const handleQuitGroup = async () => {
    const result = await quitGroup(currentGroup.id);
    if (result.success === false) return alert("그룹 나가기에 실패하였습니다.");
    alert(`${currentGroup.name} 그룹을 나갔습니다.`);
    setRefresh((prev) => !prev);
    setIsModal(false);
  };

  const handleChildClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Wrapper onClick={() => setIsModal(false)}>
      <ModalBox onClick={handleChildClick}>
        <ModalHeader>
          <ModalText>Delete/Quit Group</ModalText>
          <Cancel
            src={CancelIcon}
            alt="CANCEL_ICON"
            onClick={() => setIsModal(false)}
          />
        </ModalHeader>
        <ModalContent>
          <ModalText>
            그룹 {currentGroup.name}[{currentGroup.id}]
          </ModalText>
          {userData.name === currentGroup.manager ? (
            <ButtonContainer>
              <CommonButton
                width="49%"
                height="100%"
                margin="auto auto 2vh auto"
                onClick={() => hadleDeleteGroup(currentGroup.id)}
              >
                Delete Group
              </CommonButton>
              <CommonButton
                width="49%"
                height="100%"
                margin="auto auto 2vh auto"
                onClick={handleQuitGroup}
              >
                Quit Group
              </CommonButton>
            </ButtonContainer>
          ) : (
            <CommonButton
              width="90%"
              height="15%"
              margin="auto auto 2vh auto"
              onClick={handleQuitGroup}
            >
              Quit Group
            </CommonButton>
          )}
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
  /* margin-bottom: auto;
  margin-top: auto; */
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

const ButtonContainer = styled.div`
  width: 90%;
  margin: auto auto 2vh auto;
  display: flex;
  justify-content: center;
`;

export default DeleteModal;
