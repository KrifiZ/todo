import express from "express";
import { addTodo } from "../controllers/todos";

const router = express.Router();

router.route("/").post(addTodo);

export { router as todoRouter };
