import Task from "./Task.jsx";
const TaskList = ({ tasks }) => {
	return (
		<>
			<ul>
				{tasks.map((task) => (
					<Task key={task.id} id={task.id} text={task.text} />
				))}
			</ul>
		</>
	);
};
export default TaskList;
