import React, { useState } from "react";
import { ApplyData } from "../@types/HttpRequest";
import { ITodo } from "../@types/Todo";
import { useHttp } from "./useHttp";
import { useTodoActions } from "./useTodoActions";

interface FormValues {
	values: Record<string, string>;
	isTouched: Record<string, boolean>;
	isValid: Record<string, boolean>;
}

interface FormProps {
	title: string | boolean;
	description: string | boolean;
	section: "low" | "medium" | "high";
}

const useForm = (initialValues: FormValues) => {
	const [focusedInput, setFocusedInput] = useState<string | null>(null);
	const [values, setValues] = useState(initialValues.values);
	const [touch, setTouched] = useState(initialValues.isTouched);
	const [valid, setValid] = useState(initialValues.isValid);

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

	// const handleSubmit = (
	// 	e: React.FormEvent<HTMLFormElement>,
	// 	todo,
	// 	onHide,
	// 	updateTodo,
	// 	addTodo
	// ) => {
	// 	e.preventDefault();
	// 	const { name } = e.currentTarget;
	// 	setTouched((prevTouched) => ({ ...prevTouched, ["formm"]: true }));
	// 	if (valid.title && valid.description) {
	// 		if (todo) {
	// 			const newTodo: ITodo = {
	// 				_id: todo._id,
	// 				title: values.title,
	// 				priority: values.select as "low" | "medium" | "high",
	// 				description: values.description,
	// 			};
	// 			updateTodo(todo._id, newTodo);
	// 		} else {
	// 			const { title, description, select: priority } = values;
	// 			addTodo({
	// 				title: title,
	// 				description: description,
	// 				priority: priority as "low" | "medium" | "high",
	// 			});
	// 		}
	// 		onHide();
	// 	}
	// };

	return {
		values,
		handleChange,
		handleValidation,
		// handleSubmit,
		handleFocus,
		setTouched,
		touch,
		valid,
		focusedInput,
	};
};

export { useForm };
