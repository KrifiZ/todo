import { useCallback, useState } from "react";
import axios, { AxiosError } from "axios";
import { ApplyData, RequestConfig } from "../@types/HttpRequest";

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
					setError(err.response?.data?.msg || "Something went wrong!");
				}
			}
			setIsLoading(false);
		},
		[setIsLoading, setError]
	);

	return {
		isLoading,
		error,
		sendRequest,
	};
};

export { useHttp };
