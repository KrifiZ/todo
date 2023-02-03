import React from "react";
import { ITodo } from "../../@types/Todo";
import { useForm } from "../../hooks/useForm";
import { Input } from "../UI/Input";
import { Modal } from "../UI/Modal";
import { Select } from "../UI/Select";
import { TextArea } from "../UI/TextArea";
import classes from "./TodoForm.module.css";

interface TodoFormProps {
	onHide: () => void;
	onCreate: (todos: ITodo) => void;
}

const TodoForm: React.FC<TodoFormProps> = (props) => {
	const form = useForm({
		values: { title: "", description: "", select: "medium" },
		isTouched: {
			title: false,
			description: false,
			formm: false,
		},
		isValid: {
			title: false,
			description: false,
		},
	});

	const createTodo = () => {
		const { title, description, select } = form.values;

		const todo: ITodo = {
			title: title,
			description: description,
			priority: select as "low" | "medium" | "high",
		};

		props.onCreate(todo);
		props.onHide();
	};

	return (
		<Modal onHide={props.onHide}>
			<form
				name="formm"
				onSubmit={(event: React.ChangeEvent<HTMLFormElement>) => {
					form.handleSubmit(event, createTodo);
				}}
				className={classes.form}
			>
				<h2 className={classes.header}>Create Todo</h2>
				<label htmlFor="title" className={classes.label}>
					title
				</label>
				<Input
					name="title"
					errorMessage="Title is required"
					textLength={form.values.title.length}
					onChange={form.handleChange}
					onFocus={form.handleFocus}
					isValid={form.valid.title}
					isTouch={form.touch.title}
					formTouch={form.touch.formm}
					focused={form.focusedInput === "title"}
					validationHandler={form.handleValidation}
				/>
				<label className={classes.label}>priority</label>
				<Select
					options={[
						{ text: "low", value: "low" },
						{ text: "medium", value: "medium" },
						{ text: "high", value: "high" },
					]}
					value={form.values.select}
					onChange={form.handleChange}
				/>
				<label className={classes.label}>description</label>
				<TextArea
					name="description"
					errorMessage="Description is required"
					textLength={form.values.description.length}
					onChange={form.handleChange}
					onFocus={form.handleFocus}
					isValid={form.valid.description}
					isTouch={form.touch.description}
					formTouch={form.touch.formm}
					focused={form.focusedInput === "description"}
					validationHandler={form.handleValidation}
				/>
				<button type="submit" className={classes.createTodo}>
					Create
				</button>
			</form>
		</Modal>
	);
};

export { TodoForm };
