import { Request, Response } from "express";
import { Todo } from "../models/Todo";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../erros/bad-request";

const getAllTodos = async (req: Request, res: Response) => {
	const todos = await Todo.find({});
	res.status(StatusCodes.OK).json(todos);
};

const getTodo = async (req: Request, res: Response) => {
	const { id: todoId } = req.params;
	const todo = await Todo.find({ _id: todoId });

	if (!todo) {
		throw new BadRequestError(`No task with id: ${todoId}`);
	}

	res.status(StatusCodes.OK).json(todo);
};

const addTodo = async (req: Request, res: Response) => {
	const todo = await Todo.create(req.body);
	res.status(StatusCodes.CREATED).json(todo);
};

const updateTodo = async (req: Request, res: Response) => {
	const { id: todoId } = req.params;
	const todo = await Todo.findOneAndUpdate({ _id: todoId }, req.body);

	if (!todo) {
		throw new BadRequestError(`No task with id: ${todoId}`);
	}

	res
		.status(StatusCodes.OK)
		.json({ msg: `Successfully updated todo with id: ${todoId}` });
};

const deleteTodo = async (req: Request, res: Response) => {
	const { id: todoId } = req.params;
	const todo = await Todo.deleteOne({ _id: todoId });

	if (!todo) {
		throw new BadRequestError(`No task with id: ${todoId}`);
	}

	res
		.status(StatusCodes.OK)
		.json({ msg: `Successfully deleted todo with id: ${todoId}` });
};

export { getAllTodos, getTodo, addTodo, updateTodo, deleteTodo };
