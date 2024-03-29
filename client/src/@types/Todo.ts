interface BasicProps {
	children?: React.ReactNode;
	onClick: () => void;
}

interface ITodo {
	_id: string;
	title: string;
	priority: "low" | "medium" | "high";
	description: string;
	status: string;
}

export type { BasicProps, ITodo };
