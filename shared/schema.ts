import { sql } from "drizzle-orm";
import { mysqlTable, text, varchar, int, timestamp, boolean, json } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ============================================
// SERVICE REQUESTS TABLE
// ============================================
export const serviceRequests = mysqlTable("service_requests", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  state: text("state").notNull(),
  city: text("city").notNull(),
  userStatus: varchar("user_status", { length: 50, enum: ["employer", "candidate"] }).notNull(),
  organizationName: text("organization_name"),
  service: text("service").notNull(),
  description: text("description").notNull(),
  documents: json("documents").$type<Array<{ id: string; filename: string; url: string; uploadedAt: string }>>().default([]),
  status: varchar("status", { length: 50, enum: ["pending", "reviewed", "approved", "rejected"] }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================
// CONTENT (VIDEOS, PDFs, NEWS, EVENTS)
// ============================================
export const contentItems = mysqlTable("content_items", {
  id: int("id").primaryKey().autoincrement(),
  type: varchar("type", { length: 50, enum: ["video", "pdf", "news", "event"] }).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  url: text("url"),
  fileUrl: text("file_url"),
  filename: text("filename"),
  imageUrl: text("image_url"),
  category: varchar("category", { length: 50, enum: ["news", "training", "vacancy", "announcement", "education"] }),
  isFavourite: boolean("is_favourite").default(false),
  isPublished: boolean("is_published").default(false),
  displayOrder: int("display_order"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================
// VERIFIED CANDIDATES
// ============================================
export const verifiedCandidates = mysqlTable("verified_candidates", {
  id: int("id").primaryKey().autoincrement(),
  fullName: text("full_name").notNull(),
  title: text("title").notNull(),
  company: text("company"),
  service: text("service").notNull(),
  bio: text("bio"),
  imageUrl: text("image_url"),
  status: varchar("status", { length: 50, enum: ["pending", "approved", "rejected"] }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================
// TEMPLATES
// ============================================
export const templates = mysqlTable("templates", {
  id: int("id").primaryKey().autoincrement(),
  title: text("title").notNull(),
  description: text("description"),
  filename: text("filename").notNull(),
  fileUrl: text("file_url").notNull(),
  fileType: varchar("file_type", { length: 10, enum: ["pdf", "docx", "xlsx"] }).notNull(),
  isPublished: boolean("is_published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================
// JOB POSTINGS
// ============================================
export const jobPostings = mysqlTable("job_postings", {
  id: int("id").primaryKey().autoincrement(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  location: text("location").notNull(),
  state: text("state").notNull(),
  city: text("city").notNull(),
  category: text("category").notNull(),
  isPublished: boolean("is_published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================
// JOB APPLICATIONS
// ============================================
export const jobApplications = mysqlTable("job_applications", {
  id: int("id").primaryKey().autoincrement(),
  jobId: int("job_id").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  state: text("state").notNull(),
  city: text("city").notNull(),
  cvFileName: text("cv_filename").notNull(),
  cvUrl: text("cv_url").notNull(),
  coverNote: text("cover_note"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================
// TRAINING REQUESTS
// ============================================
export const trainingRequests = mysqlTable("training_requests", {
  id: int("id").primaryKey().autoincrement(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  employmentStatus: text("employment_status"),
  organizationName: text("organization_name"),
  role: text("role"),
  interestedTraining: text("interested_training").notNull(),
  preferredStartDate: text("preferred_start_date"),
  certificationRequired: boolean("certification_required").default(false),
  verifiedShortlist: boolean("verified_shortlist").default(false),
  status: varchar("status", { length: 50, enum: ["new", "reviewed", "contacted"] }).default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================
// INSERT SCHEMAS
// ============================================
export const insertServiceRequestSchema = createInsertSchema(serviceRequests).omit({
  id: true,
  createdAt: true,
  documents: true,
  status: true,
});

export const insertContentItemSchema = createInsertSchema(contentItems).omit({
  id: true,
  createdAt: true,
  displayOrder: true,
});

export const insertVerifiedCandidateSchema = createInsertSchema(verifiedCandidates).omit({
  id: true,
  createdAt: true,
});

export const insertTemplateSchema = createInsertSchema(templates).omit({
  id: true,
  createdAt: true,
});

export const insertJobPostingSchema = createInsertSchema(jobPostings).omit({
  id: true,
  createdAt: true,
});

export const insertJobApplicationSchema = createInsertSchema(jobApplications).omit({
  id: true,
  createdAt: true,
});

export const insertTrainingRequestSchema = createInsertSchema(trainingRequests).omit({
  id: true,
  createdAt: true,
  status: true,
});

// ============================================
// TYPE EXPORTS
// ============================================
export type ServiceRequest = typeof serviceRequests.$inferSelect;
export type InsertServiceRequest = z.infer<typeof insertServiceRequestSchema>;

export type ContentItem = typeof contentItems.$inferSelect;
export type InsertContentItem = z.infer<typeof insertContentItemSchema>;

export type VerifiedCandidate = typeof verifiedCandidates.$inferSelect;
export type InsertVerifiedCandidate = z.infer<typeof insertVerifiedCandidateSchema>;

export type Template = typeof templates.$inferSelect;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;

export type JobPosting = typeof jobPostings.$inferSelect;
export type InsertJobPosting = z.infer<typeof insertJobPostingSchema>;

export type JobApplication = typeof jobApplications.$inferSelect;
export type InsertJobApplication = z.infer<typeof insertJobApplicationSchema>;

export type TrainingRequest = typeof trainingRequests.$inferSelect;
export type InsertTrainingRequest = z.infer<typeof insertTrainingRequestSchema>;

// ============================================
// API REQUEST/RESPONSE TYPES
// ============================================
export type ServiceRequestResponse = ServiceRequest;
export type ContentItemResponse = ContentItem;
export type VerifiedCandidateResponse = VerifiedCandidate;
export type TemplateResponse = Template;
export type JobPostingResponse = JobPosting;
export type JobApplicationResponse = JobApplication;
export type TrainingRequestResponse = TrainingRequest;

export interface AdminAuthResponse {
  authenticated: boolean;
}

export interface FileUploadResponse {
  id: string;
  filename: string;
  url: string;
}
