import { defineType, defineField } from 'sanity';

export const quicklinkSchema = defineType({
  name: 'quicklink',
  title: 'Pikalinkit',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Linkin otsikko (esim. Wilma)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL-osoite',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Lyhyt kuvausteksti',
      type: 'string',
      initialValue: 'Avaa virallinen verkkopalvelu',
    }),

    defineField({
      name: 'icon',
      title: 'Ikoni / Tyyppi',
      type: 'string',
      options: {
        list: [
          { title: 'Wilma', value: 'wilma' },
          { title: 'Ruokalista', value: 'utensils' },
          { title: 'Opetussuunnitelma', value: 'book-open' },
          { title: 'Muu linkki', value: 'link' }
        ]
      }
    }),
    defineField({
      name: 'order',
      title: 'Järjestysnumero',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Järjestys',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url',
    },
  },
});
