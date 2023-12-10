import { atom } from "recoil";

const currentGroupStore = atom({
  key: "groupSotre",
  default: { id: 0, name: "" },
});

export default currentGroupStore;
