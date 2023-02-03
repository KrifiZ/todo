import React, { useState } from "react";
import { ApplyData } from "../@types/HttpRequest";
import { useHttp } from "./useHttp";

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
	const postTodo = useHttp();

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

	const handleSubmit = async (
		e: React.ChangeEvent<HTMLFormElement>,
		callback: ApplyData
	) => {
		e.preventDefault();
		const { name } = e.target as HTMLFormElement;
		const { title: isTitleValid, description: isDescriptionValid } = valid;
		const {
			title: titleValue,
			description: descriptionValue,
			section: sectionValue,
		} = values;
		setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
		try {
			if (isTitleValid && isDescriptionValid) {
				await postTodo.sendRequest(
					{
						url: "http://localhost:5000/api/v1/todos",
						method: "POST",
						headers: {
							"Content-type": "application/json",
						},
						data: {
							title: titleValue,
							description: descriptionValue,
							priority: sectionValue,
						},
					},
					callback
				);
			}
		} catch (error) {
			console.error(error);
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

export { useForm };
