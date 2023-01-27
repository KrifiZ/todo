import React, { PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop: React.FC<{ onHide: () => void }> = (props) => {
	return <div onClick={props.onHide} className={classes.backdrop}></div>;
};

const Overlay: React.FC<PropsWithChildren> = (props) => {
	return <div className={classes.overlay}>{props.children}</div>;
};

const portalElement = document.getElementById("overlays") as HTMLElement;

const Modal: React.FC<{ children: React.ReactNode; onHide: () => void }> = (
	props
) => {
	return (
		<React.Fragment>
			{ReactDOM.createPortal(<Backdrop onHide={props.onHide} />, portalElement)}
			{ReactDOM.createPortal(
				<Overlay>{props.children}</Overlay>,
				portalElement
			)}
		</React.Fragment>
	);
};

export { Modal };
