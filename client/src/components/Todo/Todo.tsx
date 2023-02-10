import { ITodo } from "../../@types/Todo";
import { TodoButton } from "../UI/Buttons/TodoButton";
import classes from "./Todo.module.css";
interface TodoProps {
	todo: ITodo;
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, onDelete, onEdit }) => {
	const stroke = todo.status === "completed" ? classes.completed : " ";
	return (
		<div className={`${classes.backdrop}`}>
			<h2 className={`${classes.title} ${stroke}`}>{todo.title}</h2>
			<hr className={`${classes.line} ${stroke}`} />
			<label
				htmlFor={classes.description}
				className={`${classes.label} ${stroke}`}
			>
				description&nbsp;
			</label>
			<p className={`${classes.description} ${stroke}`}>{todo.description}</p>
			<label
				htmlFor={classes.priority}
				className={`${classes.label} ${stroke}`}
			>
				priority&nbsp;
			</label>
			<p className={`${classes[todo.priority]} ${classes.priority} ${stroke}`}>
				{todo.priority}
			</p>
			<TodoButton
				customStyles={classes.edit}
				onClick={(e) => onEdit(todo._id)}
				text="EDIT"
			/>
			<TodoButton
				customStyles={classes.delete}
				onClick={(e) => onDelete(todo._id)}
				text="DELETE"
			/>
		</div>
	);
};

export { Todo };
