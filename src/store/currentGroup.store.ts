import { atom } from "recoil";

const currentGroupStore = atom({
    key: "groupSotre",
    default: "",
});

export default currentGroupStore;
