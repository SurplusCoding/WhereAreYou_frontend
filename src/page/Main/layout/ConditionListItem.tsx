import React from "react";
import styled from "styled-components";
import ConditionListItemType from "../interface/conditionListItemType.interface";
import { useRecoilState } from "recoil";
import presetModal from "@/store/presetModal.store";
import currentPresetStore from "@/store/currentPreset.store";

const ConditionListItem = ({ children }: ConditionListItemType) => {
  const [isModal, setIsModal] = useRecoilState(presetModal);
  const [currentPreset, setCurrentPreset] = useRecoilState(currentPresetStore);

  const onClickEvent = () => {
    setCurrentPreset({
      presetId: children.presetId,
      place: children.place,
      howLong: children.howLong,
      what: children.what,
    });
    setIsModal(true);
  };

  return (
    <Container onClick={() => onClickEvent()}>
      <PresetName>{children.place}</PresetName>
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  height: 6vh;
  background-color: #3e4249;
  margin: 1vh 2vw 1vh 0;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const PresetName = styled.div`
  height: 1em;
  line-height: 50%;
  margin: auto 0;
`;

export default ConditionListItem;
