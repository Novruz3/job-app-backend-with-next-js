import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongo_url!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connection successfull");
    });
    connection.on("error", (error) => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
};
