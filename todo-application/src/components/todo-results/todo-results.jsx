import * as React from 'react';
import TodosApiContext from '../../contexts/todoApiContext';
import './todo-results.scss';
import TodoApiContext from '../../contexts/todoApiContext';

export const TodoResults = () => {
  const { count } = React.useContext(TodoApiContext);

  const calculateChecked = () => {

  };

  return (
    <div className="todo-results">
      Done:
      {count}
    </div>
  );
};
