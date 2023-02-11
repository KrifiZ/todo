interface ITodo {
	title: string;
	description: string;
	priority: "low" | "medium" | "high";
	status: "in-progress" | "completed";
}

export { ITodo };
