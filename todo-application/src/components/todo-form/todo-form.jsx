import {useEffect, useContext, useState} from 'react';
import TodoApiContext from '../../contexts/todoApiContext';
import './todo-form.scss';
import { usePostTodo, useTodos } from '../../hooks/todos';

export const TodoForm = () => {
  const [task, setTask] = useState('');
  const { postTodoData, error } = useTodos()
  
  const handleAddTodo = async () => {
    postTodoData(task)
    setTask('')
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleAddTodo();
    }
  };

  return (
    <>
    <div className="todo-form">
      <input
        placeholder="Enter new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      
      <button type="button" onClick={handleAddTodo}>
        Add task
      </button>
      
    </div>
    {error && <span>{error?.errorDetails?.[0]?.msg ?? 'something went wrong'}</span>}
    </>
  );
};
