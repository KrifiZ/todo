import React, { useState } from "react";
import classes from "./TextArea.module.css";

interface TextAreaProps {
	textLength: number;
	name: string;
	errorMessage: string;
	isValid: boolean;
	isTouch: boolean;
	formTouch: boolean;
	focused: boolean;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	validationHandler: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
	onFocus: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = (props) => {
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
		<div className={classes.textAreaContainer}>
			<textarea
				name="description"
				maxLength={250}
				onBlur={validationHandler}
				onChange={onChange}
				onFocus={onFocus}
				className={`${classes.description} ${
					isInvalid ? classes["description-invalid"] : ""
				}`}
			></textarea>
			<div className={`${classes.counter} ${isInvalid ? classes.error : ""}`}>
				{textLength}/ 250
			</div>
			<label className={classes.error}>{isInvalid ? errorMessage : ""}</label>
		</div>
	);
};

export { TextArea };
