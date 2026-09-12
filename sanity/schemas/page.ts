import { defineType, defineField } from 'sanity';
import { commonBlock } from './commonBlock';

// Nämä osoitteet ovat jo sivuston omien, kovakoodattujen sivujen käytössä.
// "Erillisenä kohtana päävalikossa" -sivu ei saa käyttää näitä, koska sivusto ei silloin
// tietäisi kumpaa sivua näyttää samassa osoitteessa.
const RESERVED_TOP_LEVEL_SLUGS = ['ajankohtaista', 'hakijalle', 'kansainvalisyys', 'opiskelijalle', 'tietosuoja', 'yhteystiedot'];

export const pageSchema = defineType({
  name: 'page',
  title: 'Sivut (Sisältösivut)',
  type: 'document',
  fieldsets: [
    {
      name: 'advanced',
      title: '⚙️ Lisäasetukset (tarvitaan harvoin)',
      description: 'Avaa tämä osio vain jos sivulle halutaan erikoisasettelu, tilastokortteja tai kuvagalleria. Tavallisella sivulla näitä ei tarvita — riittää otsikko, ingressi, pääkuva, teksti ja liitteet.',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Sivun otsikko',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL-osoite)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().custom((slugValue: any, context: any) => {
          const doc = context.document as any;
          if (doc?.menuPlacement === 'top' && slugValue?.current && RESERVED_TOP_LEVEL_SLUGS.includes(slugValue.current)) {
            return `"${slugValue.current}" on jo sivuston oman sivun osoite. Valitse "Erillisenä kohtana päävalikossa" -sivulle toinen slug.`;
          }
          return true;
        }),
    }),
    defineField({
      name: 'menuPlacement',
      title: '📋 Näytä päävalikossa',
      description: 'Valitse tähän jos haluat, että tämä sivu ilmestyy automaattisesti sivuston yläpalkin päävalikkoon (ja mobiilivalikkoon). Oletuksena sivu EI näy valikossa, vaikka se on julkaistu ja löytyy suoralla osoitteella.',
      type: 'string',
      options: {
        list: [
          { title: 'Ei näy päävalikossa', value: 'none' },
          { title: 'Opiskelijalle-alavalikossa', value: 'opiskelijalle' },
          { title: 'Kansainvälisyys-alavalikossa', value: 'kansainvalisyys' },
          { title: 'Erillisenä kohtana päävalikossa (ei alavalikossa)', value: 'top' },
        ],
        layout: 'radio',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'menuOrder',
      title: 'Järjestysnumero valikossa',
      description: 'Pienempi luku näkyy valikossa ylempänä. Voi jättää tyhjäksi — silloin sivu näkyy listan lopussa.',
      type: 'number',
      hidden: ({ document }) => document?.menuPlacement === 'none' || !document?.menuPlacement,
    }),
    defineField({
      name: 'lead',
      title: 'Ingressi / Johdantoteksti',
      description: 'Lyhyt johdattava teksti, joka näkyy isolla otsikon alla.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mainImage',
      title: 'Sivun pääkuva',
      description: '💡 Kuvavinkki: pidempi sivu n. 1920–2500 px riittää sekä vaaka- että pystykuvissa – järjestelmä optimoi koon automaattisesti.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'caption', type: 'string', title: 'Kuvateksti / Selite kuvan alle' },
        { name: 'alt', type: 'string', title: 'Alt-teksti' }
      ]
    }),

    // --- PÄÄSISÄLTÖ (Leipäteksti: otsikot, kuvat, video, linkit, PDF kaikki samassa editorissa) ---
    defineField({
      name: 'body',
      title: 'Sivun sisältö (teksti, kuvat, video, linkit)',
      description: 'Kirjoita tähän sivun varsinainen sisältö. Voit lisätä otsikoita, tekstiä, kuvia, YouTube-videon ja ladattavan PDF:n suoraan tekstin sekaan "+"-painikkeesta.',
      type: 'array',
      of: [
        commonBlock,
        {
          type: 'image',
          title: 'Kuva tekstin sekaan (Rinnakkain tai sovitetusti)',
          description: '💡 Pidempi sivu n. 1920–2500 px riittää hyvin. ⚠️ Jos haluat tekstin kiertyvän kuvan viereen ("Oikealla"/"Vasemmalla"), lisää kuva ENNEN sitä tekstikappaletta, jonka haluat näkyvän kuvan vieressä — teksti kiertyy vain kuvan JÄLKEEN tulevan sisällön kohdalla, ei ennen kuvaa olevan.',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Kuvateksti (Näkyy kuvan alla)' },
            { name: 'alt', type: 'string', title: 'Alt-teksti' },
            {
              name: 'layout',
              type: 'string',
              title: 'Kuvan sijoitus tekstissä',
              description: 'Muista: teksti asettuu kuvan viereen vain, jos se tulee kuvan JÄLKEEN sisällössä. Ennen kuvaa oleva teksti pysyy aina kuvan yläpuolella.',
              options: {
                list: [
                  { title: 'Oikealla (Teksti ja kuva rinnakkain)', value: 'right' },
                  { title: 'Vasemmalla (Teksti ja kuva rinnakkain)', value: 'left' },
                  { title: 'Koko leveydellä (Kuva tekstin ylä/alapuolella)', value: 'full' },
                  { title: 'Alkuperäinen koko (ei skaalattu, ei keskitetty, tasattu vasemmalle)', value: 'original' }
                ],
                layout: 'radio'
              },
              initialValue: 'right'
            }
          ]
        },
        {
          type: 'object',
          name: 'youtube',
          title: 'YouTube -video tekstin sekaan',
          fields: [
            { name: 'url', type: 'url', title: 'Videon URL-osoite (YouTube, Google Drive tai Vimeo)' },
            { name: 'caption', type: 'string', title: 'Kuvateksti / Videon otsikko' }
          ]
        },
        {
          type: 'file',
          title: 'Ladattava PDF / Tiedosto tekstin sekaan',
          options: { accept: '.pdf,.doc,.docx,.xlsx' },
          fields: [
            { name: 'description', type: 'string', title: 'Painikkeen teksti (esim. Lataa opinto-opas PDF)' }
          ]
        }
      ],
    }),

    // --- LIITTEET (Yksi paikka kaikille linkeille ja tiedostoille) ---
    defineField({
      name: 'documentLinks',
      title: '📄 Liitteet ja linkit (esim. Opinto-opas, PDF:t, Google Drive -linkit)',
      description: 'Lisää tähän kaikki sivun liitteet ja ulkoiset linkit — käytä joko verkko-osoitetta (esim. Google Drive) TAI lataa tiedosto suoraan, ei molempia samaan riviin. Näkyvät siisteinä painikkeina sivun alussa.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'documentLink',
          title: 'Liite / Linkki',
          fields: [
            { name: 'title', type: 'string', title: 'Otsikko (esim. Opetussuunnitelma 2021)', validation: (Rule) => Rule.required() },
            { name: 'description', type: 'string', title: 'Lisätieto (valinnainen)' },
            {
              name: 'url',
              type: 'url',
              title: 'Verkko-osoite (esim. https://drive.google.com/... tai /opiskelijalle/yo-ilmoittautuminen)',
              description: 'Käytä TÄTÄ jos linkitetään ulkoiseen sivuun (Google Drive) TAI sivuston omaan sisäiseen sivuun.',
              validation: (Rule) =>
                Rule.uri({
                  allowRelative: true,
                  scheme: ['http', 'https', 'mailto', 'tel'],
                }),
            },
            {
              name: 'file',
              type: 'file',
              title: 'Tai lataa tiedosto suoraan',
              description: 'Käytä TÄTÄ jos tiedosto ladataan suoraan Sanityyn (esim. PDF).',
              options: { accept: '.pdf,.doc,.docx,.xlsx' },
            },
          ],
          preview: {
            select: { title: 'title', url: 'url', fileName: 'file.asset.originalFilename' },
            prepare({ title, url, fileName }: any) {
              return { title, subtitle: fileName ? `📎 ${fileName}` : url };
            },
          },
        },
      ],
    }),

    // --- LISÄASETUKSET (Harvoin tarvittavat, oletuksena piilossa) ---
    defineField({
      name: 'layoutStyle',
      title: 'Sivun asettelutyyppi (Valitse sivupohja)',
      description: 'Valitse miten sivu ja sen osiot asettuvat sivustolle. Oletuksena tavallinen tekstiartikkeli riittää useimmille sivuille.',
      type: 'string',
      options: {
        list: [
          { title: '🖼️ 1. Teksti ja kuva rinnakkain (2-palstaiset kortit, esim. Mukawa & Jiyu Gakuen)', value: 'cards' },
          { title: '📑 2. Perinteinen tekstiartikkeli (Perinteinen lukusivu, esim. Opinto-opas & Työajat)', value: 'standard' },
          { title: '📊 3. Esittelysivu (Infokortit, tilastonumerot ja osiot, esim. Hakijalle-sivu)', value: 'presentation' },
        ],
        layout: 'radio',
      },
      initialValue: 'standard',
      fieldset: 'advanced',
    }),
    defineField({
      name: 'heroBgImage',
      title: '🌄 Yläbannerin taustakuva (Hero-osion taustakuva)',
      description: 'Valinnainen taustakuva sivun ylimpään laatikkoon (Hero header). Kuvan päälle tulee automaattisesti tumma liukuväri lukukelpoisuuden takaamiseksi. 💡 Pidempi sivu n. 1920–2500 px riittää sekä vaaka- että pystykuvissa.',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'advanced',
      fields: [
        { name: 'alt', type: 'string', title: 'Alt-teksti' }
      ]
    }),
    defineField({
      name: 'stats',
      title: '📊 Tilasto- / Numerokortit (esim. Keskiarvoraja 7,00, Aloituspaikat 60–70)',
      description: 'Voit lisätä sivulle suuria numerokortteja esittelemään avainlukuja',
      type: 'array',
      fieldset: 'advanced',
      of: [
        {
          type: 'object',
          title: 'Numerokortti',
          fields: [
            { name: 'number', type: 'string', title: 'Suuri numero / tieto (esim. 7,00 tai 100 %)' },
            { name: 'label', type: 'string', title: 'Otsikko / Selite (esim. YLEISLINJAN KESKIARVORAJA)' },
            { name: 'description', type: 'string', title: 'Lisätieto (esim. Peruskoulun lukuaineiden keskiarvo)' },
          ],
          preview: {
            select: { title: 'number', subtitle: 'label' },
          }
        }
      ]
    }),
    defineField({
      name: 'features',
      title: '💡 Info- / Korostuskortit (esim. Maksuton koulutus, Aito kansainvälisyys)',
      description: 'Voit lisätä sivulle vahvuus- ja korostuslaatikoita',
      type: 'array',
      fieldset: 'advanced',
      of: [
        {
          type: 'object',
          title: 'Infokortti',
          fields: [
            { name: 'title', type: 'string', title: 'Kortin otsikko (esim. Maksuton 2. asteen koulutus)' },
            { name: 'description', type: 'text', rows: 2, title: 'Kortin teksti' },
            {
              name: 'icon',
              type: 'string',
              title: 'Kuvake',
              options: {
                list: [
                  { title: '✓ Valintamerkki (Maksuttomuus / Edut)', value: 'check' },
                  { title: '🌐 Maapallo (Kansainvälisyys)', value: 'globe' },
                  { title: '⭐ Tähti (Laatu / Erikoisuus)', value: 'star' },
                  { title: '📚 Kirja (Opiskelu / Kurssit)', value: 'book' },
                  { title: '🏆 Palkinto / Menestys', value: 'award' },
                ]
              },
              initialValue: 'check'
            }
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' }
          }
        }
      ]
    }),
    defineField({
      name: 'sections',
      title: '🖼️ Rinnakkaiset Osio-kortit (Teksti 1 + Kuva 1, Teksti 2 + Kuva 2...)',
      description: 'Lisää tähän osioita klikkaamalla "+ Lisää Osio". Jokaisessa osiossa Teksti ja Kuva asettuvat automaattisesti rinnakkain.',
      type: 'array',
      fieldset: 'advanced',
      of: [
        {
          type: 'object',
          title: 'Osio-kortti (Teksti & Kuva rinnakkain)',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: '1. Osion otsikko',
              description: 'Kirjoita tähän osion otsikko (esim. Opiskelijavaihtoa vuodesta 2016)',
            },
            {
              name: 'image',
              type: 'image',
              title: '2. Laita tähän Kuva (Näkyy tekstin rinnalla)',
              description: 'Valitse tai lataa kuva, joka asettuu tämän osion tekstin viereen. 💡 Pidempi sivu n. 1920–2500 px riittää hyvin.',
              options: { hotspot: true },
              fields: [
                {
                  name: 'caption',
                  type: 'string',
                  title: 'Kuvateksti',
                  description: 'Kirjoita tähän kuvan yhteydessä / kuvan alla näkyvä kuvausteksti'
                },
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alt-teksti (Valinnainen)'
                }
              ]
            },
            {
              name: 'content',
              type: 'array',
              title: '3. Kirjoita tähän Teksti',
              description: 'Kirjoita tähän osion leipäteksti ja kappaleet',
              of: [
                commonBlock,
                {
                  type: 'file',
                  title: 'Ladattava PDF / Tiedosto osion sekaan',
                  options: { accept: '.pdf,.doc,.docx,.xlsx' },
                  fields: [
                    { name: 'description', type: 'string', title: 'Painikkeen teksti (esim. Lataa PDF)' }
                  ]
                }
              ]
            },
            {
              name: 'videoUrl',
              type: 'url',
              title: '4. Vaihtoehtoisesti YouTube-videolinkki',
              description: 'Jos osiossa halutaan näyttää kuvan sijasta video, liitä YouTube-osoite tähän'
            },
            {
              name: 'anchorId',
              type: 'string',
              title: 'Sisällysluettelon ankkuri (Valinnainen)',
              description: 'Voit antaa lyhyen tunnisteen (esim. vaihtoon), jolla sisällysluettelo hyppää tähän osioon'
            }
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
            prepare({ title, media }) {
              return {
                title: title || 'Nimetön osio',
                subtitle: '🖼️ Teksti & Kuva rinnakkain',
                media: media,
              };
            },
          },
        }
      ]
    }),
    defineField({
      name: 'gallery',
      title: 'Kuvagalleria / Lisäkuvat sivulle',
      description: 'Voit ladata tähän useita kuvia kuvateksteineen',
      type: 'array',
      fieldset: 'advanced',
      of: [
        {
          type: 'image',
          title: 'Kuva',
          description: '💡 Pidempi sivu n. 1920–2500 px riittää hyvin.',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Kuvateksti / Otsikko kuvan alle' },
            { name: 'alt', type: 'string', title: 'Alt-teksti' }
          ]
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
});
