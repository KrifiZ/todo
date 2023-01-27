import { useReducer } from "react";
import { Modal } from "../UI/Modal";
import classes from "./TodoForm.module.css";

interface Action {
	type: string;
	payload?: string;
}

interface State {
	title: { text: string; isValid: boolean };
	priority: string;
	description: { text: string; isValid: boolean };
}

const initialValue = {
	title: { text: "title", isValid: false },
	priority: "medium",
	description: { text: "title", isValid: false },
};

const textLimitHandler = (text: string, limit: number) => {
	return text.length <= limit;
};

const reducer = (state: State, action: Action) => {
	switch (action.type) {
		case "updateTitle":
			return {
				...state,
				title: { text: action.payload!, isValid: state.title.text.length < 18 },
			};
		case "updatePriority":
			return { ...state, priority: action.payload! };
		case "updateDescription":
			return {
				...state,
				description: {
					text: action.payload!,
					isValid: state.description.text.length <= 250,
				},
			};
		case "submitForm":
			console.log(state);
			return state;
		default:
			return state;
	}
};

const TodoForm: React.FC<{ onHide: () => void }> = (props) => {
	const [todo, setTodo] = useReducer(reducer, initialValue);

	return (
		<Modal onHide={props.onHide}>
			<h2 className={classes.header}>Create Todo</h2>
			<label htmlFor="title" className={classes.label}>
				title
			</label>
			<input
				onChange={(event) => {
					if (!textLimitHandler(event.target.value, 18)) {
						event.preventDefault();
						return;
					}

					setTodo({ type: "updateTitle", payload: event.target.value });
				}}
				className={classes.title}
			></input>
			<label className={classes.label}>priority</label>
			<select
				value={todo.priority}
				className={classes.priority}
				onChange={(event) =>
					setTodo({ type: "updatePriority", payload: event.target.value })
				}
			>
				<option>high</option>
				<option>medium</option>
				<option>low</option>
			</select>
			<label className={classes.label}>description</label>
			<div className={classes.textAreaContainer}>
				<textarea
					className={classes.description}
					onChange={(event) => {
						if (!textLimitHandler(event.target.value, 250)) {
							event.preventDefault();
							return;
						}

						setTodo({ type: "updateDescription", payload: event.target.value });
					}}
				></textarea>
				<div className={classes.counter}>
					{todo.description.text.length}/ 250
				</div>
			</div>
			<button
				onClick={() => setTodo({ type: "submitForm" })}
				className={classes.createTodo}
			>
				Create
			</button>
		</Modal>
	);
};

export { TodoForm };
