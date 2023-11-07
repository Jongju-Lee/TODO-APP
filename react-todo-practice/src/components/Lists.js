import { Button } from "@mui/material";
import React from "react";

const Lists = ({ todoData, setTodoData }) => {
  const btnStyle = {
    color: "fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  const getStyle = (check) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: check ? "line-through" : "none",
    };
  };

  const onClickCheckBox = (id) => {
    const newData = todoData.map((todo) => {
      if (todo.id === id) {
        todo.check = !todo.check;
      }
      return todo;
    });
    setTodoData(newData);
  };

  const onRemove = (id) => {
    const newData = todoData.filter((todo) => todo.id !== id);
    setTodoData(newData);
  };

  return (
    <>
      {todoData.map((todo) => {
        return (
          <div key={todo.id} style={getStyle(todo.check)}>
            <input
              type="checkbox"
              checked={todo.check}
              onChange={() => onClickCheckBox(todo.id)}
            />
            {todo.content}
            {/* <Button variant="text" onClick={() => onRemove(todo.id)}>
              x
            </Button> */}
            <button style={btnStyle} onClick={() => onRemove(todo.id)}>
              x
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Lists;
