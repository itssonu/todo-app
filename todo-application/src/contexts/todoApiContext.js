import { createContext } from 'react';

const defaultState = {
  todos: [],
  setTodos: (todos) => {},
  deleteTodo: (id) => {},
  addTodo: (todo) => {},
  toggleTodo: (id) => {},
  setCompletedCount:(todos) =>{}
};

const TodoApiContext = createContext(defaultState);

export default TodoApiContext;
