import { atom } from "recoil";

const loginModalStore = atom({
  key: "modalStore",
  default: false,
});

export default loginModalStore;
