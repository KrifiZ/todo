import mongoose from "mongoose";
import { ITodo } from "../@types/todo";

const TodoSchema = new mongoose.Schema<ITodo>({
	title: {
		type: String,
		required: [true, "Please provide title"],
	},
	description: {
		type: String,
		required: [true, "Please provide description"],
	},
	priority: {
		type: String,
		enum: ["low", "medium", "high"],
		default: "medium",
	},
});

const Todo = mongoose.model<ITodo>("Todo", TodoSchema);
export { Todo };
