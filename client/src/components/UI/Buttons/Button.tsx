import { BasicProps } from "../../../@types/Todo";
import classes from "./Button.module.css";

const Button: React.FC<BasicProps> = (props) => {
	return (
		<button onClick={props.onClick} className={classes.btn}>
			{props.children}
		</button>
	);
};

export { Button };
