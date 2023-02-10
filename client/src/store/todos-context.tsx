import React from "react";
import { createContext, PropsWithChildren, useState } from "react";
import { ITodo } from "../@types/Todo";
import { useTodoActions } from "../hooks/useTodoActions";

export interface AddTodo {
	id?: string;
	title: string;
	description: string;
	priority: string;
}

interface TodosContextProps {
	items: ITodo[];
	todoModal: boolean;
	setTodoModal: () => void;
	addTodo: (todo: AddTodo) => void;
	deleteTodo: (id: string) => void;
	updateTodo: (id: string, todo: ITodo) => void;
	setTodos: (todos: ITodo[]) => void;
}

const TodosContext = createContext<TodosContextProps>({
	items: [],
	todoModal: false,
	addTodo: (todo: AddTodo) => {},
	deleteTodo: (id: string) => {},
	updateTodo: (id: string, todo: ITodo) => {},
	setTodos: (todos: ITodo[]) => {},
	setTodoModal: () => {},
});

const TodosContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [todos, setTodos] = useState<ITodo[]>([]);
	const [todoModal, setTodoModal] = useState<boolean>(false);
	const { addTodo, deleteTodo, updateTodo, getTodos } = useTodoActions();

	const todoModalHandler = () => {
		setTodoModal((prevState) => !prevState);
	};

	React.useEffect(() => {
		getTodos((data) => {
			setTodos(data as ITodo[]);
		});
	}, []);

	const addTodoHandler = (todo: AddTodo) => {
		addTodo(todo, (task: unknown) => {
			setTodos((prevState) => [...prevState, task as ITodo]);
		});
	};

	const updateTodoHandler = (id: string, todo: ITodo) => {
		updateTodo(id, todo, () => {
			setTodos((prevState) =>
				prevState.map((prevTodo) => {
					if (prevTodo._id === id) {
						return {
							...prevTodo,
							description: todo.description,
							priority: todo.priority,
							title: todo.title,
							status: todo.status,
						};
					}
					return prevTodo;
				})
			);
		});
	};

	const deleteTodoHandler = (id: string) => {
		deleteTodo(id, () => {
			setTodos((prevState) => prevState.filter((todo) => todo._id !== id));
		});
	};

	return (
		<TodosContext.Provider
			value={{
				items: todos,
				addTodo: addTodoHandler,
				deleteTodo: deleteTodoHandler,
				updateTodo: updateTodoHandler,
				setTodos: setTodos,
				todoModal: todoModal,
				setTodoModal: todoModalHandler,
			}}
		>
			{children}
		</TodosContext.Provider>
	);
};

export { TodosContext, TodosContextProvider };
