import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Todo } from "./components/Todo/Todo";
import { Todos } from "./components/Todos/Todos";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Todos>
				<Todo />
				<Todo />
				<Todo />
			</Todos>
		</div>
	);
}

export default App;
