import { defineType, defineField } from 'sanity';

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
      title: 'Lyhyt kuvaus',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Tapahtuman kuva',
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
