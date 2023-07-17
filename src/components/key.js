import React, { useContext } from "react";
import { appContext } from "../App";

function Key({ keyVal, bigKey, disabled }) {
  const { onDelete, onEnter, onSelectedLetter } = useContext(appContext);

  const selectLetter = () => {
    if (keyVal === "Enter") {
      onEnter();
    } else if (keyVal === "Delete") {
      onDelete();
    } else {
      onSelectedLetter(keyVal);
    }
  };

  return (
    <div
      className="key"
      id={bigKey ? "big" : disabled && "disabled"}
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
}

export default Key;
