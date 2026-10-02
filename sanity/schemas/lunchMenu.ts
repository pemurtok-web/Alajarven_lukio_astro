import { defineType, defineField } from 'sanity';

export const lunchMenuSchema = defineType({
  name: 'lunchMenu',
  title: 'Koulukeskuksen ruokalista',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Otsikko',
      type: 'string',
      initialValue: 'Koulukeskuksen ruokalista',
    }),
    defineField({
      name: 'period',
      title: 'Lukuvuosi (esim. 2026–2027)',
      type: 'string',
    }),
    defineField({
      name: 'note',
      title: 'Huomautus listan alla',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'weeks',
      title: 'Ruokalistan jaksot (viikkokierto)',
      description: 'Jokainen jakso on yksi viikon ruokalista. Kirjoita jaksolle viikkonumerot, joilla se on voimassa; nykyisen viikon jakso nostetaan sivulla ylimmäksi.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'menuWeek',
          fields: [
            defineField({
              name: 'vko',
              title: 'Viikkonumerot, joilla jakso on voimassa',
              type: 'array',
              of: [{ type: 'number' }],
              options: { layout: 'tags' },
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'days',
              title: 'Päivät',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'menuDay',
                  fields: [
                    defineField({ name: 'day', title: 'Päivä', type: 'string' }),
                    defineField({
                      name: 'items',
                      title: 'Ruoat (yksi per rivi)',
                      type: 'array',
                      of: [{ type: 'string' }],
                    }),
                  ],
                  preview: {
                    select: { title: 'day', items: 'items' },
                    prepare: ({ title, items }) => ({ title, subtitle: (items || []).join(', ') }),
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { vko: 'vko' },
            prepare: ({ vko }) => ({ title: `Viikot ${(vko || []).join(', ')}` }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', period: 'period' },
    prepare: ({ title, period }) => ({ title, subtitle: period }),
  },
});
