import mongoose from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI?.trim() ?? "";

if (!MONGODB_URI) {
	throw new Error("Please define the MONGODB_URI environment variable.");
}

export async function connectDB(): Promise<typeof mongoose> {
    const dns = require('node:dns/promises');
    dns.setServers(["1.1.1.1", "8.8.8.8"]);

	try {
		return await mongoose.connect(MONGODB_URI);
	} catch (error) {
		if (error instanceof Error && error.message.includes("querySrv ECONNREFUSED")) {
			throw new Error(
				`MongoDB SRV DNS lookup was refused. Check that your DNS resolver or network permits SRV lookups and verify the hostname in MONGODB_URI. If SRV lookups are blocked, replace the mongodb+srv:// URI with the standard mongodb:// connection string provided by your MongoDB host. Original error: ${error.message}`
			);
		}
		throw error;
	}
}
