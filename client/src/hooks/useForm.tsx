import React, { useState } from "react";
import { ITodo } from "../@types/Todo";

interface FormValues {
	values: Record<string, string>;
	touch: Record<string, boolean>;
	valid: Record<string, boolean>;
}

interface FormProps {
	title: string;
	description: string;
	priority: "low" | "medium" | "high";
	status: string;
}

interface UseForm {
	values: FormValues["values"];
	touch: FormValues["touch"];
	valid: FormValues["valid"];
	focusedInput: string | null;
	handleChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => void;
	handleValidation: (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>, id?: string) => void;
	handleFocus: (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
}

export const useForm = (
	initialValues: FormValues,
	addTodo: (todo: FormProps) => void,
	updateTodo: (id: string, data: ITodo) => void,
	onHide: () => void
): UseForm => {
	const [focusedInput, setFocusedInput] = useState<string | null>(null);
	const [values, setValues] = useState(initialValues.values);
	const [touch, setTouched] = useState(initialValues.touch);
	const [valid, setValid] = useState(initialValues.valid);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const handleValidation = (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
		setFocusedInput(null);
		if (value.trim().length > 0) {
			setValid((prevValid) => ({ ...prevValid, [name]: true }));
		} else {
			setValid((prevValid) => ({ ...prevValid, [name]: false }));
		}
	};

	const handleFocus = (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name } = e.target;
		setFocusedInput(name);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>, id?: string) => {
		e.preventDefault();
		if (Object.values(valid).every((value) => value)) {
			const formData: FormProps = {
				title: values.title,
				description: values.description,
				priority: values.priority as "low" | "medium" | "high",
				status: values.status,
			};
			// if (id) {
			// 	updateTodo(id, { ...formData, _id: id });
			// } else {
			// 	addTodo(formData);
			// }
			onHide();
		} else {
			setTouched(
				Object.keys(values).reduce(
					(acc, key) => ({ ...acc, [key]: true }),
					initialValues.touch
				)
			);
		}
	};

	return {
		values,
		handleChange,
		handleValidation,
		handleSubmit,
		handleFocus,
		touch,
		valid,
		focusedInput,
	};
};
