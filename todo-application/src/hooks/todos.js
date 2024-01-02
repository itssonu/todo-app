import { useState, useEffect, useContext } from 'react';
import todoService from '../services/todoService';
import TodoApiContext from '../contexts/todoApiContext';

function useTodos(params) {
  const {  setTodos, todos, setCompletedCount } = useContext(TodoApiContext);

  // const [todoList, setTodoList] = useState([]);
  const [response, setResponse] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleResponse = (response) => {
    if (response.data.success) {
      setResponse(response.data);
      setLoading(false);
      setError(null)
      params && params.onSuccess?.(response.data);
      return true
      
    } else {
      setError({
        message: response.data.message || 'Unknown error',
        statusCode: response.data.statusCode || null,
        errorDetails: response.data.error || [],
      });
      setLoading(false);
      params && params.onError?.(response.data);
      return false
    }
    
  };

  const handleErrorResponse = (error) => {
    console.log(error.response.data.message);
    setError({
      message: error.response.data.message || 'Unknown error',
      statusCode: error.response.data.statusCode || null,
      errorDetails: error.response.data.error || [],
    });
    params && params.onError?.(error.response.data);
    setLoading(false);
    return false
  };

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await todoService.getTodos();
      const success = handleResponse(response);
      if (success) {
        setTodos(response.data.data.todos ?? []);
        setCompletedCount(response.data.data.completedTodosCount ?? 0);
      }
    } catch (error) {
      setError(error);
    }
  };

  const postTodoData = async (todoData) => {
    try {
      setLoading(true);
      const response = await todoService.insertTodo(todoData);
      const success = handleResponse(response);
      if (success) {
        setTodos([...todos, response.data.data]);
      }
      setLoading(false);
      return response;
    } catch (error) {
      handleErrorResponse(error)
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await todoService.deleteTodo(id);
      handleResponse(response);
      if (!error) {
        fetchTodos();
      }
      setLoading(false);
      return response.data; // Return response data upon successful deletion
    } catch (error) {
      setLoading(false);
      setError(error); // Set error state if there's an issue with the request
    }
  };

  const toggleTodo = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await todoService.toggleTodo(id);
      handleResponse(response);
      if (!error) {
        fetchTodos();
      }
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    error,
    fetchTodos,
    loading,
    response,
    postTodoData,
    deleteTodo,
    toggleTodo,
  };
}

// const usePostTodo = (params) => {
//   const [response, setResponse] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const postTodoData = async (todoData) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await todoService.insertTodo(todoData);
//       console.log('setting response', response);
//       setResponse(response.data.data)
//       setLoading(false);
//       return response;

//     } catch (error) {
//       setLoading(false);
//       setError(error); // Set error state if there's an issue with the request
//     }
//   };

//   return { response, loading, error, postTodoData };
// };

// const useDeleteTodo = (params) => {
//   const [response, setResponse] = useState();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const deleteTodo = async (id) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await todoService.deleteTodo(id);
//       setResponse('');
//       setResponse(response.data.message);
//       setLoading(false);
//       return response.data; // Return response data upon successful deletion
//     } catch (error) {
//       setLoading(false);
//       setError(error); // Set error state if there's an issue with the request
//     }
//   };

//   return { response, loading, error, deleteTodo };
// };

// const useToggleTodo = (params) => {
//   const [response, setResponse] = useState();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const toggleTodo = async (id) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await todoService.toggleTodo(id);
//       setResponse('');
//       setResponse(response.data.message);
//       setLoading(false);
//       return response.data;
//     } catch (error) {
//       setLoading(false);
//       setError(error);
//     }
//   };

//   return { response, loading, error, toggleTodo };
// };

export { useTodos };
