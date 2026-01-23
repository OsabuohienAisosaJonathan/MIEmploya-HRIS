import { objectStorageClient } from "./replit_integrations/object_storage";

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

  // Fallback to local storage if no Bucket ID is configured
  if (!BUCKET_ID) {
    console.warn("[Upload] Object storage not configured (DEFAULT_OBJECT_STORAGE_BUCKET_ID missing). Using local ephemeral storage.");

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
    // If we are saving to uploads/folder/filename, and /storage maps to uploads/,
    // then the URL should be /storage/folder/filename
    return {
      url: `/storage/${folder}/${safeFilename}`,
      objectPath: objectName,
      filename: safeFilename
    };
  }

  const bucket = objectStorageClient.bucket(BUCKET_ID);
  const file = bucket.file(objectName);

  try {
    await file.save(buffer, {
      contentType: mimeType,
      metadata: {
        cacheControl: "public, max-age=31536000",
      },
    });

    console.log(`[Object Storage] Upload successful: ${objectName}`);

    const servingUrl = `/storage/${folder}/${safeFilename}`;

    return {
      url: servingUrl,
      objectPath: objectName,
      filename: safeFilename,
    };
  } catch (error) {
    console.error(`[Object Storage] Upload failed:`, error);
    throw error;
  }
}

export async function deleteFromObjectStorage(objectPath: string): Promise<void> {
  if (!BUCKET_ID) return;

  const bucket = objectStorageClient.bucket(BUCKET_ID);

  let objectName = objectPath;
  if (objectPath.startsWith('/storage/')) {
    objectName = `public${objectPath.replace('/storage', '')}`;
  } else if (objectPath.startsWith('/objects/')) {
    objectName = `public${objectPath.replace('/objects', '')}`;
  }

  try {
    await bucket.file(objectName).delete();
    console.log(`[Object Storage] Deleted: ${objectName}`);
  } catch (err) {
    console.error("[Object Storage] Failed to delete:", err);
  }
}
