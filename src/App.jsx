import "./App.css";
import React, { useReducer } from "react";
import { History } from "./components/History";
import { Prompt } from "./components/Prompt";

function historyRecuder(state, action) {
  switch (action.type) {
    case "added":
      return [...state, { id: action.id, command: action.command }];
    case "cleared":
      return [];
    default:
      return state;
  }
}

function App() {
  const [history, dispatch] = useReducer(historyRecuder, []);

  function addCommand(command) {
    dispatch({
      type: "added",
      id: history.length + 1,
      command,
    });
  }

  return (
    <>
      <History history={history} />
      <Prompt addCommand={addCommand} />
    </>
  );
}

export default App;
