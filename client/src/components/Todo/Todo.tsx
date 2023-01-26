import classes from "./Todo.module.css";

const Todo = () => {
	return (
		<div className={classes.backdrop}>
			<h2 className={classes.title}>Title</h2>
			<hr className={classes.line} />
			<label htmlFor={classes.description} className={classes.label}>
				description&nbsp;
			</label>
			<p className={classes.description}>
				Aut tempore quisquam expedita id. Omnis necessitatibus recusandae in aut
				est. Asperiores at ducimus rerum et sint aut vitae. Quis doloremque sed
				omnis qui sit. Voluptas id ab doloribus atque et. Voluptatem quos
			</p>
			<label htmlFor={classes.priority} className={classes.label}>
				priority&nbsp;
			</label>
			<p className={classes.priority}>medium</p>
		</div>
	);
};

export { Todo };
