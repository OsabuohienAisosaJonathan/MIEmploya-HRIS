
import { db } from "../server/db";
import { jobApplications } from "../shared/schema";
import { sql } from "drizzle-orm";

async function verify() {
    try {
        console.log("Checking database connection...");
        // Simple count query
        const result = await db.select({ count: sql<number>`count(*)` }).from(jobApplications);
        console.log("Job Applications Count:", result[0].count);
        process.exit(0);
    } catch (error) {
        console.error("Verification failed:", error);
        process.exit(1);
    }
}

verify();
