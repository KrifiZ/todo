import { Request, Response } from "express";
import { Todo } from "../models/Todo";
import { StatusCodes } from "http-status-codes";

const addTodo = async (req: Request, res: Response) => {
	const todo = await Todo.create(req.body);
	res.status(StatusCodes.CREATED).json(todo);
};

export { addTodo };
