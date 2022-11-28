const Task = ({ id, text }) => {
	return (
		<>
			<li style={{ textAlign: "center" }}>
				{id} {text}
			</li>
		</>
	);
};
export default Task;
