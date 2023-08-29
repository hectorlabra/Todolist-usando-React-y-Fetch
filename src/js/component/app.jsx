import React, { Component } from "react";
import TaskList from "./TaskList.jsx";

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
    // Realizar una solicitud POST para crear el usuario solo si aún no se ha creado
    if (!this.state.apiLoaded) {
      fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([]),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Usuario creado:", data);
          this.setState({ apiLoaded: true });
          this.fetchTasks();
        })
        .catch((error) => {
          console.error("Error al crear usuario:", error);
        });
    } else {
      // Realizar la solicitud GET para obtener las tareas
      fetch(this.apiUrl)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            tasks: data,
            tasksLeft: data.filter((task) => !task.done).length,
          });
        })
        .catch((error) => {
          console.error("Error al obtener tareas:", error);
        });
    }
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

      this.setState((prevState) => ({
        tasks: [...prevState.tasks, newTask],
        newTaskText: "",
        tasksLeft: prevState.tasksLeft + 1,
      }));

      fetch(this.apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...this.state.tasks, newTask]),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Tarea agregada:", data);
        })
        .catch((error) => {
          console.error("Error al agregar tarea:", error);
        });
    }
  };

  handleTaskToggle = (taskId) => {
    const updatedTasks = this.state.tasks.map((task) => {
      if (task.label === taskId) {
        task.done = !task.done;
      }
      return task;
    });

    this.setState({
      tasks: updatedTasks,
      tasksLeft: updatedTasks.filter((task) => !task.done).length,
    });

    fetch(this.apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTasks),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Tarea completada:", data);
      })
      .catch((error) => {
        console.error("Error al completar tarea:", error);
      });
  };

  handleTaskDelete = (taskId) => {
    const updatedTasks = this.state.tasks.filter(
      (task) => task.label !== taskId
    );

    this.setState({
      tasks: updatedTasks,
      tasksLeft: updatedTasks.filter((task) => !task.done).length,
    });

    fetch(this.apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTasks),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Tarea eliminada:", data);
      })
      .catch((error) => {
        console.error("Error al eliminar tarea:", error);
      });
  };

  handleClearAllTasks = () => {
    fetch(this.apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
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
