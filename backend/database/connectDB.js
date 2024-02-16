import mongoose from "mongoose";

mongoose.set('strictQuery', true);

const connectDB = async () => {
  const url = 'mongodb://localhost:27017/315-Midterm'; //process.env.MONGO_URI || 'mongodb://localhost:27017/courses';
  try {
    const connection = await mongoose.connect(url, {
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.log("Failed to connect to courses database: ", e);
  }
  return url;
};

export default connectDB;