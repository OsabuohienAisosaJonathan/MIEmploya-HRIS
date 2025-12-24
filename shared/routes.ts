import { z } from "zod";
import {
  insertServiceRequestSchema,
  insertContentItemSchema,
  insertVerifiedCandidateSchema,
} from "./schema";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  unauthorized: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  // PUBLIC: Submit service request
  serviceRequests: {
    create: {
      method: "POST" as const,
      path: "/api/requests",
      input: insertServiceRequestSchema,
      responses: {
        201: z.object({
          id: z.number(),
          message: z.string(),
        }),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: "GET" as const,
      path: "/api/requests",
      responses: {
        200: z.array(
          z.object({
            id: z.number(),
            fullName: z.string(),
            email: z.string(),
            service: z.string(),
            status: z.string(),
            createdAt: z.string().or(z.date()),
          })
        ),
        401: errorSchemas.unauthorized,
      },
    },
    get: {
      method: "GET" as const,
      path: "/api/requests/:id",
      responses: {
        200: z.any(),
        401: errorSchemas.unauthorized,
        404: errorSchemas.notFound,
      },
    },
    update: {
      method: "PATCH" as const,
      path: "/api/requests/:id",
      input: z.object({
        status: z.enum(["pending", "reviewed", "approved", "rejected"]),
      }),
      responses: {
        200: z.any(),
        401: errorSchemas.unauthorized,
        404: errorSchemas.notFound,
      },
    },
  },

  // PUBLIC: Get published content
  content: {
    list: {
      method: "GET" as const,
      path: "/api/content",
      responses: {
        200: z.array(z.any()),
      },
    },
    create: {
      method: "POST" as const,
      path: "/api/content",
      input: insertContentItemSchema,
      responses: {
        201: z.any(),
        401: errorSchemas.unauthorized,
      },
    },
    update: {
      method: "PATCH" as const,
      path: "/api/content/:id",
      input: insertContentItemSchema.partial(),
      responses: {
        200: z.any(),
        401: errorSchemas.unauthorized,
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: "DELETE" as const,
      path: "/api/content/:id",
      responses: {
        204: z.void(),
        401: errorSchemas.unauthorized,
        404: errorSchemas.notFound,
      },
    },
  },

  // PUBLIC: Get verified candidates
  verifiedCandidates: {
    list: {
      method: "GET" as const,
      path: "/api/verified-candidates",
      responses: {
        200: z.array(z.any()),
      },
    },
    create: {
      method: "POST" as const,
      path: "/api/verified-candidates",
      input: insertVerifiedCandidateSchema,
      responses: {
        201: z.any(),
        401: errorSchemas.unauthorized,
      },
    },
    update: {
      method: "PATCH" as const,
      path: "/api/verified-candidates/:id",
      input: z.object({
        status: z.enum(["pending", "approved", "rejected"]),
      }),
      responses: {
        200: z.any(),
        401: errorSchemas.unauthorized,
        404: errorSchemas.notFound,
      },
    },
  },

  // ADMIN: Authentication
  admin: {
    login: {
      method: "POST" as const,
      path: "/api/admin/login",
      input: z.object({
        password: z.string(),
      }),
      responses: {
        200: z.object({
          token: z.string(),
        }),
        401: errorSchemas.unauthorized,
      },
    },
    me: {
      method: "GET" as const,
      path: "/api/admin/me",
      responses: {
        200: z.object({
          authenticated: z.boolean(),
        }),
        401: errorSchemas.unauthorized,
      },
    },
  },

  // File upload endpoint
  upload: {
    file: {
      method: "POST" as const,
      path: "/api/upload",
      responses: {
        200: z.object({
          id: z.string(),
          filename: z.string(),
          url: z.string(),
        }),
        400: errorSchemas.validation,
      },
    },
  },
};

// ============================================
// URL BUILDER
// ============================================
export function buildUrl(
  path: string,
  params?: Record<string, string | number>
): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

// ============================================
// TYPE EXPORTS
// ============================================
export type ServiceRequestInput = z.infer<
  typeof api.serviceRequests.create.input
>;
export type ContentItemInput = z.infer<typeof api.content.create.input>;
export type VerifiedCandidateInput = z.infer<
  typeof api.verifiedCandidates.create.input
>;
