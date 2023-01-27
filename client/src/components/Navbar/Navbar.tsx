import { Button } from "../UI/Button";
import classes from "./Navbar.module.css";
import { BasicProps } from "../../@types/Todo";

const Navbar: React.FC<BasicProps> = (props) => {
	return (
		<nav className={classes.nav}>
			<h1 className={classes.logo}>TODO</h1>
			<Button onClick={props.onClick}>Create Todo</Button>
		</nav>
	);
};

export { Navbar };
