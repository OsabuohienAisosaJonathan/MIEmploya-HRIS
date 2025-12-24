import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, timestamp, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ============================================
// SERVICE REQUESTS TABLE
// ============================================
export const serviceRequests = pgTable("service_requests", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  state: text("state").notNull(),
  city: text("city").notNull(),
  userStatus: varchar("user_status", { enum: ["employer", "candidate"] }).notNull(),
  organizationName: text("organization_name"),
  service: text("service").notNull(),
  description: text("description").notNull(),
  documents: json("documents").$type<Array<{ id: string; filename: string; url: string; uploadedAt: string }>>().default([]),
  status: varchar("status", { enum: ["pending", "reviewed", "approved", "rejected"] }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================
// CONTENT (VIDEOS, PDFs, NEWS, EVENTS)
// ============================================
export const contentItems = pgTable("content_items", {
  id: serial("id").primaryKey(),
  type: varchar("type", { enum: ["video", "pdf", "news", "event"] }).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  url: text("url"),
  fileUrl: text("file_url"),
  filename: text("filename"),
  imageUrl: text("image_url"),
  isPublished: boolean("is_published").default(false),
  displayOrder: serial("display_order"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================
// VERIFIED CANDIDATES
// ============================================
export const verifiedCandidates = pgTable("verified_candidates", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  title: text("title").notNull(),
  company: text("company"),
  service: text("service").notNull(),
  bio: text("bio"),
  imageUrl: text("image_url"),
  status: varchar("status", { enum: ["pending", "approved", "rejected"] }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================
// TEMPLATES
// ============================================
export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  filename: text("filename").notNull(),
  fileUrl: text("file_url").notNull(),
  fileType: varchar("file_type", { enum: ["pdf", "docx", "xlsx"] }).notNull(),
  isPublished: boolean("is_published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================
// JOB POSTINGS
// ============================================
export const jobPostings = pgTable("job_postings", {
  id: serial("id").primaryKey(),
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
export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  jobId: serial("job_id").notNull(),
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

// ============================================
// API REQUEST/RESPONSE TYPES
// ============================================
export type ServiceRequestResponse = ServiceRequest;
export type ContentItemResponse = ContentItem;
export type VerifiedCandidateResponse = VerifiedCandidate;
export type TemplateResponse = Template;
export type JobPostingResponse = JobPosting;
export type JobApplicationResponse = JobApplication;

export interface AdminAuthResponse {
  authenticated: boolean;
}

export interface FileUploadResponse {
  id: string;
  filename: string;
  url: string;
}
