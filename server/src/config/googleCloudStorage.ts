// server/src/config/googleCloudStorage.ts
import { Storage } from '@google-cloud/storage';

const GOOGLE_CLOUD_PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID;
const GOOGLE_CLOUD_KEYFILE = process.env.GOOGLE_CLOUD_KEYFILE;
const BUCKET_NAME = process.env.GOOGLE_CLOUD_BUCKET_NAME;

if (!GOOGLE_CLOUD_PROJECT_ID) {
  throw new Error("GOOGLE_CLOUD_PROJECT_ID is not set in environment variables");
}
if (!GOOGLE_CLOUD_KEYFILE) {
  throw new Error("GOOGLE_CLOUD_KEYFILE is not set in environment variables");
}
if (!BUCKET_NAME) {
  throw new Error("GOOGLE_CLOUD_BUCKET_NAME is not set in environment variables");
}

const storage = new Storage({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: GOOGLE_CLOUD_KEYFILE,
});

const bucket = storage.bucket(BUCKET_NAME);

export { bucket };
