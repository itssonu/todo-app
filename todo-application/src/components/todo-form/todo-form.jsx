import {useEffect, useContext, useState} from 'react';
import TodoApiContext from '../../contexts/todoApiContext';
import './todo-form.scss';
import { usePostTodo } from '../../hooks/todos';

export const TodoForm = () => {
  const { addTodo, setTodos, todos } = useContext(TodoApiContext);
  const [task, setTask] = useState('');
  const [error, setError] = useState('');
  const { loading: deleteLoading, error: deleteError, postTodoData, response: postResponse } = usePostTodo(); // Use the delete hook

  useEffect(() => {
    console.log(postResponse ,'postResponse');
    setTodos([...todos, postResponse])
    setTask('')
    setError('')
  }, [postResponse])
  
  const handleAddTodo = async () => {
    if (!task) {
      setError('task is required')
    }else{
      postTodoData(task)
    }
   
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleAddTodo();
    }
  };

  return (
    <div className="todo-form">
      <input
        placeholder="Enter new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      {
        error &&<span style={{color:'red'}}>{error}</span>
      }
      <button type="button" onClick={handleAddTodo}>
        Add task
      </button>
    </div>
  );
};
