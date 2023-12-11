import { atom } from "recoil";

const currentPresetStore = atom({
  key: "presetSotre",
  default: { presetId: 0, place: "", howLong: 0, what: "" },
});

export default currentPresetStore;
