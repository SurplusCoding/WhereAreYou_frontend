import { atom } from "recoil";

const kickUserStore = atom({
  key: "kickUserStore",
  default: { userId: 0, name: "" },
});

export default kickUserStore;
