import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // ============================================
  // ADMIN AUTHENTICATION ENDPOINTS
  // ============================================
  app.post(api.admin.login.path, async (req, res) => {
    try {
      const input = api.admin.login.input.parse(req.body);
      if (input.password === ADMIN_PASSWORD) {
        const token = Buffer.from(`admin:${Date.now()}`).toString("base64");
        return res.json({ token });
      }
      res.status(401).json({ message: "Invalid password" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get(api.admin.me.path, (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const authenticated = !!token && token.startsWith("admin:");
    res.json({ authenticated });
  });

  // ============================================
  // SERVICE REQUEST ENDPOINTS
  // ============================================
  app.post(api.serviceRequests.create.path, async (req, res) => {
    try {
      const input = api.serviceRequests.create.input.parse(req.body);
      const request = await storage.createServiceRequest(input);
      res.status(201).json({ id: request.id, message: "Request submitted successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get(api.serviceRequests.list.path, async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const authenticated = !!token && token.startsWith("admin:");
    if (!authenticated) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const requests = await storage.getServiceRequests();
    res.json(requests);
  });

  app.get(api.serviceRequests.get.path, async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const authenticated = !!token && token.startsWith("admin:");
    if (!authenticated) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const request = await storage.getServiceRequest(Number(req.params.id));
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.json(request);
  });

  app.patch(api.serviceRequests.update.path, async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const authenticated = !!token && token.startsWith("admin:");
    if (!authenticated) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const input = api.serviceRequests.update.input.parse(req.body);
      const updated = await storage.updateServiceRequestStatus(
        Number(req.params.id),
        input.status
      );
      if (!updated) {
        return res.status(404).json({ message: "Request not found" });
      }
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // ============================================
  // CONTENT ENDPOINTS
  // ============================================
  app.get(api.content.list.path, async (req, res) => {
    const type = req.query.type as string | undefined;
    let content = await storage.getContentItems();
    if (type) {
      content = content.filter((c) => c.type === type);
    }
    res.json(content);
  });

  app.post(api.content.create.path, async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const authenticated = !!token && token.startsWith("admin:");
    if (!authenticated) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const input = api.content.create.input.parse(req.body);
      const item = await storage.createContentItem(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  app.patch(api.content.update.path, async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const authenticated = !!token && token.startsWith("admin:");
    if (!authenticated) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const input = api.content.update.input.parse(req.body);
      const updated = await storage.updateContentItem(Number(req.params.id), input);
      if (!updated) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.delete(api.content.delete.path, async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const authenticated = !!token && token.startsWith("admin:");
    if (!authenticated) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await storage.deleteContentItem(Number(req.params.id));
    res.status(204).send();
  });

  // ============================================
  // VERIFIED CANDIDATES ENDPOINTS
  // ============================================
  app.get(api.verifiedCandidates.list.path, async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const authenticated = !!token && token.startsWith("admin:");
    
    const candidates = authenticated
      ? await storage.getAllVerifiedCandidates()
      : await storage.getVerifiedCandidates();
    res.json(candidates);
  });

  app.post(api.verifiedCandidates.create.path, async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const authenticated = !!token && token.startsWith("admin:");
    if (!authenticated) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const input = api.verifiedCandidates.create.input.parse(req.body);
      const candidate = await storage.createVerifiedCandidate(input);
      res.status(201).json(candidate);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  app.patch(api.verifiedCandidates.update.path, async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const authenticated = !!token && token.startsWith("admin:");
    if (!authenticated) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const input = api.verifiedCandidates.update.input.parse(req.body);
      const updated = await storage.updateVerifiedCandidateStatus(
        Number(req.params.id),
        input.status
      );
      if (!updated) {
        return res.status(404).json({ message: "Candidate not found" });
      }
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });

  return httpServer;
}
