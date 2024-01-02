import express from "express";
import { createTodoValidation } from "../utils/validation.js";
import { createTodo, deleteTodo, getAllTodos, toggleTodo } from "../controllers/todoController.js";

const router = express.Router();

router.get("/", getAllTodos);
router.post("/", createTodoValidation, createTodo);
router.delete('/:id', deleteTodo);
router.put('/:id', toggleTodo);

export default router;
