import React from "react";

const Task = ({ task, onTaskToggle, onTaskDelete }) => {
  const { id, text, active } = task;

  return (
    <li className={`list-group-item ${active ? "" : "completed"}`}>
      <div className="d-flex justify-content-between align-items-center">
        <span>{text}</span>
        <div>
          <button
            className="btn btn-sm btn-danger mr-2"
            onClick={() => onTaskDelete(id)}
            style={{ display: active ? "block" : "none" }}
          >
            <i className="fas fa-trash"></i>
          </button>
          <button
            className="btn btn-sm btn-success"
            onClick={() => onTaskToggle(id)}
          >
            {active ? "Completar" : "Reabrir"}
          </button>
        </div>
      </div>
    </li>
  );
};

export default Task;
