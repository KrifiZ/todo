import express from "express";
import {
	getAllTodos,
	getTodo,
	addTodo,
	updateTodo,
	deleteTodo,
} from "../controllers/todos";

const router = express.Router();

router.route("/").get(getAllTodos).post(addTodo);
router.route("/:id").get(getTodo).patch(updateTodo).delete(deleteTodo);

export { router as todoRouter };
