import React, { useContext } from "react";
import { TodosContext } from "../../store/todos-context";
import { ITodo } from "../../@types/Todo";
import { useForm } from "../../hooks/useForm";
import { Input } from "../UI/Inputs/Input";
import { Modal } from "../UI/Modals/Modal";
import { Select } from "../UI/Selects/Select";
import { TextArea } from "../UI/TextAreas/TextArea";
import classes from "./TodoForm.module.css";

interface TodoFormProps {
	name: string;
	title: string;
	submitText: string;
	todo?: ITodo;
	onHide: () => void;
}

const TodoForm: React.FC<TodoFormProps> = (props) => {
	const { addTodo, updateTodo } = useContext(TodosContext);
	const form = useForm(
		{
			values: {
				title: props.todo?.title || "",
				description: props.todo?.description || "",
				priority: props.todo?.priority || "medium",
			},
			touch: {
				title: false,
				description: false,
				formm: false,
			},
			valid: {
				title: props.todo ? true : false,
				description: props.todo ? true : false,
			},
		},
		addTodo,
		updateTodo,
		props.onHide
	);

	return (
		<Modal onHide={props.onHide}>
			<form
				name={props.name}
				onSubmit={(event: any) => form.handleSubmit(event, props.todo?._id)}
				className={classes.form}
			>
				<h2 className={classes.header}>{props.title}</h2>
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
					value={form.values.title}
					formTouch={form.touch.form}
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
					formTouch={form.touch.form}
					focused={form.focusedInput === "description"}
					value={form.values.description}
					validationHandler={form.handleValidation}
				/>
				<button type="submit" className={classes.createTodo}>
					{props.submitText}
				</button>
			</form>
		</Modal>
	);
};

export { TodoForm };
