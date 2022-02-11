import React, { useState } from "react";
import {
  TrashIcon,
  StarIcon as StarIconS,
  ArrowNarrowRightIcon,
  ArrowNarrowLeftIcon,
} from "@heroicons/react/solid";
import { StarIcon as StarIconO } from "@heroicons/react/outline";
import "./todo-list.css";

const Todo = ({ todoList, modifyTodo }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  // Adding pagination based on length of total posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = [];
  if (
    todoList.slice(indexOfFirstPost, indexOfLastPost).length === 0 &&
    currentPage !== 1
  ) {
    setCurrentPage(currentPage - 1);
    currentPosts = todoList.slice(indexOfFirstPost, indexOfLastPost);
  } else {
    currentPosts = todoList.slice(indexOfFirstPost, indexOfLastPost);
  }
  console.log(currentPosts);

  return (
    <div>
      {currentPosts.map((item) => (
        <div className="todo-list-item" key={item.id}>
          <div className="todo-list-item-fav">
            {item.favorite ? (
              <StarIconS
                className="btn-fav"
                onClick={() => {
                  modifyTodo(item.id, "favorite");
                }}
              />
            ) : (
              <StarIconO
                className="btn-fav"
                onClick={() => {
                  modifyTodo(item.id, "favorite");
                }}
              />
            )}
          </div>
          <div className="todo-list-item-text">{item.data}</div>
          <div className="todo-list-item-del">
            <TrashIcon
              className="btn-del"
              onClick={() => {
                modifyTodo(item.id, "delete");
              }}
            />
          </div>
        </div>
      ))}
      {currentPage !== 1 ? (
        <ArrowNarrowLeftIcon
          className="btn-prev"
          onClick={() => setCurrentPage(currentPage - 1)}
        />
      ) : null}
      {indexOfLastPost - (postsPerPage - currentPosts.length) ===
      todoList.length ? null : (
        <ArrowNarrowRightIcon
          className="btn-next"
          onClick={() => setCurrentPage(currentPage + 1)}
        />
      )}
    </div>
  );
};

export default Todo;
