import { useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskList from "./TaskList";
import "./App.css";

const taskReducer = (tasks, action) => {
	switch (action.type) {
		case "ADD_TASK":
			return action.text
				? [...tasks, { id: action.id, text: action.text }]
				: tasks;
	}
};

const App = () => {
	const [tasks, dispatch] = useReducer(taskReducer, []);
	const [name, setName] = useState("");
	return (
		<>
			<input
				required
				onChange={(e) => {
					setName(e.target.value);
				}}
				value={name}
			></input>
			<button
				onClick={() => {
					dispatch({ type: "ADD_TASK", id: uuidv4(), text: name });
					setName("");
				}}
				type="reset"
			>
				Add task
			</button>
			<TaskList tasks={tasks} />
		</>
	);
};

export default App;
