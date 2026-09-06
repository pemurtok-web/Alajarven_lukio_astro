import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '8idyoy2x',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function run() {
  const pages = await client.fetch(`*[_type == "page"]{ slug, title, _updatedAt }`);
  console.log(JSON.stringify(pages, null, 2));
}

run().catch(console.error);
