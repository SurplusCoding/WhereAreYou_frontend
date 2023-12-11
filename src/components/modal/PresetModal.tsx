import Image from "next/image";
import styled from "styled-components";
import CancelIcon from "@/page/Main/assets/cancelIcon.svg";
import { useRecoilState } from "recoil";
import React from "react";
import CommonInput from "../input/CommonInput";
import CommonButton from "../button/CommonButton";
import { deletePreset, setPreset, setStatus } from "@/api";
import presetModal from "@/store/presetModal.store";
import currentPresetStore from "@/store/currentPreset.store";
import Row from "../flex/Row";
import refreshStore from "@/store/refresh.store";

const PresetModal = () => {
  const [isModal, setIsModal] = useRecoilState(presetModal);
  const [currentPreset, setCurrentPreset] = useRecoilState(currentPresetStore);
  const [refresh, setRefresh] = useRecoilState(refreshStore);

  const hadleModifyPreset = async () => {
    const result = await setPreset({
      presetId: currentPreset.presetId,
      place: currentPreset.place,
      howLong: currentPreset.howLong,
      what: currentPreset.what,
    });
    if (result.success === false) return alert("프리셋 수정에 실패하였습니다.");
    alert("프리셋이 수정되었습니다.");
    setIsModal(false);
  };

  const handleMyStatus = async () => {
    const result = await setStatus({
      place: currentPreset.place,
      howLong: currentPreset.howLong,
      what: currentPreset.what,
    });
    if (result.success === false)
      return alert("유저 상태 변경에 실패하였습니다.");
    alert("유저 상태가 변경되었습니다.");
    setIsModal(false);
    setRefresh((prev) => !prev);
  };

  const handleDeletePreset = async () => {
    const result = await deletePreset(currentPreset.presetId);
    if (result.success === false) return alert("프리셋 삭제에 실패하였습니다.");
    alert("프리셋이 삭제되었습니다.");
    setIsModal(false);
    setRefresh((prev) => !prev);
  };

  const handleChildClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const onClickEvent = () => {
    setCurrentPreset({ presetId: 0, place: "", howLong: 0, what: "" });
    setIsModal(false);
  };

  return (
    <Wrapper onClick={onClickEvent}>
      <ModalBox onClick={handleChildClick}>
        <ModalHeader>
          <ModalText>Modify/Apply Preset</ModalText>
          <Cancel src={CancelIcon} alt="CANCEL_ICON" onClick={onClickEvent} />
        </ModalHeader>
        <ModalContent>
          <Row gap="2vw">
            <ModalText>Preset Id</ModalText>
            <CommonInput
              width="20vw"
              height="4vh"
              margin="0 2.2vw"
              value={currentPreset.presetId}
              readOnly
            />
          </Row>
          <Row gap="2vw">
            <ModalText>Where</ModalText>
            <CommonInput
              width="20vw"
              height="4vh"
              margin="0 2.2vw"
              onChange={(e) =>
                setCurrentPreset((prev) => {
                  return {
                    ...prev,
                    place: e.target.value,
                  };
                })
              }
              value={currentPreset.place}
            />
          </Row>
          <Row gap="2vw">
            <ModalText>What</ModalText>
            <CommonInput
              width="20vw"
              height="4vh"
              margin="0 2.2vw"
              onChange={(e) =>
                setCurrentPreset((prev) => {
                  return {
                    ...prev,
                    what: e.target.value,
                  };
                })
              }
              value={currentPreset.what}
            />
          </Row>
          <Row gap="2vw">
            <ModalText>How Long(m)</ModalText>
            <CommonInput
              width="20vw"
              height="4vh"
              margin="0 2.2vw"
              type="number"
              onChange={(e) =>
                setCurrentPreset((prev) => {
                  return {
                    ...prev,
                    howLong: parseInt(e.target.value),
                  };
                })
              }
              value={currentPreset.howLong}
            />
          </Row>

          <ButtonContainer>
            <CommonButton
              width="30%"
              height="100%"
              margin="2vh 0"
              onClick={hadleModifyPreset}
            >
              Modify Preset
            </CommonButton>
            <CommonButton
              width="30%"
              height="100%"
              margin="2vh 0 2vh auto"
              onClick={handleMyStatus}
            >
              Preset Apply
            </CommonButton>
            <CommonButton
              width="30%"
              height="100%"
              margin="2vh 0 2vh auto"
              onClick={handleDeletePreset}
            >
              Delete Preset
            </CommonButton>
          </ButtonContainer>
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
  margin-right: auto;
`;

const ModalContent = styled.div`
  width: 100%;
  height: 90%;
  padding: 5vh 0;
  display: flex;
  flex-direction: column;
  gap: 1vh;
`;

const Cancel = styled(Image)`
  width: 2.5vh;
  height: 2.5vh;
  margin: 0 1.5vh 0 auto;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  width: 90%;
  margin: 2vh auto;
  display: flex;
  justify-content: center;
`;

export default PresetModal;
