import React, { useRef, useState, useEffect, useContext } from "react";
import "./Prompt.css";
import PropTypes from "prop-types";

export const Prompt = ({ addCommand }) => {
  const textarea = useRef(null);

  const [userPrompt, setUserPrompt] = useState("");

  const copyPrompt = (event) => {
    setUserPrompt(event.target.value.trim());
  };

  const focusPrompt = () => {
    textarea.current.focus();
  };

  const handleCommand = (event) => {
    if (event.key === "Enter") {
      const command = userPrompt.split(" ")[0];
      addCommand(command);
      setUserPrompt("");
    }
  };

  useEffect(() => {
    window.addEventListener("click", focusPrompt);
    return () => {
      window.removeEventListener("click", focusPrompt);
    };
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

Prompt.propTypes = {
  addCommand: PropTypes.func.isRequired,
};
