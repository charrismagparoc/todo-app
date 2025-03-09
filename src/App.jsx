import React from "react";
import ToDoList from "./ToDoList";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <div className="todo-wrapper">
        <h1 className="title">TODOLIST</h1>
        <ToDoList />
      </div>
    </div>
  );
};

export default App;