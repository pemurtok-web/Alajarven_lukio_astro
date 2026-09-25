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
      description: 'Ulkoinen osoite (https://...) tai sisäinen polku alkaen kauttaviivalla (esim. /opiskelijalle/opetussuunnitelma)',
      type: 'url',
      validation: (Rule) =>
        Rule.required().uri({
          allowRelative: true,
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'placement',
      title: 'Missä linkki näytetään?',
      description: 'Yläpalkki = sivun ylälaidan tumma palkki (kaikilla sivuilla). Etusivun kortit = isot kortit etusivun kuvan alla.',
      type: 'string',
      options: {
        list: [
          { title: 'Yläpalkissa', value: 'topbar' },
          { title: 'Etusivun korteissa', value: 'cards' },
          { title: 'Molemmissa', value: 'both' },
        ],
        layout: 'radio',
      },
      initialValue: 'topbar',
    }),
    defineField({
      name: 'description',
      title: 'Lyhyt kuvausteksti',
      type: 'string',
      description: 'Näkyy etusivun kortissa otsikon alla. Jos tyhjä, käytetään oletustekstiä.',
    }),

    defineField({
      name: 'icon',
      title: 'Ikoni / Tyyppi',
      type: 'string',
      options: {
        list: [
          { title: 'Wilma', value: 'wilma' },
          { title: 'Ruokalista', value: 'utensils' },
          { title: 'Kirja (Opetussuunnitelma / Opinto-opas)', value: 'book-open' },
          { title: 'Asiakirja (Opintotarjotin)', value: 'file-text' },
          { title: 'Kello (Työaika)', value: 'clock' },
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
      url: 'url',
      placement: 'placement',
    },
    prepare({ title, url, placement }) {
      const where = placement === 'cards' ? 'Etusivun kortit' : placement === 'both' ? 'Yläpalkki + kortit' : 'Yläpalkki';
      return { title, subtitle: `${where} · ${url ?? ''}` };
    },
  },
});
