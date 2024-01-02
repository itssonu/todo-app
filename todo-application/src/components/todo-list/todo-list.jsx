import {useContext, useEffect, useState} from 'react';
import { Checkbox } from '../checkbox';
import todoApiContext from '../../contexts/todoApiContext';
import { useTodos, useDeleteTodo, useToggleTodo } from '../../hooks/todos';
import './todo-list.scss';

export const TodoList = () => {
  const { todos, setTodos, setCompletedCount } = useContext(todoApiContext);
  const { todoList, error, fetchTodos, completedCount } = useTodos();
  const { loading: deleteLoading, error: deleteError, deleteTodo, response: deleteResponse } = useDeleteTodo();
  const { loading: toggleLoading, error: toggleError, toggleTodo, response: toggleResponse } = useToggleTodo();
  const [deleteIndex, setDeleteIndex] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  useEffect(() => {
    setTodos(todoList)
    setCompletedCount(completedCount)
  }, [todoList])

  useEffect(() => {
    fetchTodos()
  }, [deleteResponse])

  useEffect(() => {
    fetchTodos()
  }, [toggleResponse])
  

  const handleDelete = async (id) => {
    deleteTodo(id)
  };

  const toggleCheck = async (id) => {
    toggleTodo(id)
  };

  const handleKeyUp = (e, id, index) => {
    if (e.keyCode === 13) {
      toggleCheck(index);
    }
  };

  return (
    <div className="todo-list">
      <span className="todo-list-title">Todo List:</span>
      {todos.length ? (
        <div className="todo-list-content">
          {todos.map((todoItem) => (
            <Checkbox
              key={todoItem._id}
              label={todoItem.task}
              checked={todoItem.completed}
              onClick={() => toggleCheck(todoItem._id)}
              onKeyUp={(e) => handleKeyUp(e, todoItem._id)}
              onDelete={() => handleDelete(todoItem._id)}
            />
          ))}
        </div>
      ) : (
        <div className="no-todos">
          Looks like you&apos;re absolutely free today!
        </div>
      )}
    </div>
  );
};
