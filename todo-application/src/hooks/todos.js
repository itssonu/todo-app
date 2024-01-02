import { useState, useEffect } from 'react';
import todoService from '../services/todoService';
import TodoApiContext from '../contexts/todoApiContext';
import * as React from 'react';

function useTodos(params) {
  const [todoList, setTodoList] = useState([]);
  const [completedCount, setcompletedCount] = useState([]);
  const [error, setError] = useState({});

  const fetchTodos = async () => {
    try {
      const response = await todoService.getTodos();
      console.log('sss', response.data);
      setTodoList(response.data?.data.todos ?? []);
      setcompletedCount(response.data?.data.completedTodosCount ?? 0);
      params && params.onSuccess?.(response.data);
    } catch (error) {
      setError(error);
      params && params.onError?.(error);
    }
  };

  return { todoList, error, fetchTodos, completedCount};
}

const usePostTodo = (params) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postTodoData = async (todoData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await todoService.insertTodo(todoData);
      console.log('setting response', response);
      setResponse(response.data.data)
      setLoading(false);
      return response;
      
    } catch (error) {
      setLoading(false);
      setError(error); // Set error state if there's an issue with the request
    }
  };

  return { response, loading, error, postTodoData };
};

const useDeleteTodo = (params) => {
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteTodo = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await todoService.deleteTodo(id);
      setResponse('');
      setResponse(response.data.message);
      setLoading(false);
      return response.data; // Return response data upon successful deletion
    } catch (error) {
      setLoading(false);
      setError(error); // Set error state if there's an issue with the request
    }
  };

  return { response, loading, error, deleteTodo };
};

const useToggleTodo = (params) => {
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleTodo = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await todoService.toggleTodo(id);
      setResponse('');
      setResponse(response.data.message);
      setLoading(false);
      return response.data; 
    } catch (error) {
      setLoading(false);
      setError(error); 
    }
  };

  return { response, loading, error, toggleTodo };
};

export { useTodos, usePostTodo, useToggleTodo, useDeleteTodo };
