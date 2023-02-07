interface RequestConfig {
	url: string;
	baseURL?: string;
	method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
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
