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
      title: 'Hero - Taustakuva (Vaakakuva, työpöytä)',
      description: '💡 Kuvavinkki: pidempi sivu n. 1920–2500 px riittää sekä vaaka- että pystykuvissa – järjestelmä optimoi koon automaattisesti. Näkyy työpöytänäytöillä (ja mobiilissa jos erillistä mobiilikuvaa ei ole valittu alla).',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt-teksti' }],
    }),
    defineField({
      name: 'heroBgImageMobile',
      title: 'Hero - Taustakuva mobiilille (Valinnainen, pystykuva)',
      description: '💡 Isoa maisemakuvaa on vaikea rajata kapealle mobiilinäytölle onnistuneesti. Voit ladata tähän erillisen, mobiiliin paremmin sopivan (esim. pystysuuntaisen tai lähempää rajatun) kuvan. Jos jätät tyhjäksi, mobiilissa käytetään yllä olevaa työpöytäkuvaa rajattuna.',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt-teksti' }],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero - Pääkuva / Kuva-alue oikealla',
      description: '💡 Kuvavinkki: pidempi sivu n. 1920–2500 px riittää sekä vaaka- että pystykuvissa – järjestelmä optimoi koon automaattisesti.',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt-teksti' }],
    }),
    defineField({
      name: 'heroStats',
      title: 'Hero - Tilastolaatikot (Hero-kuvan alla olevat 3 lukua)',
      description: '💡 Näytä esim. tunnuslukuja tai etuja. Suositus: täsmälleen 3 kohtaa, jotta ulkoasu pysyy siistinä.',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Tilasto',
          fields: [
            { name: 'value', type: 'string', title: 'Luku / lyhyt teksti', description: 'Esim. "100%", "Japani" tai "0 €"' },
            { name: 'label', type: 'string', title: 'Selite' },
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
      initialValue: [
        { value: '100%', label: 'Yksilöllinen OPO-ohjaus' },
        { value: 'Japani', label: 'Jiyu Gakuen -vaihto' },
        { value: '0 €', label: 'Maksuton 2. aste' },
      ],
    }),

    // --- HERO PAINIKKEET ---
    defineField({
      name: 'heroPrimaryButton',
      title: 'Hero - Pääpainike (valkoinen)',
      description: 'Jos jätät tyhjäksi, painikkeessa lukee "Tule opiskelemaan (Hakijalle)" ja se vie Hakijalle-sivulle.',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'text', type: 'string', title: 'Painikkeen teksti' },
        {
          name: 'link',
          type: 'string',
          title: 'Linkki',
          description: 'Sivuston oma sivu kauttaviivalla alkaen, esim. /hakijalle – tai koko osoite https://…',
        },
      ],
    }),
    defineField({
      name: 'heroSecondaryButton',
      title: 'Hero - Toinen painike (läpikuultava)',
      description: 'Jos jätät tyhjäksi, painikkeessa lukee "Tutustu opinto-oppaaseen" ja se vie Opinto-oppaaseen.',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'text', type: 'string', title: 'Painikkeen teksti' },
        {
          name: 'link',
          type: 'string',
          title: 'Linkki',
          description: 'Sivuston oma sivu kauttaviivalla alkaen, esim. /opiskelijalle/opinto-opas – tai koko osoite https://…',
        },
      ],
    }),

    defineField({
      name: 'heroQuickCards',
      title: 'Hero - Pikakortit (kuvan alla olevat 2 pientä linkkikorttia)',
      description: 'Ensimmäisessä kortissa on maapallo-ikoni, toisessa ihmiset-ikoni. Jos jätät tyhjäksi, näytetään Kansainvälisyys- ja OPO & Tuki -kortit.',
      type: 'array',
      validation: (rule) => rule.max(2).warning('Ulkoasuun mahtuu kaksi korttia rinnakkain.'),
      of: [
        {
          type: 'object',
          title: 'Pikakortti',
          fields: [
            { name: 'title', type: 'string', title: 'Otsikko', description: 'Esim. "Kansainvälisyys"' },
            { name: 'text', type: 'string', title: 'Pieni teksti', description: 'Esim. "Japanin vaihto-ohjelmat"' },
            {
              name: 'link',
              type: 'string',
              title: 'Linkki',
              description: 'Sivuston oma sivu kauttaviivalla alkaen, esim. /kansainvalisyys/jiyu-gakuen',
            },
          ],
          preview: { select: { title: 'title', subtitle: 'text' } },
        },
      ],
    }),

    // --- AJANKOHTAISTA- JA TAPAHTUMAKALENTERI-OSIOIDEN OTSIKOT ---
    defineField({
      name: 'newsSection',
      title: 'Ajankohtaista-osio (etusivun uutisnostojen otsikko)',
      description: 'Jos jätät kentän tyhjäksi, siinä näkyy nykyinen oletusteksti.',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'badge', type: 'string', title: 'Pieni yläteksti', description: 'Oletus: "Ajankohtaista"' },
        { name: 'title', type: 'string', title: 'Otsikko', description: 'Oletus: "Viimeisimmät uutiset ja tiedotteet"' },
        { name: 'description', type: 'text', rows: 2, title: 'Kuvausteksti' },
      ],
    }),
    defineField({
      name: 'eventsSection',
      title: 'Tapahtumakalenteri-osio (otsikko ja kuvaus)',
      description: 'Jos jätät kentän tyhjäksi, siinä näkyy nykyinen oletusteksti.',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'badge', type: 'string', title: 'Pieni yläteksti', description: 'Oletus: "Tapahtumakalenteri"' },
        { name: 'title', type: 'string', title: 'Otsikko', description: 'Oletus: "Tulevat tapahtumat & lukuvuoden tärkeät päivämäärät"' },
        { name: 'description', type: 'text', rows: 3, title: 'Kuvausteksti' },
      ],
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
      description: '💡 Kuvavinkki: pidempi sivu n. 1920–2500 px riittää sekä vaaka- että pystykuvissa – järjestelmä optimoi koon automaattisesti.',
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
            {
              name: 'image',
              type: 'image',
              title: 'Kortin kuva (Näkyy kortin yläosassa)',
              description: '💡 Pidempi sivu n. 1920–2500 px riittää hyvin.',
              options: { hotspot: true },
              fields: [{ name: 'alt', type: 'string', title: 'Alt-teksti' }]
            },
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

