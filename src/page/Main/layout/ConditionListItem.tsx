import React from "react";
import styled from "styled-components";
import ConditionListItemType from "../interface/conditionListItemType.interface";

const ConditionListItem = ({ children }: ConditionListItemType) => {
  return (
    <Container
    // onChange={() => setCurrentGroup({ id: children.id, name: children.name })}
    >
      <GroupInput type="radio" name="preset" id={`${children.presetId}`} />
      <GroupLabel htmlFor={`${children.presetId}`}>
        <GroupName>
          {children.place}|{children.what}|{children.howLong}
        </GroupName>
      </GroupLabel>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 6vh;
  background-color: #3e4249;
  margin: 1vh auto;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GroupLabel = styled.label`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 5px;

  display: flex;
`;

const GroupInput = styled.input`
  position: absolute;
  font-size: 30px;
  color: white;
  visibility: hidden;

  &:checked + label {
    border-radius: 5px;
    background-color: #383b41;
    color: white;
  }
`;

const GroupName = styled.div`
  height: 1em;
  line-height: 50%;
  margin: auto 0;
`;

export default ConditionListItem;
