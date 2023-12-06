import { getUser } from "@/api";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const MyCondition = () => {
    const [userData, setUserData] = React.useState({
        email: "",
        name: "",
        place: "",
        howLong: "",
        what: "",
    });

    React.useEffect(() => {
        // getUserData();
    }, []);

    const getUserData = async () => {
        const result = await getUser();
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
        console.log(result);
    };

    return (
        <MyConditionWrapper>
            <MyConditionHeader></MyConditionHeader>
            <h1>{userData.email}</h1>
            <h1>{userData.name}</h1>
            <h1>{userData.place || "입력된 정보가 없습니다."}</h1>
            <h1>{userData.howLong || "입력된 정보가 없습니다."}</h1>
            <h1>{userData.what || "입력된 정보가 없습니다."}</h1>
        </MyConditionWrapper>
    );
};

const MyConditionWrapper = styled.div`
    width: 30%;
    height: 100vh;
    background-color: #2f3136;
    color: white;
`;

const MyConditionHeader = styled.div`
    width: 100%;
    height: 7vh;
    background-color: #2f3136;
    border-bottom: 2px solid #212326;
`;

export default MyCondition;
