import { useState } from "react";
import { ApplyData } from "../@types/HttpRequest";
import { ITodo } from "../@types/Todo";
import { AddTodo } from "../store/todos-context";
import { useHttp } from "./useHttp";

const useTodoActions = () => {
	const [error, setError] = useState<string | null>(null);
	const { sendRequest } = useHttp();
	const BASE_URL = "http://localhost:5000";

	const errorHandler = async (fn: Function) => {
		try {
			await fn();
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			}
		}
	};

	const getTodos = async (callback: ApplyData) => {
		await errorHandler(() => {
			sendRequest(
				{
					url: "/api/v1/todos",
					baseURL: BASE_URL,
					method: "GET",
				},
				callback
			);
		});
	};

	const addTodo = async (todo: AddTodo, callback: ApplyData) => {
		await errorHandler(() => {
			sendRequest(
				{
					url: "/api/v1/todos",
					baseURL: BASE_URL,
					method: "POST",
					data: { ...todo },
				},
				callback
			);
		});
	};

	const deleteTodo = async (id: string, callback: ApplyData) => {
		await errorHandler(() => {
			sendRequest(
				{
					url: `/api/v1/todos/${id}`,
					baseURL: BASE_URL,
					method: "DELETE",
				},
				callback
			);
		});
	};

	const updateTodo = async (id: string, todo: ITodo, callback: ApplyData) => {
		await errorHandler(() => {
			sendRequest(
				{
					url: `/api/v1/todos/${id}`,
					baseURL: BASE_URL,
					method: "PATCH",
					data: { ...todo },
				},
				callback
			);
		});
	};

	return { getTodos, addTodo, deleteTodo, updateTodo, error };
};

export { useTodoActions };
