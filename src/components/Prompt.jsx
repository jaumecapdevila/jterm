import React, { useRef, useState, useEffect, useContext } from "react";
import "./Prompt.css";

export const Prompt = ({ addCommand }) => {
  const textarea = useRef(null);

  const [userPrompt, setUserPrompt] = useState("");

  const copyPrompt = (event) => {
    setUserPrompt(event.target.value.trim());
  };

  const handleCommand = (event) => {
    if (event.key === "Enter") {
      const command = userPrompt.split(" ")[0];
      addCommand(command);
      setUserPrompt("");
    }
  };

  useEffect(() => {
    if (textarea.current) {
      textarea.current.focus();
    }
  }, []);

  return (
    <section className="prompt">
      <textarea
        ref={textarea}
        type="text"
        autoFocus
        value={userPrompt}
        onKeyUp={handleCommand}
        onChange={copyPrompt}
      ></textarea>
      <span>{userPrompt}</span>
      <b className="cursor">█</b>
    </section>
  );
};
