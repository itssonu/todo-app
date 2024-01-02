import Todo from "../models/Todo.js";
import apiResponse from "../utils/apiResponse.js";

export const getAllTodos = async (req, res) => {
  try {
    console.log("ssssssss");
    const todos = await Todo.find();
    const completedTodosCount = await Todo.countDocuments({ completed: true });

    return apiResponse({
      statusCode: 200,
      data: {todos, completedTodosCount},
      message: "Retrieved all todos successfully",
    })(res);
  } catch (error) {
    return apiResponse({
      statusCode: 400,
      data: [],
      message: error.message,
    })(res);
  }
};

export const createTodo = async (req, res) => {
  const { task } = req.body;
  console.log(task);
  try {
    const newTodo = new Todo({ task });
    const savedTodo = await newTodo.save();
    console.log(savedTodo);
    return apiResponse({
      statusCode: 200,
      data: savedTodo,
      message: "Todo created successfully",
    })(res);
  } catch (error) {
    return apiResponse({
      statusCode: 400,
      data: [],
      message: error.message,
    })(res);
  }
};

export const toggleTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return apiResponse({
        statusCode: 404,
        data: [],
        message: "Todo not found",
      })(res);
    }

    // Toggle the 'completed' field
    todo.completed = !todo.completed;
    const updatedTodo = await todo.save();

    return apiResponse({
      statusCode: 200,
      data: updatedTodo,
      message: "Todo updated successfully",
    })(res);
  } catch (error) {
    return apiResponse({
      statusCode: 400,
      data: [],
      message: error.message,
    })(res);
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
console.log(id);
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return apiResponse({
        statusCode: 404,
        data: [],
        message: "Todo not found",
      })(res);
    }
    return apiResponse({
      statusCode: 200,
      data: deleteTodo,
      message: "Todo deleted successfully",
    })(res);
  } catch (error) {
    return apiResponse({
      statusCode: 500,
      data: [],
      message: error.message,
    })(res);
  }
};
