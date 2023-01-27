interface BasicProps {
	children?: React.ReactNode;
	onClick: () => void;
}

interface ITodo {
	title: string;
	priority: "low" | "medium" | "high";
	description: string;
}

export type { BasicProps, ITodo };
