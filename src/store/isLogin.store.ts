import { atom } from "recoil";

const isLoginStore = atom({
    key: "loginStore",
    default: false,
});

export default isLoginStore;
