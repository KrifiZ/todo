import { useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { ITodo } from "./@types/Todo";
import { TodoForm } from "./components/TodoForm/TodoForm";
import { Todos } from "./components/Todos/Todos";
import { Todo } from "./components/Todo/Todo";

function App() {
	const [createTodoModal, setTodoModal] = useState(false);
	const [todos, setTodos] = useState<ITodo[]>([
		{ title: "cipka", description: "dupa", priority: "high" },
		{ title: "cipka", description: "dupa", priority: "high" },
		{ title: "cipka", description: "dupa", priority: "high" },
		{ title: "cipka", description: "dupa", priority: "high" },
		{ title: "cipka", description: "dupa", priority: "high" },
		{ title: "cipka", description: "dupa", priority: "high" },
		{ title: "cipka", description: "dupa", priority: "high" },
		{ title: "cipka", description: "dupa", priority: "high" },
		{ title: "cipka", description: "dupa", priority: "high" },
		{ title: "cipka", description: "dupa", priority: "high" },
		{ title: "cipka", description: "dupa", priority: "high" },
		{ title: "cipka", description: "dupa", priority: "high" },
		{ title: "cipka", description: "dupa", priority: "high" },
		{ title: "cipka", description: "dupa", priority: "high" },
	]);

	const todoModalHandler = () => {
		setTodoModal((prevState) => !prevState);
	};

	return (
		<div className="App">
			{createTodoModal && <TodoForm onHide={todoModalHandler} />}
			<Navbar onClick={todoModalHandler} />
			<Todos>
				{todos.map((todo, index) => (
					<Todo key={index} todo={todo} />
				))}
			</Todos>
		</div>
	);
}

export default App;
