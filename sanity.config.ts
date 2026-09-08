import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

const pageTemplates = [
  { id: 'page-opinto-opas', title: 'Opinto-opas', slug: 'opinto-opas' },
  { id: 'page-opintotarjotin', title: 'Opintotarjotin', slug: 'opintotarjotin' },
  { id: 'page-tyoaika', title: 'Työaika & Jaksot', slug: 'tyoaika' },
  { id: 'page-opinto-ohjaus', title: 'Opinto-ohjaus (OPO)', slug: 'opinto-ohjaus' },
  { id: 'page-opiskeluhuolto', title: 'Opiskeluhuolto', slug: 'opiskeluhuolto' },
  { id: 'page-yo-kirjoitukset', title: 'YO-kirjoitukset', slug: 'yo-kirjoitukset' },
  { id: 'page-lomakkeet', title: 'Lomakkeet & Ohjeet', slug: 'lomakkeet' },
  { id: 'page-kodin-ja-koulun-yhteistyo', title: 'Kodin ja koulun yhteistyö', slug: 'kodin-ja-koulun-yhteistyo' },
  { id: 'page-hakijalle', title: 'Hakijalle (Tule opiskelemaan)', slug: 'hakijalle' },
  { id: 'page-jiyu-gakuen', title: 'Jiyu Gakuen (Japani)', slug: 'jiyu-gakuen' },
  { id: 'page-mukawa', title: 'Mukawa (Japani)', slug: 'mukawa' },
  { id: 'page-kansainvalisyys', title: 'Kansainvälisyys (Yleiskatsaus)', slug: 'kansainvalisyys' },
  { id: 'page-muu', title: 'Muu kansainvälinen toiminta', slug: 'muu' },
  { id: 'page-tietosuoja', title: 'Tietosuoja ja evästeet', slug: 'tietosuoja' },
  { id: 'page-yhteystiedot', title: 'Yhteystiedot', slug: 'yhteystiedot' },
];

export default defineConfig({
  name: 'alajarven-lukio',
  title: 'Alajärven lukio - Sisällönhallinta',
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || '8idyoy2x',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Alajärven lukio - Sisällöt')
          .items([
            // 1. Etusivu
            S.listItem()
              .title('🏠 Etusivun sisällöt')
              .child(S.document().schemaType('homepage').documentId('homepage')),

            // 2. Sivuston yleisasetukset & Logo
            S.listItem()
              .title('⚙️ Sivuston yleisasetukset & Logo')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

            S.divider(),

            // 3. Kaikki valikon sisältösivut
            S.listItem()
              .title('📄 Valikon sisältösivut')
              .child(
                S.list()
                  .title('Valitse muokattava sivu')
                  .items([
                    // Opiskelijalle (päävalikkokohta sivustolla) - avautuu omaksi alasivulistaksi
                    S.listItem()
                      .title('🎓 Opiskelijalle')
                      .child(
                        S.list()
                          .title('Opiskelijalle - alasivut')
                          .items([
                            S.listItem()
                              .title('📘 Opinto-opas')
                              .child(S.document().schemaType('page').documentId('page-opinto-opas').initialValueTemplate('tpl-page-opinto-opas')),
                            S.listItem()
                              .title('📋 Opintotarjotin')
                              .child(S.document().schemaType('page').documentId('page-opintotarjotin').initialValueTemplate('tpl-page-opintotarjotin')),
                            S.listItem()
                              .title('📅 Työaika & Jaksot')
                              .child(S.document().schemaType('page').documentId('page-tyoaika').initialValueTemplate('tpl-page-tyoaika')),
                            S.listItem()
                              .title('🤝 Opinto-ohjaus (OPO)')
                              .child(S.document().schemaType('page').documentId('page-opinto-ohjaus').initialValueTemplate('tpl-page-opinto-ohjaus')),
                            S.listItem()
                              .title('🛡️ Opiskeluhuolto')
                              .child(S.document().schemaType('page').documentId('page-opiskeluhuolto').initialValueTemplate('tpl-page-opiskeluhuolto')),
                            S.listItem()
                              .title('🎓 YO-kirjoitukset')
                              .child(S.document().schemaType('page').documentId('page-yo-kirjoitukset').initialValueTemplate('tpl-page-yo-kirjoitukset')),
                            S.listItem()
                              .title('📑 Lomakkeet & Ohjeet')
                              .child(S.document().schemaType('page').documentId('page-lomakkeet').initialValueTemplate('tpl-page-lomakkeet')),
                            S.listItem()
                              .title('🏡 Kodin ja koulun yhteistyö')
                              .child(S.document().schemaType('page').documentId('page-kodin-ja-koulun-yhteistyo').initialValueTemplate('tpl-page-kodin-ja-koulun-yhteistyo')),
                          ])
                      ),

                    S.divider(),

                    // Hakijalle sivu (ei alasivuja - yksittäinen pitkä sivu)
                    S.listItem()
                      .title('🎯 Hakijalle (Tule opiskelemaan)')
                      .child(S.document().schemaType('page').documentId('page-hakijalle').initialValueTemplate('tpl-page-hakijalle')),

                    S.divider(),

                    // Kansainvälisyys (päävalikkokohta sivustolla) - avautuu omaksi alasivulistaksi
                    S.listItem()
                      .title('🌍 Kansainvälisyys')
                      .child(
                        S.list()
                          .title('Kansainvälisyys - alasivut')
                          .items([
                            S.listItem()
                              .title('🌍 Yleiskatsaus')
                              .child(S.document().schemaType('page').documentId('page-kansainvalisyys').initialValueTemplate('tpl-page-kansainvalisyys')),
                            S.listItem()
                              .title('🌏 Jiyu Gakuen (Japani)')
                              .child(S.document().schemaType('page').documentId('page-jiyu-gakuen').initialValueTemplate('tpl-page-jiyu-gakuen')),
                            S.listItem()
                              .title('🌸 Mukawa (Japani)')
                              .child(S.document().schemaType('page').documentId('page-mukawa').initialValueTemplate('tpl-page-mukawa')),
                            S.listItem()
                              .title('🇪🇺 Muu kansainvälinen toiminta')
                              .child(S.document().schemaType('page').documentId('page-muu').initialValueTemplate('tpl-page-muu')),
                          ])
                      ),

                    S.divider(),

                    // Muut sivut
                    S.listItem()
                      .title('🔒 Tietosuoja ja evästeet')
                      .child(S.document().schemaType('page').documentId('page-tietosuoja').initialValueTemplate('tpl-page-tietosuoja')),

                    S.divider(),

                    // Muut omat sivut
                    S.listItem()
                      .title('➕ Kaikki sivut / Luo uusi sivu')
                      .child(S.documentTypeList('page').title('Kaikki sivut')),
                  ])
              ),

            S.divider(),

            // 4. Uutiset & Tapahtumat & Yhteystiedot & Pikalinkit
            S.listItem()
              .title('📰 Ajankohtaista (Uutiset)')
              .child(S.documentTypeList('post').title('Uutiset')),

            // 5. Yhteystiedot (viimeinen kohta päävalikossa sivustolla)
            S.listItem()
              .title('📞 Yhteystiedot')
              .child(
                S.list()
                  .title('Yhteystiedot')
                  .items([
                    S.listItem()
                      .title('🖼️ Sivun ylätiedot (otsikko, kuva, ingressi)')
                      .child(S.document().schemaType('page').documentId('page-yhteystiedot').initialValueTemplate('tpl-page-yhteystiedot')),
                    S.listItem()
                      .title('👥 Henkilökunta, opettajat & osoite')
                      .child(S.document().schemaType('contactInfo').documentId('contactInfo')),
                  ])
              ),

            S.listItem()
              .title('📆 Tapahtumakalenteri')
              .child(S.documentTypeList('event').title('Tapahtumat')),
            S.listItem()
              .title('🔗 Pikalinkit')
              .child(S.documentTypeList('quicklink').title('Pikalinkit')),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      ...pageTemplates.map((p) => ({
        id: `tpl-${p.id}`,
        title: p.title,
        schemaType: 'page',
        value: {
          title: p.title,
          slug: { _type: 'slug', current: p.slug },
        },
      })),
    ],
  },
});
