import { getPreset, getUser, setStatus } from "@/api";
import CommonButton from "@/components/button/CommonButton";
import Row from "@/components/flex/Row";
import CommonInput from "@/components/input/CommonInput";
import currentConditionStore from "@/store/currentCondition.store";
import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import User from "../assets/userIcon.svg";
import refreshStore from "@/store/refresh.store";
import ConditionListItem from "./ConditionListItem";

const MyCondition = () => {
  const [userData, setUserData] = useRecoilState(currentConditionStore);
  const [refresh, handleRefresh] = useRecoilState(refreshStore);

  React.useEffect(() => {
    getUserData();
    getMyPreset();
  }, []);

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
    const result = await getPreset();
    if (result.success === false)
      return alert("내 프리셋 호출에 실패하였습니다.");
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
    handleRefresh((prev) => !prev);
  };

  return (
    <MyConditionWrapper>
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
          value={userData.place || "입력된 정보가 없습니다."}
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
          value={userData.what || "입력된 정보가 없습니다."}
        />
      </MyInfo>
      <MyInfo>
        <MyInfoText>How Long</MyInfoText>
        <CommonInput
          onChange={(e) =>
            setUserData((prev) => {
              return {
                ...prev,
                howLong: e.target.value,
              };
            })
          }
          value={userData.howLong || "입력된 정보가 없습니다."}
        />
      </MyInfo>

      <PresetList>
        {[
          { presetId: 1, place: "toilet", howLong: 30, what: "reading" },
          { presetId: 2, place: "homeroom", howLong: 20, what: "studying" },
          { presetId: 3, place: "dorm", howLong: 10, what: "rest" },
        ].map((item) => (
          <ConditionListItem key={item.presetId}>{item}</ConditionListItem>
        ))}
      </PresetList>
      <CommonButton
        width="90%"
        height="5%"
        margin="10% auto 2vh auto"
        onClick={() => handleMyStatus()}
      >
        Update My Status
      </CommonButton>
    </MyConditionWrapper>
  );
};

const MyConditionWrapper = styled.div`
  width: 30%;
  height: 100vh;
  background-color: #2f3136;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5vh;
`;

const MyConditionHeader = styled.div`
  width: 100%;
  height: 7vh;
  background-color: #2f3136;
  border-bottom: 2px solid #212326;
`;

const UserIcon = styled(Image)`
  width: 15vw;
  height: 15vw;
  border-radius: 50%;
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

const PresetList = styled.div`
  width: 90%;
  display: flex;
  overflow-x: scroll;
`;

export default MyCondition;
