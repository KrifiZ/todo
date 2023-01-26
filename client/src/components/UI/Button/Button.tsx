import { PropsWithChildren } from "react";
import classes from "./Button.module.css";

const Button: React.FC<PropsWithChildren> = (props) => {
	return <button className={classes.btn}>{props.children}</button>;
};

export { Button };
