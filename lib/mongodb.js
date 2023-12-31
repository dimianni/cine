// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb";

if (process.env.NODE_ENV === "production" && !process.env.MONGODB_URI_PRODUCTION) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI_PRODUCTION"');
}

if (process.env.NODE_ENV === "development" && !process.env.MONGODB_URI_DEVELOPMENT) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI_DEVELOPMENT"');
}

// Check the current execution environment
const isProduction = process.env.NODE_ENV === "production";

// Set the MongoDB connection string based on the environment
const uri = isProduction
    ? process.env.MONGODB_URI_PRODUCTION
    : process.env.MONGODB_URI_DEVELOPMENT;

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

let client, clientPromise;

if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;