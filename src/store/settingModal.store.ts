import { atom } from "recoil";

const settingModalStore = atom({
    key: "settingModalStore",
    default: false,
});

export default settingModalStore;
