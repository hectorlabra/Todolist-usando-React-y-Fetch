import React, { Component, useState, useEffect } from "react";
import TaskList from "./TaskList.jsx";
import Task from "./Task.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      newTaskText: "",
      tasksLeft: 0,
      apiLoaded: false,
    };
    this.apiUrl =
      "https://playground.4geeks.com/apis/fake/todos/user/hectorlabra";
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch(this.apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          tasks: data,
          tasksLeft: data.filter((task) => !task.done).length,
          apiLoaded: true,
        });
      })
      .catch((error) => {
        console.error("Error al obtener tareas:", error);
      });
  }

  handleInputChange = (event) => {
    this.setState({ newTaskText: event.target.value });
  };

  handleTaskAdd = (event) => {
    event.preventDefault();
    const { newTaskText } = this.state;
    if (newTaskText.trim() !== "") {
      const newTask = {
        label: newTaskText,
        done: false,
      };

      // Agregar la nueva tarea localmente
      this.setState((prevState) => ({
        tasks: [...prevState.tasks, newTask],
        newTaskText: "",
        tasksLeft: prevState.tasksLeft + 1,
      }));

      // Realizar la solicitud PUT para actualizar la lista en la API
      this.updateTasks([...this.state.tasks, newTask]);
    }
  };

  handleTaskToggle = (taskId) => {
    const updatedTasks = this.state.tasks.map((task) => {
      if (task.label === taskId) {
        task.done = !task.done;
      }
      return task;
    });

    // Actualizar el estado local
    this.setState({
      tasks: updatedTasks,
      tasksLeft: updatedTasks.filter((task) => !task.done).length,
    });

    // Realizar la solicitud PUT para actualizar la lista en la API
    this.updateTasks(updatedTasks);
  };

  handleTaskDelete = (taskId) => {
    const updatedTasks = this.state.tasks.filter(
      (task) => task.label !== taskId
    );

    // Actualizar el estado local
    this.setState({
      tasks: updatedTasks,
      tasksLeft: updatedTasks.filter((task) => !task.done).length,
    });

    // Realizar la solicitud PUT para actualizar la lista en la API
    this.updateTasks(updatedTasks);
  };

  handleClearAllTasks = () => {
    // Realizar la solicitud DELETE para eliminar todas las tareas en la API
    fetch(this.apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        // Actualizar el estado local
        this.setState({
          tasks: [],
          tasksLeft: 0,
        });
        console.log("Todas las tareas eliminadas");
      })
      .catch((error) => {
        console.error("Error al eliminar todas las tareas:", error);
      });
  };

  updateTasks = (updatedTasks) => {
    fetch(this.apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTasks),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Tareas actualizadas:", data);
      })
      .catch((error) => {
        console.error("Error al actualizar tareas:", error);
      });
  };

  render() {
    const { tasks, newTaskText, tasksLeft, apiLoaded } = this.state;
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
        {apiLoaded ? (
          <div>
            <TaskList
              tasks={tasks}
              onTaskToggle={this.handleTaskToggle}
              onTaskDelete={this.handleTaskDelete}
            />
            <button
              className="btn btn-danger"
              onClick={this.handleClearAllTasks}
            >
              Limpiar tareas
            </button>
          </div>
        ) : (
          <p>Cargando tareas...</p>
        )}
        {tasksLeft === 1 ? <p>1 Item left</p> : <p>{tasksLeft} Items left</p>}
      </div>
    );
  }
}

export default App;
