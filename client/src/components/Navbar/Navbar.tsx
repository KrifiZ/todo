import { Button } from "../UI/Button/Button";
import classes from "./Navbar.module.css";

const Navbar = () => {
	return (
		<nav className={classes.nav}>
			<h1 className={classes.logo}>TODO</h1>
			<Button>Create Todo</Button>
		</nav>
	);
};

export { Navbar };
