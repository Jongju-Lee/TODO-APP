import React, { useState } from "react";

const List = React.memo(
  ({
    id,
    title,
    completed,
    todoData,
    setTodoData,
    provided,
    snapshot,
    handleClick,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const onChangeInput = (e) => {
      setEditedTitle(e.target.value);
    };

    const onSubmit = (e) => {
      e.preventDefault();
      const newTodoData = todoData.map((todo) => {
        if (todo.id === id) {
          todo.title = editedTitle;
        }
        return todo;
      });
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
      setIsEditing(false);
    };

    const onClickEditBtn = () => {
      setIsEditing(true);
    };

    const handleCompleteChange = (id) => {
      const newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
    };

    if (isEditing === true) {
      // 수정중 일때
      return (
        <div
          key={id}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          className="flex items-center justify-between w-full px-4 py-1 my-2 bg-gray-100 text-gray-600 rounded-lg"
          // 기존의 고정되어 있던 background color를 Drag중에는 item이 더 진한색으로 보일 수 있게
          // snapshot.isDragging을 적용
        >
          <div className="items-center">
            <form onSubmit={onSubmit}>
              <input
                className="w-full border-2 border-solid border-blue-300 px-2 rounded-xl"
                value={editedTitle}
                onChange={onChangeInput}
                maxLength="30"
              />
            </form>
          </div>
          <div className="items-center">
            <button
              className="px-4 py-2 float-right"
              onClick={() => handleClick(id)}
            >
              x
            </button>
            <button
              className="px-3 mt-2 mr-2 font-semibold text-gray-500 cursor-pointer"
              onClick={onSubmit}
            >
              save
            </button>
          </div>
        </div>
      );
    } else {
      // 수정 하고 있지 않을때
      return (
        <div
          key={id}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          className={`${
            snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
          } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 rounded-lg`}
          // 기존의 고정되어 있던 background color를 Drag중에는 item이 더 진한색으로 보일 수 있게
          // snapshot.isDragging을 적용
        >
          <div className="items-center">
            <input
              className="mr-5 cursor-pointer"
              type="checkbox"
              defaultChecked={completed}
              onChange={() => handleCompleteChange(id)}
            />
            <span className={completed ? "line-through" : undefined}>
              {title}
            </span>
          </div>
          <div className="items-center">
            <button
              className="px-4 py-2 float-right"
              onClick={() => handleClick(id)}
            >
              x
            </button>
            <button
              className="px-3 mt-2 mr-2 font-semibold text-gray-500 cursor-pointer"
              onClick={onClickEditBtn}
            >
              edit
            </button>
          </div>
        </div>
      );
    }
  }
);

export default List;
