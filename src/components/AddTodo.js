import React, { useState } from "react";
import { SwitchVerticalIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import TodoList from "./TodoList";
import "./AddTodo.css";

const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  // Function to handle the newTodo item after submission

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("String:", e.target.value);
    if (todo.length !== 0) {
      addTodo({
        id: Math.floor(Math.random() * 10000),
        data: todo,
        favorite: false,
      });
      setTodo("");
    }
  };

  // Function to set the state after every new todo item has been created

  const addTodo = (item) => {
    console.log("Item:", item);
    let newTodos = [item, ...todoList];
    setTodoList(newTodos);
  };

  // Function to modify the existing todo state based on the type of request -> delete / add a todo to favortie list

  const modifyTodo = (id, type) => {
    if (type === "delete") {
      let newTodoList = todoList.filter((item) => {
        return item.id !== id;
      });
      setTodoList(newTodoList);
    } else {
      let elementIndex = todoList.findIndex((item) => item.id === id);
      setTodoList([
        ...todoList.slice(0, elementIndex),
        {
          ...todoList[elementIndex],
          favorite: !todoList[elementIndex].favorite,
        },
        ...todoList.slice(elementIndex + 1),
      ]);
    }
  };

  // Function to sort a todo and display it on top if it is  favourite

  const sortTodo = () => {
    const sortedTodoList = [...todoList].sort((item1, item2) => {
      if (item1.favorite > item2.favorite) return -1;
      else if (item1.favorite < item2.favorite) return 1;
      else return 0;
    });
    setTodoList(sortedTodoList);
  };

  return (
    <div className="todo-container">
      <form onSubmit={handleSubmit}>
        <div className="todo-input-container">
          <input
            maxLength={100}
            className="todo-input"
            type="text"
            placeholder="Add a todo"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />
          <span onClick={handleSubmit}>
            <PlusCircleIcon className="btn-add" />
          </span>
          <span onClick={sortTodo}>
            {" "}
            <SwitchVerticalIcon className="btn-sort" />
          </span>
        </div>
      </form>
      <TodoList modifyTodo={modifyTodo} todoList={todoList} />
    </div>
  );
};

export default AddTodo;
