import { defineType, defineField } from 'sanity';

export const postSchema = defineType({
  name: 'post',
  title: 'Ajankohtaista (Uutiset)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Otsikko',
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
      name: 'publishedAt',
      title: 'Julkaisupäivämäärä',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Kansikuva',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Kuvateksti / Alt-teksti',
        }
      ]
    }),
    defineField({
      name: 'excerpt',
      title: 'Lyhyt ote / Tiivistelmä',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'body',
      title: 'Tekstisisältö (Block Content)',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt-teksti' }]
        }
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'mainImage',
    },
  },
});
