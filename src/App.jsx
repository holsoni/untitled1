import { useEffect, useState } from "react";
import "./App.css";
import ColorPicker from "./Components/ColorPicker/ColorPicker";
import Key from "./Components/KeyComponet/Key";
import data from "./Components/KeysData";
import {
  CustomP,
  KeyboardContainer,
  SideBarContainer,
} from "./Components/StyledComponents/StyledComponents";

function initKeys() {
  return data;
}

function isAlreadyInGroups(id, groups) {
  let flag = false;
  if (groups.length !== 0) {
    groups.forEach((element) => {
      element.forEach((key) => {
        if (key.keyId === id) {
          flag = true;
        }
      });
    });
  }
  return flag;
}

function selectFromPreset(id, preset) {
  let item = undefined;
  preset.forEach((group) => {
    group.forEach((el) => {
      if (el.keyId === id) item = el;
    });
  });
  return item;
}

function App() {
  const [currentColor, setCurrentColor] = useState(() => {
    return "#000000";
  });

  const [keysState, setKeysState] = useState(() => {
    return initKeys();
  });

  const [currentGroup, setCurrentGroup] = useState(() => {
    return [];
  });

  const [groups, setGroups] = useState(() => {
    return [];
  });

  function addToGroup(id) {
    if (!isAlreadyInGroups(id, groups)) {
      setCurrentGroup((prev) => {
        let list = prev;
        let elem = keysState.find((el) => el.keyId === id);
        if (list.length > 0) {
          if (list.filter((el) => el.keyId === id).length === 0) {
            list.push({
              ...elem,
              isSelected: true,
            });
          } else {
            list = list.filter((el) => el.keyId !== id);
          }
        } else {
          list.push({
            ...elem,
            isSelected: true,
          });
        }
        return list;
      });
    }
  }

  function changeSelectedColor(color) {
    setCurrentColor(() => {
      return color;
    });
  }

  function saveGroup() {
    if (currentGroup.length > 0) {
      setGroups((prev) => {
        let list = prev;
        list.push(currentGroup);
        setCurrentGroup(() => []);
        return list;
      });
    }
  }

  function savePreset() {
    if (groups.length > 0) {
      localStorage.setItem(
        document.getElementById("presetName").value,
        JSON.stringify(groups)
      );
      setCurrentGroup(() => {
        return [];
      });
      setGroups(() => {
        return [];
      });
    }
  }

  function loadPreset() {
    let preset = JSON.parse(
      localStorage.getItem(document.getElementById("presetName").value)
    );
    if (preset !== null) {
      setKeysState((prev) => {
        return prev.map((key) => {
          let item = selectFromPreset(key.keyId, preset);
          if (item !== undefined) {
            return {
              ...key,
              isSelected: true,
              color: item.color,
            };
          } else {
            return {
              ...key,
            };
          }
        });
      });
    }
  }

  function cleanEnv() {
    setKeysState(() => {
      return initKeys();
    });
  }

  useEffect(() => {
    if (currentGroup.length > 0) {
      setKeysState((prev) => {
        return prev.map((key) => {
          let elem = currentGroup.find((el) => el.keyId === key.keyId);
          if (elem !== undefined) {
            return {
              ...key,
              isSelected: elem.isSelected,
              color: elem.color,
            };
          } else if (isAlreadyInGroups(key.keyId, groups)) {
            let findKey = groups.find((el) =>
              el.find((item) => item.keyId === key.keyId)
            );
            findKey = findKey.filter((el) => el.keyId === key.keyId);
            return {
              ...key,
              isSelected: true,
              color: findKey[0].color,
            };
          } else {
            return {
              ...key,
              isSelected: false,
              color: "#000000",
            };
          }
        });
      });
    } else {
      setKeysState((prev) => {
        return prev.map((el) => {
          return {
            ...el,
            isSelected: false,
            color: "#000000",
          };
        });
      });
    }
  }, [currentGroup]);

  useEffect(() => {
    if (currentGroup.length > 0) {
      setCurrentGroup((prev) => {
        return prev.map((el) => {
          return {
            ...el,
            color: currentColor,
          };
        });
      });
    }
  }, [currentColor]);

  return (
    <div className="App">
      <SideBarContainer>
        <ColorPicker handleChangeColor={changeSelectedColor} />
        <CustomP>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => saveGroup()}
          >
            Save group
          </button>
        </CustomP>
        <CustomP>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => savePreset()}
          >
            Save preset
          </button>
        </CustomP>
        <CustomP>
          <input id="presetName" type="text" placeholder="Enter name"></input>
        </CustomP>
        <CustomP>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => loadPreset()}
          >
            Load preset
          </button>
        </CustomP>
        <CustomP>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => cleanEnv()}
          >
            Clean Keyboard
          </button>
        </CustomP>
      </SideBarContainer>
      <KeyboardContainer>
        {keysState.map((el) => {
          return (
            <Key
              key={el.keyId}
              id={el.keyId}
              handleClick={addToGroup}
              name={el.keyName}
              color={el.color}
              isSelected={el.isSelected}
              isLogo={el.keyId === 0 ? true : false}
            />
          );
        })}
      </KeyboardContainer>
    </div>
  );
}

export default App;
