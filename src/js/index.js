// Importa React y ReactDOM
import React from "react";
import ReactDOM from "react-dom";
import App from "./component/app";

// Incluye tus estilos en el bundle de Webpack
import "../styles/index.css";

// Renderiza tu aplicación React
ReactDOM.render(<App />, document.querySelector("#app"));
