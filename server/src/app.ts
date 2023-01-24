import * as dotenv from "dotenv";
import "express-async-errors";
import express from "express";
import { connectDB } from "./db/connect";

dotenv.config();
const app = express();

app.use(express.json());

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
