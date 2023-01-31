import { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import { ITodo } from "../../@types/Todo";
import { useForm } from "../../hooks/useForm";
import { useHttp } from "../../hooks/useHttp";
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
	const [sectionValue, setSection] = useState<"low" | "medium" | "high">(
		"medium"
	);

	const form = useForm({
		values: { title: "", description: "" },
		isTouched: {
			title: false,
			description: false,
		},
		isValid: {
			title: false,
			description: false,
		},
	});

	const [titleValue, setTitle] = useState("");
	const [descriptionValue, setDescription] = useState("");
	const [isTitleValid, setIsTitleValid] = useState(false);
	const [isDescriptionValid, setIsDescriptionValid] = useState(false);
	const postTodo = useHttp();

	const createTodo = () => {
		const todo: ITodo = {
			title: titleValue,
			description: descriptionValue,
			priority: sectionValue,
		};

		props.onCreate(todo);
		props.onHide();
	};

	const submitForm = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			if (isTitleValid && isDescriptionValid) {
				await postTodo.sendRequest(
					{
						url: "http://localhost:5000/api/v1/todos",
						method: "POST",
						headers: {
							"Content-type": "application/json",
						},
						data: {
							title: titleValue,
							description: descriptionValue,
							priority: sectionValue,
						},
					},
					createTodo
				);
			}
		} catch (error: unknown) {
			console.log(error);
		}
	};

	return (
		<Modal onHide={props.onHide}>
			<form onSubmit={submitForm} className={classes.form}>
				<h2 className={classes.header}>Create Todo</h2>
				<label htmlFor="title" className={classes.label}>
					title
				</label>
				<Input
					textLength={titleValue.length}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						setTitle(e.target.value);
					}}
					onValidate={setIsTitleValid}
				/>
				<label className={classes.label}>priority</label>
				<Select
					options={[
						{ text: "low", value: "low" },
						{ text: "medium", value: "medium" },
						{ text: "high", value: "high" },
					]}
					value={sectionValue}
					onChange={(e: ChangeEvent<HTMLSelectElement>) => {
						setSection(e.target.value as "low" | "medium" | "high");
					}}
				/>
				<label className={classes.label}>description</label>
				<TextArea
					onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
						setDescription(e.target.value);
					}}
					textLength={descriptionValue.length}
					onValidate={setIsDescriptionValid}
				/>
				<button type="submit" className={classes.createTodo}>
					Create
				</button>
			</form>
		</Modal>
	);
};

export { TodoForm };
