import { SetStateAction, useEffect, useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { ITodo } from "./@types/Todo";
import { TodoForm } from "./components/TodoForm/TodoForm";
import { Todos } from "./components/Todos/Todos";
import { Todo } from "./components/Todo/Todo";
import { useHttp } from "./hooks/useHttp";
import { ResponseData } from "./@types/HttpRequest";
import { AxiosError } from "axios";
function App() {
	const [createTodoModal, setTodoModal] = useState(false);
	const [todos, setTodos] = useState<ITodo[]>([]);
	const getTodos = useHttp();

	useEffect(() => {
		getTodos.sendRequest(
			{
				url: "http://localhost:5000/api/v1/todos",
				method: "GET",
			},
			(data: ResponseData) => {
				const todos = data as ITodo[];
				setTodos(todos);
			}
		);
	}, []);

	const todoModalHandler = () => {
		setTodoModal((prevState) => !prevState);
	};

	const createTodoHandler = (todo: ITodo) => {
		setTodos((prevState) => [...prevState, todo]);
	};

	return (
		<div className="App">
			{createTodoModal && (
				<TodoForm onHide={todoModalHandler} onCreate={createTodoHandler} />
			)}
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
