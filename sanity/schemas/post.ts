import { defineType, defineField } from 'sanity';
import { commonBlock } from './commonBlock';

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
      description: '💡 Kuvavinkki: pidempi sivu n. 1920–2500 px riittää sekä vaaka- että pystykuvissa – järjestelmä optimoi koon automaattisesti.',
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
        commonBlock,
        {
          type: 'image',
          title: 'Kuva',
          description: '💡 Pidempi sivu n. 1920–2500 px riittää hyvin.',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt-teksti' }]
        },
        {
          type: 'object',
          name: 'youtube',
          title: 'Video tekstin sekaan (YouTube / Google Drive)',
          fields: [
            { name: 'url', type: 'url', title: 'Videon URL-osoite' },
            { name: 'caption', type: 'string', title: 'Kuvateksti / Videon otsikko' }
          ]
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
