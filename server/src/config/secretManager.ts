// server/src/config/secretManager.ts
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const client = new SecretManagerServiceClient();

export async function getGoogleCloudCredentials(): Promise<any> {
  const [version] = await client.accessSecretVersion({
    name: 'projects/442622566492/secrets/jsonkey/versions/1',
  });
  const payload = version.payload?.data;
  if (!payload) {
    throw new Error('Failed to access secret payload');
  }
  // Si payload es un Buffer o ya es string, toString() sin argumentos es suficiente
  return JSON.parse(payload.toString());
}
