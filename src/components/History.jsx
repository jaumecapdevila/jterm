import React from "react";
import PropTypes from "prop-types";
import "./History.css";

export const History = ({ history }) => {
  return (
    <section className="history">
      {history.map((entry) => (
        <p className="history__command" key={entry.id}>
          {entry.command}
        </p>
      ))}
    </section>
  );
};

History.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      command: PropTypes.string.isRequired,
    })
  ),
};
