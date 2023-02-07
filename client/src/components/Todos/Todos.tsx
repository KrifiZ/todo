import { useContext, useState } from "react";
import { ITodo } from "../../@types/Todo";
import { TodosContext } from "../../store/todos-context";
import { Todo } from "../Todo/Todo";
import { TodoForm } from "../TodoForm/TodoForm";
import classes from "./Todos.module.css";

const Todos = () => {
	const todosCtx = useContext(TodosContext);
	const [isShowModal, setShowModal] = useState(false);
	const [currentTodo, setCurrentTodo] = useState<ITodo | null>(null);

	return (
		<div className={classes.container}>
			{isShowModal && (
				<TodoForm
					name="updateTodo"
					title="Update Todo"
					submitText="Update Todo"
					onHide={() => setShowModal(false)}
					todo={currentTodo as ITodo}
				/>
			)}
			{todosCtx.items.map((todo) => {
				return (
					<Todo
						onEdit={() => {
							setShowModal(true);
							setCurrentTodo(todo);
						}}
						onDelete={todosCtx.deleteTodo}
						key={todo._id}
						todo={todo}
					/>
				);
			})}
		</div>
	);
};

export { Todos };
