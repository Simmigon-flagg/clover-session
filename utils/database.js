import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
}

global.mongoose = global.mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
    if (global.mongoose.conn) return { db: global.mongoose.conn };

    if (!global.mongoose.promise) {
        global.mongoose.promise = mongoose.connect(MONGODB_URI, {}).then((mongoose) => {
            return { db: mongoose.connection };
        });
    }

    const { db } = await global.mongoose.promise;
    global.mongoose.conn = db;

    return { db };
}
