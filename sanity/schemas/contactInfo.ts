import { defineType, defineField } from 'sanity';

export const contactInfoSchema = defineType({
  name: 'contactInfo',
  title: 'Yhteystiedot - Henkilökunta & osoite',
  type: 'document',
  fields: [
    // --- JOHTO & TOIMISTO ---
    defineField({
      name: 'leadership',
      title: '👔 Rehtorit & Koulusihteeri',
      description: 'Näkyy Yhteystiedot-sivun osiossa "Rehtorit & Koulusihteeri"',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Henkilö',
          fields: [
            { name: 'name', type: 'string', title: 'Nimi' },
            { name: 'role', type: 'string', title: 'Tehtävänimike (esim. Rehtori)' },
            {
              name: 'image',
              type: 'image',
              title: 'Kuva (valinnainen)',
              description: 'Jos kuvaa ei lisätä, näytetään nimikirjaimet.',
              options: { hotspot: true },
            },
            { name: 'phone', type: 'string', title: 'Puhelinnumero (esim. 040 673 9091)' },
            { name: 'email', type: 'string', title: 'Sähköposti' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'role', media: 'image' },
          },
        },
      ],
    }),

    // --- OPO & OPISKELUHUOLTO ---
    defineField({
      name: 'studentSupport',
      title: '🤝 Opinto-ohjaus & Opiskeluhuolto',
      description: 'Näkyy Yhteystiedot-sivun osiossa "OPO & Opiskeluhuolto"',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Henkilö',
          fields: [
            { name: 'name', type: 'string', title: 'Nimi' },
            { name: 'role', type: 'string', title: 'Tehtävänimike (esim. Opinto-ohjaaja (OPO))' },
            {
              name: 'image',
              type: 'image',
              title: 'Kuva (valinnainen)',
              description: 'Jos kuvaa ei lisätä, näytetään nimikirjaimet.',
              options: { hotspot: true },
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Kuvake',
              options: {
                list: [
                  { title: '🎓 Opinto-ohjaus', value: 'graduationCap' },
                  { title: '🤝 Kuraattori / Tuki', value: 'heartHandshake' },
                  { title: '🛡️ Terveydenhoito', value: 'shieldCheck' },
                ],
              },
              initialValue: 'graduationCap',
            },
            { name: 'phone', type: 'string', title: 'Puhelinnumero' },
            { name: 'email', type: 'string', title: 'Sähköposti' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'role', media: 'image' },
          },
        },
      ],
    }),
    defineField({
      name: 'teacherOfficePhone',
      title: '☎️ Lukion opettajainhuoneen puhelin',
      type: 'string',
      initialValue: '040 685 1154',
    }),

    // --- OPETTAJAKUNTA ---
    defineField({
      name: 'teacherEmailFormat',
      title: '✉️ Opettajien sähköpostiosoitteiden muoto (esim. etunimi.sukunimi@alajarvi.fi)',
      type: 'string',
      initialValue: 'etunimi.sukunimi@alajarvi.fi',
    }),
    defineField({
      name: 'teachers',
      title: '📚 Opettajakunta',
      description: 'Näkyy Yhteystiedot-sivun osiossa "Opettajakunta"',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Opettaja',
          fields: [
            { name: 'name', type: 'string', title: 'Nimi' },
            { name: 'subjects', type: 'string', title: 'Opetettavat aineet (esim. Matematiikka, fysiikka)' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'subjects' },
          },
        },
      ],
    }),

    // --- LIIKUNTALINJAN VALMENTAJAT ---
    defineField({
      name: 'coaches',
      title: '🏆 Liikuntalinjan valmentajat',
      description: 'Näkyy Yhteystiedot-sivun osiossa "Liikuntalinjan valmentajat"',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Valmentaja',
          fields: [
            { name: 'name', type: 'string', title: 'Nimi' },
            { name: 'sport', type: 'string', title: 'Laji' },
            { name: 'club', type: 'string', title: 'Seura' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'sport' },
          },
        },
      ],
    }),

    // --- SIJAINTI & OSOITE ---
    defineField({
      name: 'schoolName',
      title: '🏫 Koulun nimi (osoitekortissa)',
      type: 'string',
      initialValue: 'Alajärven lukio',
    }),
    defineField({
      name: 'visitingAddress',
      title: '📍 Käyntiosoite',
      type: 'string',
      initialValue: 'Kaupintie 7, 62900 Alajärvi',
    }),
    defineField({
      name: 'officePhone',
      title: '☎️ Kanslian puhelinvaihde',
      type: 'string',
      initialValue: '040 6620 717',
    }),
    defineField({
      name: 'officeHours',
      title: '🕐 Kanslian aukioloajat',
      type: 'string',
      initialValue: 'Ma–Pe klo 08:00 – 15:00',
    }),
    defineField({
      name: 'mapsUrl',
      title: '🗺️ Google Maps -linkki',
      type: 'url',
      initialValue: 'https://maps.google.com/?q=Alajärven+lukio+Kaupintie+7+Alajärvi',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Yhteystiedot - Henkilökunta & osoite' };
    },
  },
});
