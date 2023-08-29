import React, { Component } from "react";
import TaskList from "./TaskList.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      newTaskText: "",
      tasksLeft: 0, // Nuevo estado para el contador
    };
  }

  handleInputChange = (event) => {
    this.setState({ newTaskText: event.target.value });
  };

  handleTaskAdd = (event) => {
    event.preventDefault();
    const { tasks, newTaskText } = this.state;
    if (newTaskText.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: newTaskText,
        active: true,
      };
      this.setState((prevState) => ({
        tasks: [...prevState.tasks, newTask],
        newTaskText: "",
        tasksLeft: prevState.tasksLeft + 1, // Incrementar el contador
      }));
    }
  };

  handleTaskToggle = (taskId) => {
    const updatedTasks = this.state.tasks.map((task) => {
      if (task.id === taskId) {
        task.active = !task.active;
      }
      return task;
    });

    const activeTasks = updatedTasks.filter((task) => task.active);

    this.setState({
      tasks: updatedTasks,
      tasksLeft: activeTasks.length, // Actualiza el contador
    });
  };

  handleTaskDelete = (taskId) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    const activeTasks = updatedTasks.filter((task) => task.active);

    this.setState({
      tasks: updatedTasks,
      tasksLeft: activeTasks.length, // Actualiza el contador
    });
  };

  render() {
    const { tasks, newTaskText, tasksLeft } = this.state;
    return (
      <div className="container mt-5">
        <h1>TodoList</h1>
        <form onSubmit={this.handleTaskAdd}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Insert new Task"
              value={newTaskText}
              onChange={this.handleInputChange}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="submit">
                Agregar
              </button>
            </div>
          </div>
        </form>
        <TaskList
          tasks={tasks}
          onTaskToggle={this.handleTaskToggle}
          onTaskDelete={this.handleTaskDelete}
        />
        {tasksLeft === 1 ? <p>1 Item left</p> : <p>{tasksLeft} Items left</p>}
      </div>
    );
  }
}

export default App;
