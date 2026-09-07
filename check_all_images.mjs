import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '8idyoy2x',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function main() {
  const images = await sanityClient.fetch(`*[_type == "sanity.imageAsset"]{
    _id,
    url,
    originalFilename,
    metadata {
      dimensions
    }
  }`);
  console.log('All imageAssets in Sanity:', JSON.stringify(images, null, 2));
}

main().catch(console.error);
