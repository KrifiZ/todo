import React, { useState } from "react";
import classes from "./TextArea.module.css";

interface TextAreaProps {
	textLength: number;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onValidate: (isValid: boolean) => void;
}

const TextArea: React.FC<TextAreaProps> = (props) => {
	const { onChange, textLength } = props;
	const [errorMessage, setErrorMessage] = useState("");

	const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		onChange(event);
	};

	const validationHandler = (event: React.FocusEvent<HTMLTextAreaElement>) => {
		if (event.target.value.trim().length > 0) {
			props.onValidate(true);
		} else {
			props.onValidate(false);
			setErrorMessage("Description is required");
		}
	};

	return (
		<div className={classes.textAreaContainer}>
			<textarea
				maxLength={250}
				onBlur={validationHandler}
				onChange={changeHandler}
				onFocus={() => setErrorMessage("")}
				className={`${classes.description} ${
					errorMessage.length > 0 ? classes["description-invalid"] : ""
				}`}
			></textarea>
			<div
				className={`${classes.counter} ${
					errorMessage.length > 0 ? classes.error : ""
				}`}
			>
				{textLength}/ 250
			</div>
			<label className={classes.error}>{errorMessage}</label>
		</div>
	);
};

export { TextArea };
