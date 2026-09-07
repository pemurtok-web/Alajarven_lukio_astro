import { defineType, defineField } from 'sanity';

export const homepageSchema = defineType({
  name: 'homepage',
  title: 'Etusivun sisällöt',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Dokumentin nimi',
      type: 'string',
    }),
    
    // --- HERO OSIONALUE ---
    defineField({
      name: 'heroBadge',
      title: 'Hero - Pieni yläteksti (Badge)',
      type: 'string',
      initialValue: 'Laadukasta lukio-opetusta Alajärvellä',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero - Pääotsikko',
      type: 'string',
      initialValue: 'Rakenna tulevaisuutesi Alajärven lukiossa',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero - Kuvausteksti',
      type: 'text',
      rows: 3,
      initialValue: 'Tarjoamme turvallisen, yhteisöllisen ja nykyaikaisen oppimisympäristön. Meillä saat yksilöllistä ohjausta, vahvat valmiudet jatko-opintoihin sekä ainutlaatuisia kansainvälisyyskokemuksia.',
    }),

    // --- HERO KUVAT ---
    defineField({
      name: 'heroBgImage',
      title: 'Hero - Taustakuva (Valinnainen)',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt-teksti' }],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero - Pääkuva / Kuva-alue oikealla',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt-teksti' }],
    }),

    // --- ESITTELYOSIO (Kuva + Teksti) ---
    defineField({
      name: 'introBadge',
      title: 'Esittely - Pieni yläteksti (Badge)',
      type: 'string',
      initialValue: 'Miksi valita Alajärven lukio?',
    }),
    defineField({
      name: 'introTitle',
      title: 'Esittely - Otsikko',
      type: 'string',
      initialValue: 'Moderni lukio, jossa sinun tavoitteesi ovat keskiössä',
    }),
    defineField({
      name: 'introDescription',
      title: 'Esittely - Kuvausteksti',
      type: 'text',
      rows: 4,
      initialValue: 'Alajärven lukio tarjoaa erinomaiset puitteet yleissivistävälle lukio-opiskelulle. Meillä yhdistyvät monipuolinen opintotarjotin, joustavat opintopolut sekä innostavat oppimisympäristöt.',
    }),
    defineField({
      name: 'introImage',
      title: 'Esittely - Kuva (Kuva ja teksti rinnakkain)',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt-teksti' }],
    }),

    // --- VALTTIKORTIT / HIGHLIGHTS ---
    defineField({
      name: 'features',
      title: 'Miksi valita meidät - Valttikortit',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Kortti',
          fields: [
            { name: 'title', type: 'string', title: 'Otsikko' },
            { name: 'description', type: 'text', rows: 4, title: 'Kuvaus / Lista (Kirjoita rivinvaihdoilla tai - luetteloviivoilla)' },
            {
              name: 'listItems',
              type: 'array',
              title: 'Erilliset luetelmakohdat (Valinnainen lista)',
              of: [{ type: 'string' }]
            }
          ]
        }
      ]
    })
  ],
});

