import Image from "next/image";
import styled from "styled-components";
import CancelIcon from "@/page/Main/assets/cancelIcon.svg";
import { useRecoilState } from "recoil";
import React from "react";
import CommonButton from "../button/CommonButton";
import { kickUser } from "@/api";
import kickModal from "@/store/kickModal.store";
import kickUserStore from "@/store/kickUser.store";
import currentGroupStore from "@/store/currentGroup.store";
import currentConditionStore from "@/store/currentCondition.store";

const KickModal = () => {
  const [isModal, setIsModal] = useRecoilState(kickModal);
  const [user] = useRecoilState(kickUserStore);
  const [currentGroup] = useRecoilState(currentGroupStore);
  const [currentCondition] = useRecoilState(currentConditionStore);

  const hadleDeleteMember = async () => {
    if (currentCondition.name !== currentGroup.manager)
      return alert("그룹 매니저만 강퇴할 수 있습니다.");
    if (currentCondition.name === user.name)
      return alert("스스로는 강퇴할 수 없습니다.");
    const result = await kickUser({
      teamId: currentGroup.id,
      userId: user.userId,
    });
    if (result.success === false) return alert("멤버 강퇴에 실패하였습니다.");
    alert(`${user.name}님을 강퇴하였습니다.`);
    setIsModal(false);
  };

  const handleChildClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Wrapper onClick={() => setIsModal(false)}>
      <ModalBox onClick={handleChildClick}>
        <ModalHeader>
          <ModalText>Kick Member</ModalText>
          <Cancel
            src={CancelIcon}
            alt="CANCEL_ICON"
            onClick={() => setIsModal(false)}
          />
        </ModalHeader>
        <ModalContent>
          <ModalText>
            {user.name}[{user.userId}] 님을 강퇴하시겠습니까?
          </ModalText>
          <CommonButton
            width="90%"
            height="15%"
            margin="auto auto 2vh auto"
            onClick={hadleDeleteMember}
          >
            Kick Member
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

export default KickModal;
