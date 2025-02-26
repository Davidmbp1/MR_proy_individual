import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const clientConfig = process.env.GOOGLE_CLOUD_CREDENTIALS
  ? { credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS) }
  : {};

const client = new SecretManagerServiceClient(clientConfig);

export async function getGoogleCloudCredentials(): Promise<any> {
  const [version] = await client.accessSecretVersion({
    name: 'projects/442622566492/secrets/jsonkey/versions/1',
  });
  const payload = version.payload?.data;
  if (!payload) {
    throw new Error('Failed to access secret payload');
  }
  return JSON.parse(payload.toString());
}
