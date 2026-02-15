import mongoose from 'mongoose'

const connectDb = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection.asPromise()  
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Atlas connected.");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }   
};

export default connectDb;