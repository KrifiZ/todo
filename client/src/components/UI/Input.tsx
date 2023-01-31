import React, { useState } from "react";
import classes from "./Input.module.css";

interface InputProps {
	textLength: number;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onValidate: (isValid: boolean) => void;
}

const Input: React.FC<InputProps> = (props) => {
	const { onChange, textLength, onValidate } = props;
	const [errorMessage, setErrorMessage] = useState("");

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event);
	};

	const validationHandler = (event: React.FocusEvent<HTMLInputElement>) => {
		if (event.target.value.trim().length > 0) {
			onValidate(true);
		} else {
			onValidate(false);
			setErrorMessage("Description is required");
		}
	};

	return (
		<div className={classes.container}>
			<input
				maxLength={18}
				onChange={changeHandler}
				onBlur={validationHandler}
				onFocus={() => setErrorMessage("")}
				className={`${classes.title} ${
					errorMessage.length > 0 ? classes["title-invalid"] : ""
				}`}
			></input>
			<div
				className={`${classes.counter} ${
					errorMessage.length > 0 ? classes.error : ""
				}`}
			>
				{textLength}/ 18
			</div>
			<label className={classes.error}>{errorMessage}</label>
		</div>
	);
};

export { Input };
