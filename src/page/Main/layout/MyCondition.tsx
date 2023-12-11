import {
  PresetPropsType,
  getPresets,
  getUser,
  quitGroup,
  setStatus,
} from "@/api";
import CommonButton from "@/components/button/CommonButton";
import CommonInput from "@/components/input/CommonInput";
import currentConditionStore from "@/store/currentCondition.store";
import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import User from "../assets/userIcon.svg";
import refreshStore from "@/store/refresh.store";
import ConditionListItem from "./ConditionListItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import createPresetModal from "@/store/createPresetModal.store";
import presetListStore from "@/store/presetList.store";
import currentPresetStore from "@/store/currentPreset.store";

const MyCondition = () => {
  const [userData, setUserData] = useRecoilState(currentConditionStore);
  const [refresh, setRefresh] = useRecoilState(refreshStore);
  const [isModal, setIsModal] = useRecoilState(createPresetModal);
  const [presetList, setPresetList] = useRecoilState(presetListStore);
  const [currentPreset, setCurrentPreset] = useRecoilState(currentPresetStore);

  React.useEffect(() => {
    getUserData();
    getMyPreset();
  }, [refresh]);

  const getUserData = async () => {
    const result = await getUser();
    if (result.success === false) return -1;
    setUserData((prev) => {
      return {
        ...prev,
        email: result.email,
        name: result.name,
        place: result.place,
        howLong: result.howLong,
        what: result.what,
      };
    });
  };

  const getMyPreset = async () => {
    const result = await getPresets();
    if (result.success === false) return;
    setPresetList(result);
    console.log(result);
  };

  const handleMyStatus = async () => {
    const result = await setStatus({
      place: userData.place,
      howLong: userData.howLong,
      what: userData.what,
    });
    if (result.success === false)
      return alert("유저 상태 변경에 실패하였습니다.");
    alert("유저 상태가 변경되었습니다.");
    setRefresh((prev) => !prev);
  };

  const onClickEvent = () => {
    setCurrentPreset({ presetId: 0, place: "", howLong: 0, what: "" });
    setIsModal(true);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: false,
  };

  return (
    <Container>
      <MyConditionHeader></MyConditionHeader>
      <UserIcon src={User} alt="USER_ICON_IMAGE" />
      <div>
        <MyInfo>{userData.email}</MyInfo>
        <MyInfo>{userData.name}</MyInfo>
      </div>
      <MyInfo>
        <MyInfoText>Where</MyInfoText>
        <CommonInput
          onChange={(e) =>
            setUserData((prev) => {
              return {
                ...prev,
                place: e.target.value,
              };
            })
          }
          value={userData.place}
        />
      </MyInfo>
      <MyInfo>
        <MyInfoText>What</MyInfoText>
        <CommonInput
          onChange={(e) =>
            setUserData((prev) => {
              return {
                ...prev,
                what: e.target.value,
              };
            })
          }
          value={userData.what}
        />
      </MyInfo>
      <MyInfo>
        <MyInfoText>How Long(m)</MyInfoText>
        <CommonInput
          onChange={(e) =>
            setUserData((prev) => {
              return {
                ...prev,
                howLong: parseInt(e.target.value),
              };
            })
          }
          value={userData.howLong || 0}
        />
      </MyInfo>

      <PresetWrapper>
        <PresetList {...settings}>
          {presetList &&
            presetList.map((item: PresetPropsType) => (
              <Indexing key={item.presetId}>
                <ConditionListItem>{item}</ConditionListItem>
              </Indexing>
            ))}
        </PresetList>
        <CreatePresetBtn onClick={onClickEvent}>+</CreatePresetBtn>
      </PresetWrapper>
      <CommonButton
        width="90%"
        height="5%"
        margin="0 auto 2vh auto"
        onClick={() => handleMyStatus()}
      >
        Update My Status
      </CommonButton>
    </Container>
  );
};

const Indexing = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 30%;
  height: 100vh;
  background-color: #2f3136;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3vh;
`;

const MyConditionHeader = styled.div`
  width: 100%;
  height: 7vh;
  background-color: #2f3136;
  border-bottom: 2px solid #212326;
`;

const UserIcon = styled(Image)`
  width: 13vw;
  height: 13vw;
  border-radius: 50%;
  pointer-events: none;
`;

const MyInfo = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyInfoText = styled.div`
  font-size: 20px;
  margin-right: auto;
`;

const PresetList = styled(Slider)`
  width: 80%;
  height: 8vh;
  /* display: flex;
  flex-direction: column;
  gap: 20px; */
  /* overflow-y: scroll; */
`;

const CreatePresetBtn = styled.div`
  width: 8%;
  height: 6vh;
  background-color: #3e4249;
  margin: 1vh 0 1vh 0.5vw;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 900;
  cursor: pointer;
`;

const PresetWrapper = styled.div`
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: center;
`;

export default MyCondition;
