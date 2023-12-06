import Image from "next/image";
import styled from "styled-components";
import CancelIcon from "@/page/Main/assets/cancelIcon.svg";
import { useRecoilState } from "recoil";
import settingModalStore from "@/store/settingModal.store";
import React from "react";
import Column from "@/components/flex/Column";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/api";

const SettingModal = () => {
    const [isModal, setIsModal] = useRecoilState(settingModalStore);
    const router = useRouter();

    const deleteAccount = async () => {
        const result = await deleteUser();
        if (!result.success) return alert("회원 탈퇴에 실패하였습니다.");
        router.replace("/");
        alert("회원 탈퇴에 성공하였습니다.");
    };

    const handleChildClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsModal(false);
        router.replace("/");
        alert("로그아웃 되었습니다.");
    };

    return (
        <Wrapper onClick={() => setIsModal(false)}>
            <ModalBox onClick={handleChildClick}>
                <ModalHeader>
                    <ModalTitle>Settings</ModalTitle>
                    <Cancel
                        src={CancelIcon}
                        alt="CANCEL_ICON"
                        onClick={() => setIsModal(false)}
                    />
                </ModalHeader>
                <ModalContent>
                    <Column gap="2vh">
                        <Option onClick={handleLogout}>Logout</Option>
                        <Option onClick={deleteAccount}>Delete Account</Option>
                    </Column>
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

const ModalTitle = styled.div`
    color: white;
    font-size: 18px;
    margin-left: 5%;
`;

const ModalContent = styled.div`
    width: 90%;
    height: 90%;
    padding: 3vh 0;
`;

const Cancel = styled(Image)`
    width: 2.5vh;
    height: 2.5vh;
    margin: 0 1.5vh 0 auto;
    cursor: pointer;
`;

const Option = styled.div`
    color: white;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        text-decoration: underline;
        color: white;
    }
`;

export default SettingModal;
