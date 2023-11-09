import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "./List";

const Lists = React.memo(({ todoData, setTodoData, handleClick }) => {
  const handleEnd = (result) => {
    // result 매개변수에는 source 항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보가 포함됩니다.
    if (!result.destination) return;
    // 목적지가 없으면(이벤트 취소) 이 함수를 종료 합니다.
    const newTodoData = [...todoData];
    // 불변성을 지키기 위해 새로운 객체에 현재 스테이트를 복사
    // todoData는 현재 todoList의 state이름입니다.
    // 적용하려는 state이름을 넣어주세요!
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);
    // 변경시키는 item을 복사한 state에서 splice로 삭제하고 그 값을 reorderedItem 변수에 담아줍니다.
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    // reorderedItem을 복사한 state에 한번 더 splice로 목적지에 삽입해 줍니다.
    setTodoData(newTodoData);
    localStorage.setItem("todoData", JSON.stringify(newTodoData));
    // setTodoData()는 state의 setter함수 이름입니다.
    // setter함수 안에 새로 수정한 state를 넣어서 state를 변경합니다.
  };

  return (
    <DragDropContext onDragEnd={handleEnd}>
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
                    <List
                      key={todo.id}
                      id={todo.id}
                      title={todo.title}
                      completed={todo.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                      handleClick={handleClick}
                    />
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
});

export default Lists;
