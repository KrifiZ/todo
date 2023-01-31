import { useCallback, useState } from "react";
import axios, { AxiosError } from "axios";

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

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const sendRequest = useCallback(
		async (requestConfig: RequestConfig, applyData: ApplyData) => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await axios(requestConfig);
				applyData(response.data);
			} catch (err: unknown) {
				if (err instanceof AxiosError) {
					setError(err.response!.data.msg || "Something went wrong!");
				}
			}
			setIsLoading(false);
		},
		[]
	);

	return {
		isLoading,
		error,
		sendRequest,
	};
};

export { useHttp };
