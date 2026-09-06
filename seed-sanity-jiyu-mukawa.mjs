import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const client = createClient({
  projectId: '8idyoy2x',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skWVqeAwXd4GMMPqfBYfPlhldu1KmWKpoCPXYuRHGyv4VHPVQRS9u81oDNT25xOtcoNl2p4LN0NLZknSS',
  useCdn: false,
});

async function uploadImage(filename, alt, caption) {
  const filePath = path.join(process.cwd(), 'public', 'images', filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`File ${filePath} not found!`);
    return null;
  }
  console.log(`Uploading ${filename} to Sanity Assets...`);
  const imageAsset = await client.assets.upload('image', fs.createReadStream(filePath), {
    filename: filename,
  });
  console.log(`Uploaded ${filename} -> Asset ID: ${imageAsset._id}`);
  return {
    _type: 'image',
    _key: filename.replace(/[^a-zA-Z0-9]/g, '_'),
    asset: {
      _type: 'reference',
      _ref: imageAsset._id,
    },
    alt,
    caption,
  };
}

async function seedExactContentWithPairedImages() {
  console.log('--- SEEDING EXACT PAIRED SECTIONS & IMAGES TO SANITY ---');

  // 1. Upload Jiyu Gakuen Exact Images
  const jiyuImg1 = await uploadImage('jiyu-exact-1.jpg', 'Helmiina Kuoppa-Aho englannin keskustelutunnilla Jiyu Gakuenissa huhtikuussa 2023.', 'Helmiina Kuoppa-Aho englannin keskustelutunnilla Jiyu Gakuenissa huhtikuussa 2023.');
  const jiyuImg2 = await uploadImage('jiyu-exact-2.jpg', 'Isäntäperheiden opiskelijat hyvästelemässä vaihto-opiskelijoita ennen kotimatkaa elokuussa 2023.', 'Isäntäperheiden opiskelijat hyvästelemässä vaihto-opiskelijoita ennen kotimatkaa elokuussa 2023.');
  const jiyuImg3 = await uploadImage('jiyu-exact-3.jpg', 'Jiyu Gakuenin opiskelijat tutustumassa Alvar Aallon arkkitehtuuriin Alajärvellä elokuussa 2024.', 'Jiyu Gakuenin opiskelijat tutustumassa Alvar Aallon arkkitehtuuriin Alajärvellä elokuussa 2024.');

  // 2. Upload Mukawa Exact Images
  const mukawaImg1 = await uploadImage('mukawa-exact-1.jpg', 'Mukawan lukio', 'Mukawan lukio Hokkaidolla');
  const mukawaImg2 = await uploadImage('mukawa-exact-2.jpg', 'Kansainvälisyyskerhon toimintaa', 'Mukawasta vieraili kaksi opettajaa ja kaksi opiskelijaa Alajärvellä marraskuussa 2023.');
  const mukawaImg3 = await uploadImage('mukawa-exact-3.jpg', 'Vaihto-opiskelijoita Mukawassa', 'Alajärveltä vieraili Mukawassa yksi opettaja ja neljä opiskelijaa kesä-heinäkuussa 2024.');

  // 3. Jiyu Gakuen Document Payload with Paired Images in Sections
  const jiyuDoc = {
    _id: 'page-jiyu-gakuen',
    _type: 'page',
    title: 'Jiyu Gakuen (Tokio)',
    slug: { _type: 'slug', current: 'jiyu-gakuen' },
    lead: 'Jiyu Gakuenin opiskelijat tutustumassa Alvar Aallon arkkitehtuuriin Alajärvellä elokuussa 2024. Kierroksella olivat mukana kansainvälisyyskerhon opiskelijat.',
    layoutStyle: 'cards',
    youtubeUrl: 'https://youtu.be/0hdWwFgWyBI',
    mainImage: jiyuImg3 ? {
      _type: 'image',
      asset: jiyuImg3.asset,
      alt: jiyuImg3.alt
    } : undefined,
    body: [
      {
        _type: 'block',
        _key: 'j1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Jiyu Gakuenin opiskelijat tutustumassa Alvar Aallon arkkitehtuuriin Alajärvellä elokuussa 2024. Kierroksella olivat mukana kansainvälisyyskerhon opiskelijat.',
          },
        ],
      },
    ],
    sections: [
      {
        _key: 'jsec1',
        title: 'Opiskelijavaihtoa vuodesta 2016',
        anchorId: 'opiskelijavaihtoa-vuodesta-2016',
        image: jiyuImg1,
        content: [
          {
            _type: 'block',
            _key: 'jsec1_b1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Kansainväliset kohtaamiset ovat osa Alajärven lukion arkea. Alajärven ja Vimpelin lukiot ovat toteuttaneet opiskelijavaihtoa tokiolaisen yhteistyökoulun, Jiyu Gakuenin, kanssa jo vuodesta 2016. Joka kevätlukukausi kaksi Alajärven ja kaksi Vimpelin opiskelijaa lähtevät kahdeksi viikoksi vaihtoon Tokioon, jossa he majoittuvat isäntäperheissä ja osallistuvat koulun arkeen päivittäin. Vastaavasti Jiyu Gakuenista saapuu vuorovuosin Alajärven ja Vimpelin lukioon neljä vaihto-opiskelijaa kahdeksi viikoksi elokuussa. Yhteistyö on saanut alkunsa Silta Japaniin -hankkeesta, jonka toteutti Alajärven sivistystoimi yhdessä FJCE:n (Finland Japan Culture and Education ry) kanssa.',
              },
            ],
          },
        ],
      },
      {
        _key: 'jsec2',
        title: 'Vaihtoon?',
        anchorId: 'vaihtoon',
        image: jiyuImg2,
        content: [
          {
            _type: 'block',
            _key: 'jsec2_b1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Vaihto on opiskelijalle maksuton. Se sisältää lennot Japaniin, majoituksen ja ruokailut isäntäperheessä, kouluun liittyvät kustannukset sekä matkavakuutuksen. Vaihdon aikana opiskelijat tutustuvat japanilaisen koulun arkeen ja myös esittelevät Suomea oppitunneilla ja luennoilla. Vaihdon hakuaika on yleensä tammi-helmikuussa, ja siitä ilmoitetaan Wilman kautta. Vaihtoon valitaan ensisijaisesti toisen vuoden opiskelijoita, joiden toivotaan toimivan isäntäperheenä seuraavana syksynä tuleville vaihto-opiskelijoille.',
              },
            ],
          },
        ],
      },
      {
        _key: 'jsec3',
        title: 'Isäntäperheeksi?',
        anchorId: 'isantaperheeksi',
        image: jiyuImg3,
        content: [
          {
            _type: 'block',
            _key: 'jsec3_b1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Haluatteko ripauksen kansainvälisyyttä kotiin? Joka toinen vuosi etsimme yhteensä neljää isäntäperhettä Alajärvelle saapuville Jiyu Gakuenin opiskelijoille. Vaihto ajoittuu yleensä elokuun loppuun ja kestää kaksi viikkoa. Seuraavan kerran isäntäperheitä tarvitaan elokuussa 2025. Mikäli olet kiinnostunut, ota yhteyttä Wilmassa Emmi Seppälään.',
              },
            ],
          },
        ],
      },
      {
        _key: 'jsec4',
        title: 'Alajärven lukion tervehdys Jiyu Gakuenille',
        anchorId: 'alajarven-lukion-tervehdys-jiyu-gakuenille',
        videoUrl: 'https://youtu.be/0hdWwFgWyBI',
        content: [
          {
            _type: 'block',
            _key: 'jsec4_b1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Yhteistyön myötä Alajärven ja Vimpelin lukioissa on aloitettu japanin opetus. Videolla japanin opiskelijat esittelevät lukiota japaniksi. Videotervehdys on tehty Jiyu Gakuenille, joka täytti 100 vuotta vuonna 2021.',
              },
            ],
          },
        ],
      },
    ],
    gallery: [jiyuImg1, jiyuImg2, jiyuImg3].filter(Boolean),
  };

  console.log('Saving exact page-jiyu-gakuen to Sanity...');
  await client.createOrReplace(jiyuDoc);
  console.log('✅ page-jiyu-gakuen updated in Sanity!');

  // 4. Mukawa Document Payload
  const mukawaDoc = {
    _id: 'page-mukawa',
    _type: 'page',
    title: 'Mukawa -yhteistyö',
    slug: { _type: 'slug', current: 'mukawa' },
    lead: 'Mukawan lukio on Alajärven lukion kokoinen koulu Japanin pohjoisella saarella, Hokkaidolla. Koulu sijaitsee maaseudulla ja se on erityisesti tunnettu hyvästä baseball-joukkueestaan.',
    layoutStyle: 'cards',
    mainImage: mukawaImg1 ? {
      _type: 'image',
      asset: mukawaImg1.asset,
      alt: mukawaImg1.alt
    } : undefined,
    body: [
      {
        _type: 'block',
        _key: 'm1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Mukawan lukio on Alajärven lukion kokoinen koulu Japanin pohjoisella saarella, Hokkaidolla. Koulu sijaitsee maaseudulla ja se on erityisesti tunnettu hyvästä baseball-joukkueestaan.',
          },
        ],
      },
    ],
    sections: [
      {
        _key: 'msec1',
        title: 'Mukawan lukio',
        anchorId: 'mukawan-lukio',
        image: mukawaImg1,
        content: [
          {
            _type: 'block',
            _key: 'msec1_b1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Mukawan lukio on Alajärven lukion kokoinen koulu Japanin pohjoisella saarella, Hokkaidolla. Koulu sijaitsee maaseudulla ja se on erityisesti tunnettu hyvästä baseball-joukkueestaan.',
              },
            ],
          },
        ],
      },
      {
        _key: 'msec2',
        title: 'Kansainvälisyyskerho',
        anchorId: 'kansainvalisyyskerho',
        image: mukawaImg2,
        content: [
          {
            _type: 'block',
            _key: 'msec2_b1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Kansainvälisyyskerho mahdollistaa kansainvälisen kokemuksen kartuttamisen ja englannin harjoittelun matalalla kynnyksellä. Toteutamme yhteistyössä Mukawan lukion kanssa kansainvälisyyskerhoa, jossa opiskelijat keskustelevat toisilleen englanniksi Discord-sovelluksen kautta. Vapaan keskustelun ohella opiskelijat tekevät pieniä video-, kuva- ja tekstitehtäviä eri aiheista, esimerkiksi juhlapyhistä, kouluruokailusta ja harrastuksista. Samalla tutustumme opiskelijoihin toisella puolella maailmaa ja opimme heidän kulttuuristaan.\n\nKerhon toimintaan kuuluu snack exchange eli herkkujen vaihto kerran vuodessa, jolloin pääsemme maistelemaan makeisia suoraan Japanista. Kansainvälisyyskerhon jäsenet ovat toimineet myös vaihto-opiskelijoiden tukioppilaina ja olleet mukana ohjelmassa, kun koululla vierailevat esimerkiksi Tokion yhteistyökoulun opiskelijat.',
              },
            ],
          },
        ],
      },
      {
        _key: 'msec3',
        title: 'Vaihto',
        anchorId: 'vaihto',
        image: mukawaImg3,
        content: [
          {
            _type: 'block',
            _key: 'msec3_b1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Myös Mukawan kanssa on tehty vaihto-opiskelua molempiin suuntiin Scandinavia-Japan Sasakawa Foundationin avustuksella. Mukawasta vieraili kaksi opettajaa ja kaksi opiskelijaa Alajärvellä marraskuussa 2023. Alajärveltä puolestaan vieraili Mukawassa yksi opettaja ja neljä opiskelijaa kesä-heinäkuussa 2024.',
              },
            ],
          },
        ],
      },
    ],
    gallery: [mukawaImg1, mukawaImg2, mukawaImg3].filter(Boolean),
  };

  console.log('Saving exact page-mukawa to Sanity...');
  await client.createOrReplace(mukawaDoc);
  console.log('✅ page-mukawa updated in Sanity!');

  console.log('--- PAIRED SECTIONS & ASSETS SEEDED SUCCESSFULLY ---');
}

seedExactContentWithPairedImages().catch((err) => {
  console.error('Error seeding paired content:', err);
  process.exit(1);
});
