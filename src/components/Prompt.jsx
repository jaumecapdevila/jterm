import React, { useRef, useState, useEffect } from "react";
import "./Prompt.css";

export const Prompt = () => {
  const textarea = useRef(null);

  const [userPrompt, setUserPrompt] = useState("");

  const handleChange = (event) => {
    setUserPrompt(event.target.value);
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
        onChange={handleChange}
      ></textarea>
      <span>{userPrompt}</span>
      <b className="cursor">█</b>
    </section>
  );
};
