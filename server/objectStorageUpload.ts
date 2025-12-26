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
  if (!BUCKET_ID) {
    throw new Error("Object storage not configured - DEFAULT_OBJECT_STORAGE_BUCKET_ID not set");
  }

  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const ext = originalFilename.includes('.') ? originalFilename.substring(originalFilename.lastIndexOf('.')) : '';
  const filename = `${uniqueSuffix}${ext}`;
  const objectName = `public/${folder}/${filename}`;

  const bucket = objectStorageClient.bucket(BUCKET_ID);
  const file = bucket.file(objectName);

  await file.save(buffer, {
    contentType: mimeType,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });

  const publicUrl = `https://storage.googleapis.com/${BUCKET_ID}/${objectName}`;
  const objectPath = `/objects/${folder}/${filename}`;

  return {
    url: publicUrl,
    objectPath,
    filename,
  };
}

export async function deleteFromObjectStorage(objectPath: string): Promise<void> {
  if (!BUCKET_ID) return;
  
  const bucket = objectStorageClient.bucket(BUCKET_ID);
  const objectName = objectPath.startsWith('/objects/') 
    ? `public${objectPath.replace('/objects', '')}`
    : objectPath;
  
  try {
    await bucket.file(objectName).delete();
  } catch (err) {
    console.error("Failed to delete from object storage:", err);
  }
}
