import mongoose from "mongoose";

export async function initMongoose() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    }

    // Check the current execution environment
    const isProduction = process.env.NODE_ENV === "production";

    // Set the MongoDB connection string based on the environment
    const uri = isProduction
        ? process.env.MONGODB_URI_PRODUCTION
        : process.env.MONGODB_URI_DEVELOPMENT;

    await mongoose.connect(uri);
}