import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import MyCondition from "./MyCondition";
import MyGroup from "./MyGroup";
import SettingModal from "@/components/modal/SettingModal";
import CreateModal from "@/components/modal/CreateModal";
import settingModalStore from "@/store/settingModal.store";
import createModal from "@/store/createModal.store";
import deleteModal from "@/store/deleteModal.store";
import DeleteModal from "@/components/modal/DeleteModal";
import JoinModal from "@/components/modal/JoinModal";
import joinModal from "@/store/joinModal.store";
import presetModal from "@/store/presetModal.store";
import PresetModal from "@/components/modal/PresetModal";
import createPresetModal from "@/store/createPresetModal.store";
import CreatePresetModal from "@/components/modal/CreatePresetModal";
import kickModalStore from "@/store/kickModal.store";
import KickModal from "@/components/modal/KickModal";

const MainPage = () => {
  const [isModal] = useRecoilState(settingModalStore);
  const [isModal2] = useRecoilState(createModal);
  const [isModal3] = useRecoilState(deleteModal);
  const [isModal4] = useRecoilState(joinModal);
  const [isModal5] = useRecoilState(presetModal);
  const [isModal6] = useRecoilState(createPresetModal);
  const [isModal7] = useRecoilState(kickModalStore);
  return (
    <Container>
      {isModal ? <SettingModal /> : ""}
      {isModal2 ? <CreateModal /> : ""}
      {isModal3 ? <DeleteModal /> : ""}
      {isModal4 ? <JoinModal /> : ""}
      {isModal5 ? <PresetModal /> : ""}
      {isModal6 ? <CreatePresetModal /> : ""}
      {isModal7 ? <KickModal /> : ""}
      <MyCondition />
      <MyGroup />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #717bfe;

  overflow-y: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MainPage;
