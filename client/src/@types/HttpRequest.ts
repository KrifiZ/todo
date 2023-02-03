interface RequestConfig {
	url: string;
	method: "GET" | "POST" | "PUT" | "DELETE";
	headers?: { [key: string]: string };
	data?: { [key: string]: string };
}

interface ResponseData {
	[key: string]: any;
}

interface ResponseError {
	message: string;
}

interface Response {
	data: ResponseData;
	error: ResponseError;
}

interface ApplyData {
	(data: ResponseData): void;
}

export type { RequestConfig, ResponseData, ResponseError, Response, ApplyData };
