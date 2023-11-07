import { Button, TextField } from "@mui/material";
import React, { useRef } from "react";
import styled from "styled-components";

const StyledTextField = styled(TextField)`
  margin-left: 3px;
  margin-top: 10px;
  width: 50%;
`;

const StyledButton = styled(Button)`
  margin-top: 12px;
  margin-left: 4px;
  height: 52px;
`;

const Input = ({ value, setValue, todoData, setTodoData }) => {
  const $input = useRef();
  const onChangeValue = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newData = {
      id: Date.now(),
      content: value,
      check: false,
    };
    setTodoData([...todoData, newData]);
    setValue("");
    $input.current.focus();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <StyledTextField
          ref={$input}
          id="outlined-basic"
          label="해야 할 일을 입력 해주세요!"
          variant="outlined"
          value={value}
          onChange={onChangeValue}
        />
        <StyledButton variant="contained" color="success" type="submit">
          Success
        </StyledButton>
      </form>
    </>
  );
};

export default Input;
