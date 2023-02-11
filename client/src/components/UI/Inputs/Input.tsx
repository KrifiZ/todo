import React, { useState } from "react";
import classes from "./Input.module.css";

interface InputProps {
	textLength: number;
	name: string;
	value: string;
	errorMessage: string;
	isValid: boolean;
	isTouch: boolean;
	formTouch: boolean;
	focused: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	validationHandler: (event: React.FocusEvent<HTMLInputElement>) => void;
	onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = (props) => {
	const {
		onChange,
		textLength,
		validationHandler,
		onFocus,
		errorMessage,
		isValid,
		isTouch,
		formTouch,
		focused,
	} = props;

	const isInvalid = (formTouch || isTouch) && !isValid && !focused;

	return (
		<div className={classes.container}>
			<input
				name="title"
				type="text"
				value={props.value}
				maxLength={18}
				onChange={onChange}
				onBlur={validationHandler}
				onFocus={onFocus}
				className={`${classes.title} ${
					isInvalid ? classes["title-invalid"] : ""
				}`}
			></input>
			<div className={`${classes.counter} ${isInvalid ? classes.error : ""}`}>
				{textLength}/ 18
			</div>
			<label className={classes.error}>{isInvalid ? errorMessage : ""}</label>
		</div>
	);
};

export { Input };
