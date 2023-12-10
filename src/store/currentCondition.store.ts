import { atom } from "recoil";

const currentConditionStore = atom({
  key: "conditionSotre",
  default: {
    email: "",
    name: "",
    place: "",
    howLong: "",
    what: "",
  },
});

export default currentConditionStore;
