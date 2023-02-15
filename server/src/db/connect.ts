import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const connectDB = (url: string) => {
	return mongoose.connect(`mongodb://mongodb:27017/${url}`, {});
};

export { connectDB };
