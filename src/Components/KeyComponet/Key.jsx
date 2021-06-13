import { useEffect, useState } from "react";
import styled from "styled-components";

const LogoDiv = styled.div`
  margin: 20px 20px;
  height: 100px;
  width: 100px;
  text-align: center;
  ${(prop) => (prop.isSelected ? `text-shadow: ${prop.color} 0 0 8px` : "")};
  cursor: pointer;
`;

const KeyDiv = styled.div`
  margin: 20px 20px;
  ${(prop) =>
    prop.isSelected ? `-webkit-box-shadow: 0 0 40px ${prop.color}` : ""};
  ${(prop) => (prop.isSelected ? `box-shadow: 0 0 40px ${prop.color}` : "")};
  border: solid 2px ${(prop) => prop.color};
  background-color: ${(prop) => (prop.isSelected ? "#D1D0D0" : "white")};
  border-radius: 5px;
  height: 100px;
  width: 100px;
  text-align: center;
  cursor: pointer;
  &:last-child {
    width: 830px;
    grid-column-start: 1;
    grid-column-end: 7;
  }
`;

const KeySpan = styled.span`
  color: ${(prop) => prop.color};
  font-weight: 800;
  vertical-align: middle;
  line-height: 100px;
  font-size: 22px;
`;

function Key(props) {
  const [currentState, setCurrentState] = useState(props);

  useEffect(() => {
    setCurrentState(() => {
      return props;
    });
  }, [props]);

  return props.isLogo ? (
    <LogoDiv
      onClick={() => currentState.handleClick(currentState.id)}
      color={currentState.color}
      isSelected={currentState.isSelected}
    >
      <KeySpan color={currentState.color}>{currentState.name}</KeySpan>
    </LogoDiv>
  ) : (
    <KeyDiv
      onClick={() => currentState.handleClick(currentState.id)}
      color={currentState.color}
      isSelected={currentState.isSelected}
    >
      <KeySpan color={currentState.color}>{currentState.name}</KeySpan>
    </KeyDiv>
  );
}

export default Key;
