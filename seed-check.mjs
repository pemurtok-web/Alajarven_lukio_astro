import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '8idyoy2x',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  // Write token not set for unauthenticated client, so we will generate a script that uses token if available, or create initial documents via node API if allowed, or generate seed documents.
});

console.log('Seed script target pages check...');
