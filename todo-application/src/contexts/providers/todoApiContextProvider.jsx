import { React, useReducer, useCallback } from 'react';
import TodoApiContext from '../todoApiContext';

function TodoApiContextProvider({ children }) {
  // eslint-disable-next-line no-use-before-define
  const [{ todos, count }, dispatch] = useReducer(reducer, {
    todos: [],
  });

  const setTodos = useCallback(async (todosData) => {
    dispatch({ type: 'TODO_List', data: todosData });
  }, []);

  const setCompletedCount = useCallback(async (countData) => {
    dispatch({ type: 'TODO_Count', data: countData });
  }, []);

  const deleteTodo = useCallback(async (id) => {
    // delete todo
  }, []);

  const toggleTodo = useCallback(async (id) => {}, []);

  const todosContextValues = {
    todos,
    count,
    setTodos,
    setCompletedCount,
    toggleTodo,
  };

  return (
    <TodoApiContext.Provider value={todosContextValues}>
      {children}
    </TodoApiContext.Provider>
  );
}

export default TodoApiContextProvider;

const reducer = (state, action) => {
  switch (action.type) {
    case 'TODO_List':
      return {
        ...state,
        todos: action.data,
      };
    case 'TODO_Count':
      return {
        ...state,
        count: action.data,
      };

    default:
      return state;
  }
};
