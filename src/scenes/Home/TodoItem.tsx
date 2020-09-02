import React, { FC, useMemo } from "react";
import { Grid, Cell, Box } from "@mollycule/lattice";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import * as R from "ramda";

export enum TodoStatus {
  Completed,
  Active,
}

export type Todo = {
  status: TodoStatus;
  text: string;
};

export function makeTodo(status: TodoStatus, text: string) {
  return { status, text };
}

export const makeCompletedTodo = R.partial(makeTodo, [TodoStatus.Completed]);
export const makeActiveTodo = R.partial(makeTodo, [TodoStatus.Active]);

export const changeTodoStatus = R.curry((status: TodoStatus, todo: Todo) =>
  makeTodo(status, todo.text)
);

function getStatusFromCheckedValue(isChecked: boolean) {
  return isChecked ? TodoStatus.Completed : TodoStatus.Active;
}

const getCheckedValueFromTodoStatus = R.equals(TodoStatus.Completed);

// function getCheckedValueFromStatus(status) {
//   return status === TodoStatus.Completed ?  true : false;
// }

// const newStatus = e.target.checked ? TodoStatus.Completed : TodoStatus.Active;
// onChange(newStatus);

type OnChange = (status: TodoStatus) => void;

const getTextColor = R.ifElse(
  R.equals(true),
  R.always("subText"),
  R.always("inherit")
);

const getLineDecoration = R.ifElse(
  R.equals(true),
  R.always("line-through"),
  R.always("none")
);

const TodoItem: FC<{ data: Todo; onChange: OnChange }> = ({
  data: { status, text },
  onChange,
}) => {
  const checkIfChecked = R.path<boolean>(["target", "checked"]);
  const callOnChange = R.tap(onChange);

  const handleChange = R.compose(
    callOnChange,
    getStatusFromCheckedValue,
    Boolean,
    checkIfChecked
  );

  const isChecked = useMemo(() => getCheckedValueFromTodoStatus(status), [
    status,
  ]);

  const textColor = useMemo(() => getTextColor(isChecked), [isChecked]);
  const textDecorationStyle = useMemo(
    () => ({ textDecoration: getLineDecoration(isChecked) }),
    [isChecked]
  );

  return (
    <Grid
      border="1px solid"
      borderColor="borderColor"
      p="20px"
      borderRadius="10px"
    >
      <Cell>
        <Checkbox onChange={handleChange} checked={isChecked}>
          <Box as="span" color={textColor} style={textDecorationStyle}>
            {text}
          </Box>
        </Checkbox>
      </Cell>
    </Grid>
  );
};

export default TodoItem;
