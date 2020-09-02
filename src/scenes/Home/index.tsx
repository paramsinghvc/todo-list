import React, { useState, useCallback } from "react";
import { Grid, Cell } from "@mollycule/lattice";
import { Input } from "antd";
import * as R from "ramda";

import TodoItem, {
  Todo,
  TodoStatus,
  makeCompletedTodo,
  makeActiveTodo,
  changeTodoStatus,
  makeTodo,
} from "./TodoItem";

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([
    makeCompletedTodo("Play guitar"),
    makeActiveTodo("Cook Spaghetti"),
  ]);

  const handleTodoStatusChange = (todoIndex: number) => (
    status: TodoStatus
  ) => {
    const changedTodoLens = R.lensIndex(todoIndex);
    const changeTodo = R.over(changedTodoLens, changeTodoStatus(status));

    const constructNewTodos = R.pipe<Todo[], Todo[], Todo[]>(
      R.clone,
      changeTodo
    );

    setTodos(constructNewTodos);
  };

  const makeTodoItem = (todo: Todo, index: number) => (
    <Cell key={index}>
      <TodoItem data={todo} onChange={handleTodoStatusChange(index)} />
    </Cell>
  );

  const [searchText, setSearchText] = useState("");

  const getInputValue = R.pathOr<string>("", ["target", "value"]);

  const updateInputValue = R.pipe<
    React.ChangeEvent<HTMLInputElement>,
    string,
    void
  >(getInputValue, setSearchText);

  const handleAddTodo = (text: string) => {
    const newTodo = makeActiveTodo(text);
    const appendNewTodo = R.append(newTodo);
    setTodos(appendNewTodo);
  };

  const checkIfEnterKey = R.propEq("keyCode", 13);
  const checkIfTodoExists = R.curry((todosList: Todo[], text: string) =>
    R.any<Todo>(R.propEq("text", text), todosList)
  );

  const handleKeyDown = R.when<React.KeyboardEvent<HTMLInputElement>, void>(
    checkIfEnterKey,
    R.pipe(getInputValue, R.unless(checkIfTodoExists(todos), handleAddTodo))
  );

  const handleInputChange = updateInputValue;

  return (
    <Grid
      width={{ md: "70%", xs: "100%" }}
      margin="10vh auto"
      boxShadow="card"
      p="100px"
    >
      <Cell textAlign="center" as="h1" pb="10vh">
        Todo List
      </Cell>
      <Cell>
        <Input
          size="large"
          type="search"
          placeholder="Type to search and press enter to add"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={searchText}
          allowClear
          autoFocus
        />
      </Cell>
      <Cell pt="30px">
        <Grid flow="row" rowGap="20px">
          {todos.map(makeTodoItem)}
        </Grid>
      </Cell>
    </Grid>
  );
};

export default Home;
