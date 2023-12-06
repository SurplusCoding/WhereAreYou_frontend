import styled from "styled-components";
import Image from "next/image";
import GroupListItem from "./GroupListItem";
import Row from "@/components/flex/Row";
import MemberListItem from "./MemberListItem";
import SettingIcon from "../assets/settingIcon.svg";
import { useRecoilState } from "recoil";
import settingModalStore from "@/store/settingModal.store";
import currentGroupStore from "@/store/currentGroup.store";
import myGroups from "@/store/myGroups.store";
import { getMembers, getGroups } from "@/api";
import React from "react";
import PlusIcon from "../assets/plus.svg";
import createModal from "@/store/createModal.store";

const MyGroup = () => {
    const [isModal, setIsModal] = useRecoilState(settingModalStore);
    const [isModal2, setIsModal2] = useRecoilState(createModal);
    const [currentGroup] = useRecoilState(currentGroupStore);
    const [groupList, setGroupList] = useRecoilState(myGroups);
    const [memberList, setMemberList] = React.useState();

    React.useEffect(() => {
        // getMemberList(parseInt(currentGroup));
    }, [currentGroup]);

    const getMemberList = async (teamId: number) => {
        const result = await getMembers(teamId);
        if (result.success === false)
            return alert("멤버 리스트 호출에 실패하였습니다.");
        setMemberList(result.list);
    };

    const getGrouplist = async () => {
        const result = await getGroups();
        if (result.success === false)
            return alert("그룹 리스트 호출에 실패하였습니다.");
        setGroupList(result.list);
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
                    <SubText>
                        current group({currentGroup})&apos;s members
                    </SubText>
                    {[
                        {
                            name: "member1",
                            email: "1111@gmail.com",
                            place: "toilet",
                            howLong: "10m",
                            what: "toilet",
                        },
                        {
                            name: "member2",
                            email: "2222@gmail.com",
                            place: "dorm",
                            howLong: "00",
                            what: "rest",
                        },
                        {
                            name: "member3",
                            email: "3333@gmail.com",
                            place: "homeroom",
                            howLong: "00",
                            what: "toilet",
                        },
                        {
                            name: "member4",
                            email: "4444@gmail.com",
                            place: "weeclass",
                            howLong: "30m",
                            what: "counsel",
                        },
                    ].map((item) => (
                        <MemberListItem key={item.email}>{item}</MemberListItem>
                    ))}
                </GroupMemberList>
                <GroupList>
                    <SubText>my groups</SubText>
                    {["1", "2", "3", "4", "5"].map((item) => (
                        <GroupListItem key={item}>{item}</GroupListItem>
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
