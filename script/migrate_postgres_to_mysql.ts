
import fs from "fs";
import path from "path";
import { db } from "../server/db";
import {
    jobApplications,
    jobPostings,
    serviceRequests,
    contentItems,
    verifiedCandidates,
    templates,
    trainingRequests
} from "../shared/schema";
import { sql } from "drizzle-orm";

async function migrate() {
    console.log("Starting migration...");

    const backupPath = path.join(process.cwd(), "backup.sql");
    if (!fs.existsSync(backupPath)) {
        console.error("backup.sql not found!");
        process.exit(1);
    }

    const content = fs.readFileSync(backupPath, "utf-8");
    const lines = content.split("\n");

    let currentTable: string | null = null;
    let copyMode = false;

    for (const line of lines) {
        if (line.startsWith("COPY public.")) {
            const match = line.match(/COPY public\.(\w+) \((.*)\) FROM stdin;/);
            if (match) {
                currentTable = match[1];
                copyMode = true;
                console.log(`Processing table: ${currentTable}`);
            }
            continue;
        }

        if (line.trim() === "\\.") {
            copyMode = false;
            currentTable = null;
            continue;
        }

        if (copyMode && currentTable && line.trim()) {
            const parts = line.split("\t").map(p => p.trim() === "\\N" ? null : p.trim());

            try {
                if (currentTable === "job_applications") {
                    // Postgres: id, job_id, full_name, email, phone, state, city, cv_filename, cv_url, cover_note, created_at
                    await db.insert(jobApplications).values({
                        // id is auto-increment, generally we should preserve it or let mysql gen new ones. 
                        // Let's attempt to preserve IDs if possible, or omit if strictly auto-inc.
                        // Drizzle mysqlTable definition has autoincrement() on ID.
                        // We WILL insert ID to maintain relationships.
                        id: parseInt(parts[0]!),
                        jobId: parseInt(parts[1]!),
                        fullName: parts[2]!,
                        email: parts[3]!,
                        phone: parts[4]!,
                        state: parts[5]!,
                        city: parts[6]!,
                        cvFileName: parts[7]!,
                        cvUrl: parts[8]!,
                        coverNote: parts[9],
                        createdAt: parts[10] ? new Date(parts[10]) : new Date(),
                    }).onDuplicateKeyUpdate({ set: { id: sql`id` } }); // simple no-op on duplicate
                }
                else if (currentTable === "job_postings") {
                    // id, title, company, description, requirements, location, state, city, category, is_published, created_at
                    await db.insert(jobPostings).values({
                        id: parseInt(parts[0]!),
                        title: parts[1]!,
                        company: parts[2]!,
                        description: parts[3]!,
                        requirements: parts[4]!,
                        location: parts[5]!,
                        state: parts[6]!,
                        city: parts[7]!,
                        category: parts[8]!,
                        isPublished: parts[9] === 't',
                        createdAt: parts[10] ? new Date(parts[10]) : new Date(),
                    }).onDuplicateKeyUpdate({ set: { id: sql`id` } });
                }
                else if (currentTable === "service_requests") {
                    // id, title, full_name, email, phone, state, city, user_status, organization_name, service, description, documents, status, created_at
                    await db.insert(serviceRequests).values({
                        id: parseInt(parts[0]!),
                        title: parts[1]!,
                        fullName: parts[2]!,
                        email: parts[3]!,
                        phone: parts[4]!,
                        state: parts[5]!,
                        city: parts[6]!,
                        userStatus: parts[7] as any,
                        organizationName: parts[8],
                        service: parts[9]!,
                        description: parts[10]!,
                        documents: parts[11] ? JSON.parse(parts[11]) : [],
                        status: parts[12] as any,
                        createdAt: parts[13] ? new Date(parts[13]) : new Date(),
                    }).onDuplicateKeyUpdate({ set: { id: sql`id` } });
                }
                else if (currentTable === "content_items") {
                    // id, type, title, description, url, file_url, filename, image_url, is_published, display_order, created_at, category, is_favourite
                    await db.insert(contentItems).values({
                        id: parseInt(parts[0]!),
                        type: parts[1] as any,
                        title: parts[2]!,
                        description: parts[3],
                        url: parts[4],
                        fileUrl: parts[5],
                        filename: parts[6],
                        imageUrl: parts[7],
                        isPublished: parts[8] === 't',
                        displayOrder: parseInt(parts[9]!),
                        createdAt: parts[10] ? new Date(parts[10]) : new Date(),
                        category: parts[11] as any,
                        isFavourite: parts[12] === 't',
                    }).onDuplicateKeyUpdate({ set: { id: sql`id` } });
                }
                else if (currentTable === "verified_candidates") {
                    // id, full_name, title, company, service, bio, image_url, status, created_at
                    await db.insert(verifiedCandidates).values({
                        id: parseInt(parts[0]!),
                        fullName: parts[1]!,
                        title: parts[2]!,
                        company: parts[3],
                        service: parts[4]!,
                        bio: parts[5],
                        imageUrl: parts[6],
                        status: parts[7] as any,
                        createdAt: parts[8] ? new Date(parts[8]) : new Date(),
                    }).onDuplicateKeyUpdate({ set: { id: sql`id` } });
                }
                else if (currentTable === "templates") {
                    // id, title, description, filename, file_url, file_type, is_published, created_at
                    await db.insert(templates).values({
                        id: parseInt(parts[0]!),
                        title: parts[1]!,
                        description: parts[2],
                        filename: parts[3]!,
                        fileUrl: parts[4]!,
                        fileType: parts[5] as any,
                        isPublished: parts[6] === 't',
                        createdAt: parts[7] ? new Date(parts[7]) : new Date(),
                    }).onDuplicateKeyUpdate({ set: { id: sql`id` } });
                }
                else if (currentTable === "training_requests") {
                    // id, full_name, email, phone, employment_status, organization_name, role, interested_training, preferred_start_date, certification_required, verified_shortlist, status, created_at
                    await db.insert(trainingRequests).values({
                        id: parseInt(parts[0]!),
                        fullName: parts[1]!,
                        email: parts[2]!,
                        phone: parts[3]!,
                        employmentStatus: parts[4],
                        organizationName: parts[5],
                        role: parts[6],
                        interestedTraining: parts[7]!,
                        preferredStartDate: parts[8],
                        certificationRequired: parts[9] === 't',
                        verifiedShortlist: parts[10] === 't',
                        status: parts[11] as any,
                        createdAt: parts[12] ? new Date(parts[12]) : new Date(),
                    }).onDuplicateKeyUpdate({ set: { id: sql`id` } });
                }

            } catch (err) {
                console.error(`Failed to insert row for ${currentTable}:`, err);
                // Continue despite errors to salvage as much as possible
            }
        }
    }

    console.log("Migration complete!");
    process.exit(0);
}

migrate();
