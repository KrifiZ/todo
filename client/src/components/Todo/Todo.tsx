import { ITodo } from "../../@types/Todo";
import classes from "./Todo.module.css";

const Todo: React.FC<{ todo: ITodo }> = ({ todo }) => {
	return (
		<div className={classes.backdrop}>
			<h2 className={classes.title}>{todo.title}</h2>
			<hr className={classes.line} />
			<label htmlFor={classes.description} className={classes.label}>
				description&nbsp;
			</label>
			<p className={classes.description}>{todo.description}</p>
			<label htmlFor={classes.priority} className={classes.label}>
				priority&nbsp;
			</label>
			<p className={`${classes[todo.priority]} ${classes.priority}`}>
				{todo.priority}
			</p>
		</div>
	);
};

export { Todo };
