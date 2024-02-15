import mongoose from "mongoose";

mongoose.set('strictQuery', true);

const connectDB = async () => {
  const url = process.env.MONGO_URI || 'mongodb://localhost:27017/monsters';
  try {
    const connection = await mongoose.connect(url, {
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.log("Failed to connect to monsters database: ", e);
  }
  return url;
};

export default connectDB;