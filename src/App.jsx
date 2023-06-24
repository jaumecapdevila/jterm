import "./App.css";
import React, { useReducer } from "react";
import { History } from "./components/History";
import { Prompt } from "./components/Prompt";

function historyRecuder(state, action) {
  switch (action.type) {
    case "added":
      return [...state, { id: state.length + 1, command: action.command }];
    case "cleared":
      return [];
    default:
      return state;
  }
}

function App() {
  const [history, dispatch] = useReducer(historyRecuder, []);

  function record(command) {
    dispatch({ type: "added", command });
  }

  function clear() {
    dispatch({ type: "cleared" });
  }

  return (
    <>
      <History history={history} />
      <Prompt history={history} record={record} clear={clear} />
    </>
  );
}

export default App;
