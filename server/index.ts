import express, { type Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { registerObjectStorageRoutes } from "./replit_integrations/object_storage";

import cors from "cors";

const app = express();
const httpServer = createServer(app);

app.use(cors({
  origin: true, // Allow all origins for now (or specify ["https://miemploya.com", "http://localhost:5000"])
  credentials: true,
}));

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

// Serve uploads directory - check all potential locations
const potentialUploadDirs = [
  path.join(process.cwd(), "dist", "public", "uploads"),
  path.join(process.cwd(), "public", "uploads"),
  path.join(process.cwd(), "client", "public", "uploads"),
];

// Filter to only existing directories
const existingUploadDirs = potentialUploadDirs.filter(dir => fs.existsSync(dir));

if (existingUploadDirs.length === 0) {
  // Create default if none exist
  const defaultDir = path.join(process.cwd(), "client", "public", "uploads");
  fs.mkdirSync(defaultDir, { recursive: true });
  existingUploadDirs.push(defaultDir);
}

// Log identified directories
console.log(`[Server] Serving uploads from:`, existingUploadDirs);

// Register static middleware for ALL existing directories
// This allows falling back to client/public/uploads even if dist/public/uploads exists but is missing files
existingUploadDirs.forEach(dir => {
  app.use("/uploads", express.static(dir));
});

// Register object storage routes for serving files from cloud storage
registerObjectStorageRoutes(app);

// Serve public files from object storage via /storage/* route - Mapped to local uploads for XAMPP/Local
existingUploadDirs.forEach(dir => {
  app.use("/storage", express.static(dir));
});

// Fallback for flat file structure compatibility (if files are in uploads/ but requested as uploads/folder/file)
app.use("/storage/:folder/:filename", (req, res, next) => {
  const { filename } = req.params;

  // Check all directories for the file
  for (const dir of existingUploadDirs) {
    const flatPath = path.join(dir, filename);
    if (fs.existsSync(flatPath)) {
      return res.sendFile(flatPath);
    }
  }

  // If file doesn't exist locally in any directory, return 404 immediately. 
  // Do NOT call next(), or it will fall through to the SPA catch-all and serve index.html as the PDF.
  res.status(404).send("File not found");
});

// Setup multer with memory storage for object storage uploads
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (_req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "video/mp4",
      "video/webm",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
      // reusePort: true, // Not supported on Windows
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
