import classes from "./Select.module.css";

interface SelectProps {
	options: { value: string; text: string }[];
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	value: string;
}

const Select = (props: SelectProps) => {
	const { options, value, onChange } = props;
	return (
		<select className={classes.priority} value={value} onChange={onChange}>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.text}
				</option>
			))}
		</select>
	);
};

export { Select };
