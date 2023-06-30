import React from "react";
import PropTypes from "prop-types";
import "./Buffer.css";

export const Buffer = ({ entries }) => {
  return (
    <div id="buffer">
      {entries.map((entry) => (
        <p className={`buffer__entry buffer__${entry.type}`} key={entry.id}>
          {entry.value}
        </p>
      ))}
    </div>
  );
};

Buffer.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
};
