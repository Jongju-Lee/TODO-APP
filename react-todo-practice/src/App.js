import { useState } from "react";
import "./App.css";
import Input from "./components/Input";
import Lists from "./components/Lists";

function App() {
  const [value, setValue] = useState("");
  const [todoData, setTodoData] = useState([]);

  return (
    <>
      <div className="wrapper">
        <h1>TODO LIST</h1>
        <Lists todoData={todoData} setTodoData={setTodoData} />
        <Input
          value={value}
          setValue={setValue}
          todoData={todoData}
          setTodoData={setTodoData}
        />
      </div>
    </>
  );
}

export default App;
