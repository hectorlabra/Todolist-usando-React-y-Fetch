import React from "react";
import Task from "./Task";

const TaskList = ({ tasks, onTaskToggle, onTaskDelete }) => {
  // Verifica si tasks es un array antes de mapearlo
  if (!Array.isArray(tasks)) {
    return null; // O puedes manejar este caso de otra manera
  }

  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <Task
          key={task.id} // o key={task.otraPropiedadUnica} si tienes una propiedad única diferente
          task={task}
          onTaskToggle={onTaskToggle}
          onTaskDelete={onTaskDelete}
        />
      ))}
    </ul>
  );
};

export default TaskList;
