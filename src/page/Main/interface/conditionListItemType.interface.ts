export default interface ConditionListItemType {
  children: ConditionPropsType;
}

export interface ConditionPropsType {
  presetId: number;
  place: string;
  howLong: number;
  what: string;
}
