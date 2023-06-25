import React, { useRef, useState, useEffect } from "react";
import "./Prompt.css";
import PropTypes from "prop-types";

const availableCommands = ["clear", "ls", "cd", "pwd", "help"];

export const FILESYSTEM = {
  "~": {
    projects: {
      web: ["react-terminal"],
    },
    secret: ["password.txt"],
  },
};

export const Prompt = ({ record, clear }) => {
  const textarea = useRef(null);

  const [currentPath, setCurrentPath] = useState("~");
  const [promptPrefix, setPromptPrefix] = useState("~ $");
  const [userPrompt, setUserPrompt] = useState("");

  const copyPrompt = (event) => {
    const prompt = event.target.value.replace(/[\n\r]/g, "");
    setUserPrompt(prompt);
  };

  const focusPrompt = () => {
    textarea.current.focus();
  };

  const prefix = (prompt) => {
    return `${promptPrefix}${prompt}`;
  };

  const handleUserPrompt = (event) => {
    if (event.key !== "Enter") {
      return;
    }

    const parts = userPrompt.split(" ");
    const command = parts[0];
    const args = parts.slice(1);

    if (!command) {
      record(prefix(""));
    } else if (!availableCommands.includes(command)) {
      record(prefix(`command not found: ${command}`));
    } else {
      record(prefix(command));
      execute(command, args);
    }

    setUserPrompt("");
  };

  const ls = (pwd, dir) => {
    const path = `${pwd}/${dir || ""}`;
    let files = FILESYSTEM;

    path
      .split("/")
      .filter((step) => step !== "")
      .forEach((step) => {
        files = files[step];
        if (!files) return false;
      });

    if (Array.isArray(files)) {
      return files.join(" ");
    } else if (typeof files === "object") {
      return Object.keys(files).join(" ");
    } else {
      return `${dir}: No such file or directory`;
    }
  };

  const cd = (directory) => {
    let path = currentPath;

    if (directory === "~") {
      path = "~";
    } else if (directory === "..") {
      const parts = currentPath.split("/");
      parts.pop();
      path = parts.join("/");
    } else {
      // TODO validate if dir exists
      path = `${currentPath}/${directory}`;
    }

    setCurrentPath(path);
    setPromptPrefix(`${path} $`);

    return "";
  };

  const execute = (command, args) => {
    let output = "";

    switch (command) {
      case "clear":
        clear();
        break;
      case "ls":
        output = ls(currentPath, args);
        break;
      case "cd":
        output = cd(args[0] || "~");
        break;
      default:
        break;
    }

    record(output);
  };

  useEffect(() => {
    window.addEventListener("click", focusPrompt);
    return () => {
      window.removeEventListener("click", focusPrompt);
    };
  }, []);

  const [promptDir, promptSymbol] = promptPrefix.split(" ");

  return (
    <section className="prompt">
      <textarea
        ref={textarea}
        type="text"
        autoFocus
        value={userPrompt}
        onKeyUp={handleUserPrompt}
        onChange={copyPrompt}
      ></textarea>
      <span className="prompt__dir">{promptDir} </span>
      <span className="prompt__symbol">{promptSymbol} </span>
      <span className="prompt__input">{userPrompt}</span>
      <b className="cursor">█</b>
    </section>
  );
};

Prompt.propTypes = {
  record: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};
