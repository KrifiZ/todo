import { useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskList from "./TaskList";
import "./App.css";
import plus from "./images/plus.svg";

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
		<div className="todoList">
			<section className="inputSection">
				<input
					required
					className="taskInput"
					placeholder="What's your next task?"
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							dispatch({ type: "ADD_TASK", id: uuidv4(), text: name });
							setName("");
						}
					}}
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
				>
					<img src={plus} />
				</button>
			</section>
			<TaskList tasks={tasks} />
		</div>
	);
};

export default App;
