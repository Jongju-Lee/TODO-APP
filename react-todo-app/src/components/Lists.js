import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Lists = ({ todoData, setTodoData }) => {
  const handleClick = (id) => {
    const newTodoList = todoData.filter((it) => it.id !== id);
    setTodoData(newTodoList);
  };

  const handleCompleteChange = (id) => {
    const newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTodoData);
  };

  return (
    <DragDropContext>
      {/* 최상단은 DragDropContext로 감싸고 */}
      <Droppable droppableId="todo">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {/* 이 밑으로는 drop이 가능합니다. */}
            {todoData.map((todo, index) => {
              return (
                <Draggable
                  key={todo.id}
                  draggableId={todo.id.toString()}
                  index={index}
                >
                  {/* 이쪽부터 drag가 가능합니다. */}
                  {(provided, snapshot) => (
                    <div
                      key={todo.id}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                    >
                      <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 rounded-lg">
                        <div className="items-center">
                          <input
                            className="mr-5 cursor-pointer"
                            type="checkbox"
                            defaultChecked={todo.completed}
                            onChange={() => handleCompleteChange(todo.id)}
                          />
                          <span
                            className={
                              todo.completed ? "line-through" : undefined
                            }
                          >
                            {todo.title}
                          </span>
                        </div>
                        <div className="items-center">
                          <button onClick={() => handleClick(todo.id)}>
                            x
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Lists;

// Drag and Drop 기능 추가하기 10분부터 시청 (13분)
