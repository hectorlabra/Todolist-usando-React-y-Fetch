import React from "react";
import Task from "./Task";

const TaskList = ({ tasks, onTaskToggle, onTaskDelete }) => {
  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onTaskToggle={onTaskToggle}
          onTaskDelete={onTaskDelete}
        />
      ))}
    </ul>
  );
};

export default TaskList;
