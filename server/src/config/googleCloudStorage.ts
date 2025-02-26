import { Storage } from '@google-cloud/storage';
import { getGoogleCloudCredentials } from './secretManager';

const GOOGLE_CLOUD_PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID;
const BUCKET_NAME = process.env.GOOGLE_CLOUD_BUCKET_NAME;

if (!GOOGLE_CLOUD_PROJECT_ID) {
  throw new Error("GOOGLE_CLOUD_PROJECT_ID is not set in environment variables");
}
if (!BUCKET_NAME) {
  throw new Error("GOOGLE_CLOUD_BUCKET_NAME is not set in environment variables");
}

async function createBucket() {
  const credentials = await getGoogleCloudCredentials();
  const storage = new Storage({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    credentials,
  });
  return storage.bucket(BUCKET_NAME!);
}

export const bucketPromise = createBucket();
