import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

type Item = {
	message: string;
};

interface MongooseErrorRequestHandler extends ErrorRequestHandler {
	value: string;
	keyValue: {};
	statusCode?: StatusCodes;
	message?: string;
	code: number;
	errors: {
		[index: string]: Item;
	};
}

export { MongooseErrorRequestHandler };
