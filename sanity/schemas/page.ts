import { defineType, defineField } from 'sanity';

export const pageSchema = defineType({
  name: 'page',
  title: 'Sivut (Sisältösivut)',
  type: 'document',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lead',
      title: 'Ingressi / Johdantoteksti',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'layoutStyle',
      title: 'Sivun asettelutyyppi (Valitse sivupohja)',
      description: 'Valitse miten sivu ja sen osiot asettuvat sivustolle',
      type: 'string',
      options: {
        list: [
          { title: '🖼️ 1. Teksti ja kuva rinnakkain (2-palstaiset kortit, esim. Mukawa & Jiyu Gakuen)', value: 'cards' },
          { title: '📑 2. Perinteinen tekstiartikkeli (Perinteinen lukusivu, esim. Opinto-opas & Työajat)', value: 'standard' },
          { title: '📊 3. Esittelysivu (Infokortit, tilastonumerot ja osiot, esim. Hakijalle-sivu)', value: 'presentation' },
        ],
        layout: 'radio',
      },
      initialValue: 'cards',
    }),
    defineField({
      name: 'stats',
      title: '📊 Tilasto- / Numerokortit (esim. Keskiarvoraja 7,00, Aloituspaikat 60–70)',
      description: 'Voit lisätä sivulle suuria numerokortteja esittelemään avainlukuja',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Numerokortti',
          fields: [
            { name: 'number', type: 'string', title: 'Suuri numero / tieto (esim. 7,00 tai 100 %)', validation: (Rule) => Rule.required() },
            { name: 'label', type: 'string', title: 'Otsikko / Selite (esim. YLEISLINJAN KESKIARVORAJA)', validation: (Rule) => Rule.required() },
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
      of: [
        {
          type: 'object',
          title: 'Infokortti',
          fields: [
            { name: 'title', type: 'string', title: 'Kortin otsikko (esim. Maksuton 2. asteen koulutus)', validation: (Rule) => Rule.required() },
            { name: 'description', type: 'text', rows: 2, title: 'Kortin teksti', validation: (Rule) => Rule.required() },
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
      name: 'externalLink',
      title: 'Google Drive -linkki / Verkkolinkki (esim. https://drive.google.com/...)',
      description: 'Liitä tähän suora Google Drive -osoite tai verkkolinkki opinto-oppaaseen',
      type: 'url',
    }),
    defineField({
      name: 'externalLinkTitle',
      title: 'Linkkipainikkeen teksti (esim. Avaa Opinto-opas Google Drivessa)',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Sivun pääkuva / Bannerikuva',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'caption', type: 'string', title: 'Kuvateksti / Selite kuvan alle' },
        { name: 'alt', type: 'string', title: 'Alt-teksti' }
      ]
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube -videolinkki (Sivun video / soitin)',
      description: 'Voit syöttää tähän minkä tahansa YouTube-videolinkin (esim. https://youtu.be/0hdWwFgWyBI tai https://www.youtube.com/watch?v=...)',
      type: 'url',
    }),
    defineField({
      name: 'body',
      title: 'Päätekstisisältö (Block content)',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          title: 'Kuva tekstin sekaan (Rinnakkain tai sovitetusti)',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Kuvateksti (Näkyy kuvan alla)' },
            { name: 'alt', type: 'string', title: 'Alt-teksti' },
            {
              name: 'layout',
              type: 'string',
              title: 'Kuvan sijoitus tekstissä',
              options: {
                list: [
                  { title: 'Oikealla (Teksti ja kuva rinnakkain)', value: 'right' },
                  { title: 'Vasemmalla (Teksti ja kuva rinnakkain)', value: 'left' },
                  { title: 'Koko leveydellä (Kuva tekstin ylä/alapuolella)', value: 'full' }
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
            { name: 'url', type: 'url', title: 'YouTube-videon URL-osoite' },
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
    defineField({
      name: 'gallery',
      title: 'Kuvagalleria / Lisäkuvat sivulle',
      description: 'Voit ladata tähän useita kuvia kuvateksteineen',
      type: 'array',
      of: [
        {
          type: 'image',
          title: 'Kuva',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Kuvateksti / Otsikko kuvan alle' },
            { name: 'alt', type: 'string', title: 'Alt-teksti' }
          ]
        }
      ]
    }),
    defineField({
      name: 'pdfFiles',
      title: 'Ladattavat PDF-tiedostot / Liitteet sivun alalaitaan',
      type: 'array',
      of: [
        {
          type: 'file',
          title: 'PDF-tiedosto / Liite',
          options: { accept: '.pdf,.doc,.docx,.xlsx' },
          fields: [
            { name: 'title', type: 'string', title: 'Tiedoston nimi (esim. Opinto-opas 2026–2027.pdf)' },
            { name: 'description', type: 'string', title: 'Lyhyt kuvaus' }
          ]
        }
      ]
    }),
    defineField({
      name: 'sections',
      title: '🖼️ Rinnakkaiset Osio-kortit (Teksti 1 + Kuva 1, Teksti 2 + Kuva 2...)',
      description: 'Lisää tähän osioita klikkaamalla "+ Lisää Osio". Jokaisessa osiossa Teksti ja Kuva asettuvat automaattisesti rinnakkain.',
      type: 'array',
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
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'image',
              type: 'image',
              title: '2. Laita tähän Kuva (Näkyy tekstin rinnalla)',
              description: 'Valitse tai lataa kuva, joka asettuu tämän osion tekstin viereen',
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
                { type: 'block' },
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
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
});
