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

const MainPage = () => {
  const [isModal] = useRecoilState(settingModalStore);
  const [isModal2] = useRecoilState(createModal);
  const [isModal3] = useRecoilState(deleteModal);
  const [isModal4] = useRecoilState(joinModal);
  return (
    <Container>
      {isModal ? <SettingModal /> : ""}
      {isModal2 ? <CreateModal /> : ""}
      {isModal3 ? <DeleteModal /> : ""}
      {isModal4 ? <JoinModal /> : ""}
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
