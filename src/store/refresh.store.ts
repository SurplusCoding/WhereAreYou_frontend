import { atom } from "recoil";

const refreshStore = atom({
  key: "refreshStore",
  default: false,
});

export default refreshStore;
