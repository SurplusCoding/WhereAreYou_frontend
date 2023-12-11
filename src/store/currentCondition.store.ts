import { atom } from "recoil";

const currentConditionStore = atom({
  key: "conditionStore",
  default: {
    email: "",
    name: "",
    place: "",
    howLong: 0,
    what: "",
  },
});

export default currentConditionStore;
