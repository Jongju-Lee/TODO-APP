import { useCallback, useRef, useState } from "react";
import "./App.css";
import Lists from "./components/Lists";
import Form from "./components/Form";

const initialTodoData = localStorage.getItem("todoData")
  ? JSON.parse(localStorage.getItem("todoData"))
  : [];

const App = () => {
  const [value, setValue] = useState("");
  const [todoData, setTodoData] = useState(initialTodoData);
  const inputElem = useRef();

  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem("todoData", JSON.stringify([]));
  };

  const handleClick = useCallback(
    (id) => {
      const newTodoList = todoData.filter((it) => it.id !== id);
      setTodoData(newTodoList);
      localStorage.setItem("todoData", JSON.stringify(newTodoList));
    },
    [todoData]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };
    setTodoData((prev) => [...prev, newTodo]);
    localStorage.setItem("todoData", JSON.stringify([...todoData, newTodo]));
    setValue("");
    inputElem.current.focus();
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded-2xl shadow-lg lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button
            className="p-2 px-4 text-blue-400 border-2 border-blue-400 rounded-lg hover:text-white hover:bg-blue-100"
            onClick={handleRemoveClick}
          >
            Remove All
          </button>
        </div>
        <Lists
          todoData={todoData}
          setTodoData={setTodoData}
          handleClick={handleClick}
        />
        <Form
          value={value}
          setValue={setValue}
          setTodoData={setTodoData}
          handleSubmit={handleSubmit}
          inputElem={inputElem}
        />
      </div>
    </div>
  );
};

export default App;
