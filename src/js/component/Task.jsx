import React from "react";

const Task = ({ task, onTaskToggle, onTaskDelete }) => {
  const { label, done } = task;

  return (
    <li className={`list-group-item ${done ? "completed" : ""}`}>
      <div className="d-flex justify-content-between align-items-center">
        <span style={{ color: done ? "gray" : "black" }}>{label}</span>
        <div>
          <button
            className="btn btn-sm btn-danger mr-2"
            onClick={() => onTaskDelete(label)}
          >
            <i className="fas fa-trash"></i>
          </button>
          <button
            className="btn btn-sm btn-success"
            onClick={() => onTaskToggle(label)}
          >
            {done ? "Reabrir" : "Completar"}
          </button>
        </div>
      </div>
    </li>
  );
};

export default Task;
