import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// Configure Cloudinary
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const BUCKET_ID = process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID;

export interface UploadResult {
  url: string;
  objectPath: string;
  filename: string;
}

export async function uploadBufferToObjectStorage(
  buffer: Buffer,
  originalFilename: string,
  mimeType: string,
  folder: string = "uploads"
): Promise<UploadResult> {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const ext = originalFilename.includes('.') ? originalFilename.substring(originalFilename.lastIndexOf('.')) : '';
  const safeFilename = `${uniqueSuffix}${ext}`;
  const objectName = `public/${folder}/${safeFilename}`;

  console.log(`[Upload] Starting upload: ${objectName}`);

  // 1. Priority: Cloudinary (if configured)
  if (process.env.CLOUDINARY_CLOUD_NAME) {
    try {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: `miemploya/${folder}`,
            public_id: uniqueSuffix, // Use ID without extension for Cloudinary
            resource_type: "auto", // Auto-detect image/video/raw
          },
          (error, result) => {
            if (error) {
              console.error("[Cloudinary] Upload failed:", error);
              reject(error);
            } else if (result) {
              console.log(`[Cloudinary] Upload successful: ${result.secure_url}`);
              resolve({
                url: result.secure_url,
                objectPath: result.public_id,
                filename: safeFilename,
              });
            } else {
              reject(new Error("Cloudinary upload returned no result"));
            }
          }
        );

        // Convert buffer to stream and pipe to Cloudinary
        const stream = Readable.from(buffer);
        stream.pipe(uploadStream);
      });
    } catch (error) {
      console.error("[Cloudinary] Unexpected error:", error);
      throw error;
    }
  }

  // 2. Fallback: Local Storage (Ephemeral)
  console.warn("[Upload] Cloudinary not configured. Using local ephemeral storage.");

  const fs = await import("fs");
  const path = await import("path");

  // Try to find the public directory
  // Prioritize client/public for local development
  let publicDir = path.join(process.cwd(), "client", "public");
  if (!fs.existsSync(publicDir)) {
    publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      publicDir = path.join(process.cwd(), "dist", "public");
      if (!fs.existsSync(publicDir)) {
        // Create if neither exists
        fs.mkdirSync(publicDir, { recursive: true });
      }
    }
  }

  const targetFolder = path.join(publicDir, "uploads", folder);

  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }

  const filePath = path.join(targetFolder, safeFilename);

  // Write file
  fs.writeFileSync(filePath, buffer);
  console.log(`[Upload] Saved locally to: ${filePath}`);

  // Return URL consistent with server/index.ts routing
  return {
    url: `/storage/${folder}/${safeFilename}`,
    objectPath: objectName,
    filename: safeFilename
  };
}

export async function deleteFromObjectStorage(objectPath: string): Promise<void> {
  // 1. Cloudinary Delete
  if (process.env.CLOUDINARY_CLOUD_NAME) {
    try {
      await cloudinary.uploader.destroy(objectPath);
      console.log(`[Cloudinary] Deleted: ${objectPath}`);
      return;
    } catch (err) {
      console.error("[Cloudinary] Failed to delete:", err);
      // Don't throw, just log
    }
  }

  // 2. Fallback legacy delete (No-op mostly as we don't track local paths perfectly here)
  if (!BUCKET_ID) return;
}
