import { db } from "./db";
import {
  serviceRequests,
  contentItems,
  verifiedCandidates,
  templates,
  jobPostings,
  jobApplications,
  type ServiceRequest,
  type InsertServiceRequest,
  type ContentItem,
  type InsertContentItem,
  type VerifiedCandidate,
  type InsertVerifiedCandidate,
  type Template,
  type InsertTemplate,
  type JobPosting,
  type InsertJobPosting,
  type JobApplication,
  type InsertJobApplication,
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Service Requests
  createServiceRequest(request: InsertServiceRequest): Promise<ServiceRequest>;
  getServiceRequests(): Promise<ServiceRequest[]>;
  getServiceRequest(id: number): Promise<ServiceRequest | undefined>;
  updateServiceRequestStatus(
    id: number,
    status: "pending" | "reviewed" | "approved" | "rejected"
  ): Promise<ServiceRequest | undefined>;

  // Content Items
  getContentItems(): Promise<ContentItem[]>;
  createContentItem(item: InsertContentItem): Promise<ContentItem>;
  updateContentItem(id: number, item: Partial<InsertContentItem>): Promise<ContentItem | undefined>;
  deleteContentItem(id: number): Promise<void>;

  // Verified Candidates
  getVerifiedCandidates(): Promise<VerifiedCandidate[]>;
  getAllVerifiedCandidates(): Promise<VerifiedCandidate[]>;
  createVerifiedCandidate(candidate: InsertVerifiedCandidate): Promise<VerifiedCandidate>;
  updateVerifiedCandidateStatus(
    id: number,
    status: "pending" | "approved" | "rejected"
  ): Promise<VerifiedCandidate | undefined>;

  // Templates
  getTemplates(): Promise<Template[]>;
  getAllTemplates(): Promise<Template[]>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  updateTemplateStatus(id: number, isPublished: boolean): Promise<Template | undefined>;
  deleteTemplate(id: number): Promise<void>;

  // Jobs
  getJobs(): Promise<JobPosting[]>;
  getAllJobs(): Promise<JobPosting[]>;
  getJobById(id: number): Promise<JobPosting | undefined>;
  createJob(job: InsertJobPosting): Promise<JobPosting>;
  updateJobStatus(id: number, isPublished: boolean): Promise<JobPosting | undefined>;
  updateJob(id: number, data: Partial<InsertJobPosting>): Promise<JobPosting | undefined>;
  deleteJob(id: number): Promise<void>;

  // Job Applications
  createJobApplication(app: InsertJobApplication): Promise<JobApplication>;
  getJobApplications(): Promise<JobApplication[]>;
}

export class DatabaseStorage implements IStorage {
  async createServiceRequest(request: InsertServiceRequest): Promise<ServiceRequest> {
    const [created] = await db
      .insert(serviceRequests)
      .values(request)
      .returning();
    return created;
  }

  async getServiceRequests(): Promise<ServiceRequest[]> {
    return await db.select().from(serviceRequests);
  }

  async getServiceRequest(id: number): Promise<ServiceRequest | undefined> {
    const [request] = await db
      .select()
      .from(serviceRequests)
      .where(eq(serviceRequests.id, id));
    return request;
  }

  async updateServiceRequestStatus(
    id: number,
    status: "pending" | "reviewed" | "approved" | "rejected"
  ): Promise<ServiceRequest | undefined> {
    const [updated] = await db
      .update(serviceRequests)
      .set({ status })
      .where(eq(serviceRequests.id, id))
      .returning();
    return updated;
  }

  async getContentItems(): Promise<ContentItem[]> {
    return await db
      .select()
      .from(contentItems)
      .where(eq(contentItems.isPublished, true));
  }

  async createContentItem(item: InsertContentItem): Promise<ContentItem> {
    const [created] = await db
      .insert(contentItems)
      .values(item)
      .returning();
    return created;
  }

  async updateContentItem(
    id: number,
    item: Partial<InsertContentItem>
  ): Promise<ContentItem | undefined> {
    const [updated] = await db
      .update(contentItems)
      .set(item)
      .where(eq(contentItems.id, id))
      .returning();
    return updated;
  }

  async deleteContentItem(id: number): Promise<void> {
    await db.delete(contentItems).where(eq(contentItems.id, id));
  }

  async getVerifiedCandidates(): Promise<VerifiedCandidate[]> {
    return await db
      .select()
      .from(verifiedCandidates)
      .where(eq(verifiedCandidates.status, "approved"));
  }

  async getAllVerifiedCandidates(): Promise<VerifiedCandidate[]> {
    return await db.select().from(verifiedCandidates);
  }

  async createVerifiedCandidate(
    candidate: InsertVerifiedCandidate
  ): Promise<VerifiedCandidate> {
    const [created] = await db
      .insert(verifiedCandidates)
      .values(candidate)
      .returning();
    return created;
  }

  async updateVerifiedCandidateStatus(
    id: number,
    status: "pending" | "approved" | "rejected"
  ): Promise<VerifiedCandidate | undefined> {
    const [updated] = await db
      .update(verifiedCandidates)
      .set({ status })
      .where(eq(verifiedCandidates.id, id))
      .returning();
    return updated;
  }

  async getTemplates(): Promise<Template[]> {
    return await db
      .select()
      .from(templates)
      .where(eq(templates.isPublished, true));
  }

  async getAllTemplates(): Promise<Template[]> {
    return await db.select().from(templates);
  }

  async createTemplate(template: InsertTemplate): Promise<Template> {
    const [created] = await db
      .insert(templates)
      .values(template)
      .returning();
    return created;
  }

  async updateTemplateStatus(id: number, isPublished: boolean): Promise<Template | undefined> {
    const [updated] = await db
      .update(templates)
      .set({ isPublished })
      .where(eq(templates.id, id))
      .returning();
    return updated;
  }

  async deleteTemplate(id: number): Promise<void> {
    await db.delete(templates).where(eq(templates.id, id));
  }

  async getJobs(): Promise<JobPosting[]> {
    return await db
      .select()
      .from(jobPostings)
      .where(eq(jobPostings.isPublished, true));
  }

  async getAllJobs(): Promise<JobPosting[]> {
    return await db.select().from(jobPostings);
  }

  async getJobById(id: number): Promise<JobPosting | undefined> {
    const [job] = await db
      .select()
      .from(jobPostings)
      .where(eq(jobPostings.id, id));
    return job;
  }

  async createJob(job: InsertJobPosting): Promise<JobPosting> {
    const [created] = await db
      .insert(jobPostings)
      .values(job)
      .returning();
    return created;
  }

  async updateJobStatus(id: number, isPublished: boolean): Promise<JobPosting | undefined> {
    const [updated] = await db
      .update(jobPostings)
      .set({ isPublished })
      .where(eq(jobPostings.id, id))
      .returning();
    return updated;
  }

  async updateJob(id: number, data: Partial<InsertJobPosting>): Promise<JobPosting | undefined> {
    const [updated] = await db
      .update(jobPostings)
      .set(data)
      .where(eq(jobPostings.id, id))
      .returning();
    return updated;
  }

  async deleteJob(id: number): Promise<void> {
    await db.delete(jobPostings).where(eq(jobPostings.id, id));
  }

  async createJobApplication(app: InsertJobApplication): Promise<JobApplication> {
    const [created] = await db
      .insert(jobApplications)
      .values(app)
      .returning();
    return created;
  }

  async getJobApplications(): Promise<JobApplication[]> {
    return await db.select().from(jobApplications);
  }
}

export const storage = new DatabaseStorage();
