import classes from "./TodoButton.module.css";

interface TodoButtonProps {
	text: string;
	props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
	customStyles?: string;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const TodoButton: React.FC<TodoButtonProps> = ({
	onClick,
	customStyles,
	text,
	...props
}) => {
	return (
		<button
			className={`${classes.btn} ${customStyles ? customStyles : ""}`}
			onClick={onClick}
			{...props}
		>
			{text}
		</button>
	);
};
export { TodoButton };
