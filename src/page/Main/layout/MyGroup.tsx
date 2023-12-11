import styled from "styled-components";
import Image from "next/image";
import GroupListItem from "./GroupListItem";
import Row from "@/components/flex/Row";
import MemberListItem from "./MemberListItem";
import SettingIcon from "../assets/settingIcon.svg";
import { useRecoilState } from "recoil";
import settingModalStore from "@/store/settingModal.store";
import currentGroupStore from "@/store/currentGroup.store";
import { getMembers, getGroups } from "@/api";
import React from "react";
import PlusIcon from "../assets/plus.svg";
import createModal from "@/store/createModal.store";
import UserProps from "../interface/userPropsType.interface";
import GroupProps from "../interface/groupPropsType.interface";
import joinModal from "@/store/joinModal.store";
import refreshStore from "@/store/refresh.store";
import groupListStore from "@/store/groupList.store";

const MyGroup = () => {
  const [isModal, setIsModal] = useRecoilState(settingModalStore);
  const [isModal2, setIsModal2] = useRecoilState(createModal);
  const [isModal3, setIsModal3] = useRecoilState(joinModal);
  const [currentGroup] = useRecoilState(currentGroupStore);
  const [groupList, setGroupList] = useRecoilState(groupListStore);
  const [memberList, setMemberList] = React.useState([]);
  const [refresh] = useRecoilState(refreshStore);

  React.useEffect(() => {
    handleMemberList(currentGroup.id);
  }, [currentGroup, refresh]);

  React.useEffect(() => {
    handleGroupList();
  }, [refresh]);

  const handleMemberList = async (teamId: number) => {
    const result = await getMembers(teamId);
    if (result.success === false) return -1;
    setMemberList(result);
  };

  const handleGroupList = async () => {
    const result = await getGroups();
    if (result.success === false) return -1;
    setGroupList(result);
  };

  return (
    <Container>
      <GroupListHeader>
        <CreateGroupBtn
          src={PlusIcon}
          alt="CREATE_GROUP_BUTTON_ICON"
          onClick={() => setIsModal2(true)}
        />
        <SettingBtn
          src={SettingIcon}
          alt="SETTING_BUTTON_ICON"
          onClick={() => setIsModal(true)}
        />
      </GroupListHeader>
      <Row width="100%" height="100%">
        <GroupMemberList>
          <SubText>current group({currentGroup.name})&apos;s members</SubText>
          {memberList &&
            memberList.map((item: UserProps) => (
              <MemberListItem key={item.email}>{item}</MemberListItem>
            ))}
        </GroupMemberList>
        <GroupList>
          <Row alignItems="center">
            <SubText>my groups</SubText>
            <CreateGroupBtn
              src={PlusIcon}
              alt="JOIN_GROUP_BUTTON_ICON"
              onClick={() => setIsModal3(true)}
            />
          </Row>
          {groupList &&
            groupList.map((item: GroupProps) => (
              <GroupListItem key={item.id}>{item}</GroupListItem>
            ))}
        </GroupList>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  width: 70%;
  height: 100vh;
  background-color: #36393f;
`;

const GroupList = styled.div`
  width: 25%;
  height: 100%;
  padding: 1vh;
  background-color: #303136;
`;

const GroupMemberList = styled.div`
  width: 75%;
  height: 100%;
  padding: 1vh;
  background-color: #36393f;
`;

const GroupListHeader = styled.div`
  width: 100%;
  height: 7vh;
  background-color: #36393f;
  border-bottom: 2px solid #2d3034;
  display: flex;
  align-items: center;
`;

const SubText = styled.div`
  width: 100%;
  color: white;
  text-transform: uppercase;
`;

const SettingBtn = styled(Image)`
  height: 2.5vh;
  width: 2.5vh;
  margin: 0 1vw 0 1.5vw;
  cursor: pointer;
`;

const CreateGroupBtn = styled(Image)`
  height: 2.2vh;
  width: 2.2vh;
  margin-left: auto;
  cursor: pointer;
`;

export default MyGroup;
