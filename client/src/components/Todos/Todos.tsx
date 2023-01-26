import { PropsWithChildren } from "react";
import classes from "./Todos.module.css";

const Todos: React.FC<PropsWithChildren> = (props) => {
	return <div className={classes.container}>{props.children}</div>;
};

export { Todos };
