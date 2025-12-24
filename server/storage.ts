import { db } from "./db";
import {
  serviceRequests,
  contentItems,
  verifiedCandidates,
  type ServiceRequest,
  type InsertServiceRequest,
  type ContentItem,
  type InsertContentItem,
  type VerifiedCandidate,
  type InsertVerifiedCandidate,
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
}

export const storage = new DatabaseStorage();
