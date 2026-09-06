import fs from 'fs';
import path from 'path';

const jiyuImages = [
  'https://lh3.googleusercontent.com/sitesv/AG8ngQUJ4EkJDpG2a4zWCDy1SScZJYe_qHZ41q14as_8cYFlgS3vfqA-kuC-V722tMzi6jBVLOWfCgyojBieDsDwNQ5h0k9o8cUSsBjwH10sJuX2TDQ5C4b_Uy4Tbm94uDF-tHPjOfp_NGvqppDIJ3BTV9VfFEeTmiXu59DEXu5xrBtadcKSegyWmVv07fA8mYaQDPu5_sXbfx_M5G0yD5_kztO5cNUMt7xwRgRFzl3kOGE=w1280',
  'https://lh3.googleusercontent.com/sitesv/AG8ngQULcSBJibDMepWzCPwJ43IN5h_qOoFOrYXvT22EJZZRR_cdCcl269cPYMCK5JNCATXs9KWDr5CuntO--D_Vrleb2se-9Fp_km98GC_ITUwVS5XlszOFqRAjABqrBXZ-Psg2NC06ZNWS-t-5IeLHJv2PLPIloHhkUfM6WdhG8lqc9obHo8sIv_H6wEJv077_XCaui3IlNKmAhbu9ya0U14PdoQbLiHWQ-pfSa7yi=w1280',
  'https://lh3.googleusercontent.com/sitesv/AG8ngQUoi-UXSPcpXEjc2H6L9vw3AfqYxUYGdgt66qVws2SWyGZt6bvZDSW895u8-HPYy7sqmSEYss4krY-rq-g0XPbu9wBaDJyNHiVMFsNLA0G0Hit0771H3EnMKZbAdb2gu38et0DJeek-CK5bz174w_mG9eG-NMiNOrk7ol0TzFSiXr-LDJgtbrCm0pJJ0H6A7Wm7aMy4iiJSXZZuyJSexykmvqecoT2izLhn8E_9l_k=w1280'
];

const mukawaImages = [
  'https://lh3.googleusercontent.com/sitesv/AG8ngQVdiq5xX-uzUdZnbPjJbGaW--MJPBeNtd9xV9deyBBYC92R1eQN8FMInJeGhAJZ0OOElNIuSTwyBr4B12MJHiIbdj7ds9s37o5JMqqrsdqvfo6ObtYdMIQ5gQz5hXRGpgZeTuJgRIt_4Ct7Pd9qanDE1kKUIrbpIKwVCOwimSCUatNN5JFNJjlBbNpIKnV805vCzJZLq1Y3TyveGUZ0c14SvVLkyLf6zmwyIuNwj1c=w1280',
  'https://lh3.googleusercontent.com/sitesv/AG8ngQW_sX27_qTjXnYEP5HXJjB5P4yaSLjZ_6Uttjzv1pGtryv62Pj-C8Wr1dmLbB4-tkNd4sO7gYBv5dQGhdQwHrUBxCHkW8_LenIYQL2qrKmPGOizEnYpegZ3AbvYg1iqRG7Rr4RunbCDFqnqn6XtgsWUb0O3hCvuTbYApcn8SLerqyXV7wvGX2aSjxNjdRSvigk95IU-Ff3N4M-KlfbkrV2jj0H9JYBxA06-V68AQqk=w1280',
  'https://lh3.googleusercontent.com/sitesv/AG8ngQX_AIz9wJ3S1u68-9tj_XR7sdsez0-uHO_G38lZ448b-ooK9uhDWfg2wwDrlg7j988X3Wex-cAFYnMznNE8AB02hf9xJ5zTbX6mmRZast9ABDe9Da7V9IlqDWwWcYECNz0IWfwULidXW6Taop2VAn8DO3q0Fwnxjbe8KRPdH4nl_4V8bPeckNIsR_nLd1OU4FU6kLY3Ce798ZAodWxhLuC8foMPHUFXUXMQ1FuL=w1280'
];

async function downloadFile(url, dest) {
  console.log(`Downloading ${url} -> ${dest}`);
  const res = await fetch(url);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(dest, buffer);
  console.log(`Saved ${dest} (${buffer.length} bytes)`);
}

async function run() {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

  for (let i = 0; i < jiyuImages.length; i++) {
    await downloadFile(jiyuImages[i], path.join(imagesDir, `jiyu-exact-${i+1}.jpg`));
  }
  for (let i = 0; i < mukawaImages.length; i++) {
    await downloadFile(mukawaImages[i], path.join(imagesDir, `mukawa-exact-${i+1}.jpg`));
  }
}

run().catch(console.error);
