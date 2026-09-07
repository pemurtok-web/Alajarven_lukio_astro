import { defineType, defineField } from 'sanity';
import { commonBlock } from './commonBlock';

export const eventSchema = defineType({
  name: 'event',
  title: 'Tapahtumakalenteri',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tapahtuman nimi',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Päivämäärä',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Aika (esim. klo 10:00 - 12:00)',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Paikka / Sijainti',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Lyhyt kuvaus (näkyy etusivun kortissa)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Tapahtuman lisätiedot & ohjelma (näkyy kun tapahtuma avataan)',
      type: 'array',
      of: [
        commonBlock,
        {
          type: 'image',
          title: 'Kuva',
          description: '💡 Pidempi sivu n. 1920–2500 px riittää hyvin.',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt-teksti' }]
        },
        {
          type: 'file',
          title: 'PDF / Ladattava tiedosto',
          fields: [
            { name: 'description', type: 'string', title: 'Kuvaus / Tiedoston nimi' }
          ]
        }
      ],
    }),
    defineField({
      name: 'image',
      title: 'Tapahtuman kuva',
      description: '💡 Kuvavinkki: pidempi sivu n. 1920–2500 px riittää sekä vaaka- että pystykuvissa – järjestelmä optimoi koon automaattisesti.',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'image',
    },
  },
});
