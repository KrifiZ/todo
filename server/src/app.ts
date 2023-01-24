import * as dotenv from "dotenv";
import "express-async-errors";
import express from "express";
import { connectDB } from "./db/connect";
import { todoRouter } from "./routes/todoRoutes";
import { notFound } from "./middlewares/not-found";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/v1/todos", todoRouter);
app.use(notFound);

const PORT = process.env.PORT || 5000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI!);
		app.listen(PORT, () => console.log(PORT));
	} catch (error) {
		console.log(error);
	}
};

start();
