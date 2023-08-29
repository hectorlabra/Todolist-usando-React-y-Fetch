import React from "react";
import Task from "./Task";

const TaskList = ({ tasks, onTaskToggle, onTaskDelete }) => {
  if (!Array.isArray(tasks)) {
    return null;
  }

  return (
    <ul className="list-group">
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          onTaskToggle={onTaskToggle}
          onTaskDelete={onTaskDelete}
        />
      ))}
    </ul>
  );
};

export default TaskList;
