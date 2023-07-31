import mongoose from "mongoose";

const connection = {};

export async function initMongoose() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    }

    if (connection.isConnected) {
        console.log('Using existing MongoDB connection');
        return;
    }

    // Check the current execution environment
    const isProduction = process.env.NODE_ENV === "production";

    // Set the MongoDB connection string based on the environment
    const uri = isProduction
        ? process.env.MONGODB_URI_PRODUCTION
        : process.env.MONGODB_URI_DEVELOPMENT;

    // Setting options
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        const db = await mongoose.connect(`${uri}`, options);
        connection.isConnected = db.connections[0].readyState === 1;
        console.log('New MongoDB connection established');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}