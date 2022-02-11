import "./App.css";
import AddTodo from "./components/AddTodo.js";
import React from "react";
import "./components/todo-list.css";

const App = () => {
  return (
    <div className="container">
      <h2 className="todo-list-heading">Todo List</h2>
      <AddTodo />
    </div>
  );
};

export default App;
