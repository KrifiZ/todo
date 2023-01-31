import React, { useState } from "react";

interface FormValues {
	values: { [key: string]: string };
	isTouched: { [key: string]: boolean };
	isValid: { [key: string]: boolean };
}

const useForm = (initialValues: FormValues) => {
	const [values, setValues] = useState(initialValues.values);
	const [touch, setTouched] = useState(initialValues.isTouched);
	const [valid, setValid] = useState(initialValues.isValid);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const handleValidation = (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		if (value.trim().length > 0) {
			setValid({
				...(values as object),
				[name]: true,
			});
		} else {
			setValid({
				...(values as object),
				[name]: false,
			});
		}
	};

	const handleBlur = (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		if (value.trim().length > 0) {
			setTouched({
				...(values as object),
				[name]: true,
			});
		} else {
			setTouched({
				...(values as object),
				[name]: false,
			});
		}
	};

	return [values, handleChange, handleValidation, handleBlur, touch, valid];
};

export { useForm };
