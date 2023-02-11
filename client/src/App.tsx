import { Navbar } from "./components/Navbar/Navbar";
import { TodoForm } from "./components/TodoForm/TodoForm";
import { Todos } from "./components/Todos/Todos";
import { TodosContext, TodosContextProvider } from "./store/todos-context";
import { useContext, useState } from "react";

function App() {
	const [createTodoModal, setCreateTodoModal] = useState(false);

	const todoModalHandler = () => {
		setCreateTodoModal((prevState) => !prevState);
	};

	return (
		<TodosContextProvider>
			<div className="App">
				{createTodoModal && (
					<TodoForm
						name="addTodo"
						title="Create Todo"
						submitText="Create Todo"
						onHide={todoModalHandler}
					/>
				)}
				<Navbar onClick={todoModalHandler} />
				<Todos />
			</div>
		</TodosContextProvider>
	);
}

export default App;
