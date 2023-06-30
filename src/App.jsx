import "./App.css";
import React, { useReducer } from "react";
import { Buffer } from "./components/Buffer";
import { Prompt } from "./components/Prompt";

function bufferReducer(state, action) {
  switch (action.type) {
    case "entry":
      return [
        ...state,
        {
          id: state.length + 1,
          type: action.entry.type,
          value: action.entry.value,
        },
      ];
    case "clear":
      return [];
    default:
      return state;
  }
}

function App() {
  const [entries, dispatch] = useReducer(bufferReducer, []);

  function addCommand(command) {
    dispatch({ type: "entry", entry: { type: "command", value: command } });
  }

  function addError(error) {
    dispatch({ type: "entry", entry: { type: "error", value: error } });
  }

  function addOutput(output) {
    dispatch({ type: "entry", entry: { type: "output", value: output } });
  }

  function clear() {
    dispatch({ type: "clear" });
  }

  return (
    <>
      <Buffer entries={entries} />
      <Prompt
        addCommand={addCommand}
        addOutput={addOutput}
        addError={addError}
        clear={clear}
      />
    </>
  );
}

export default App;
