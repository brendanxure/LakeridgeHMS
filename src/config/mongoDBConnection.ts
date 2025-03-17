import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URL || "";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return; // Already connected, no need to reconnect
    }

    try {
        const conn = await mongoose.connect(MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

export default connectDB;