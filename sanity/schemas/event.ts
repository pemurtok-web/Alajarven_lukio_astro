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
          title: 'Kuva tekstin sekaan (Rinnakkain tai sovitetusti)',
          description: '💡 Pidempi sivu n. 1920–2500 px riittää hyvin. ⚠️ Jos haluat tekstin kiertyvän kuvan viereen ("Oikealla"/"Vasemmalla"), lisää kuva ENNEN sitä tekstikappaletta, jonka haluat näkyvän kuvan vieressä — teksti kiertyy vain kuvan JÄLKEEN tulevan sisällön kohdalla, ei ennen kuvaa olevan.',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Kuvateksti (Näkyy kuvan alla)' },
            { name: 'alt', type: 'string', title: 'Alt-teksti' },
            {
              name: 'layout',
              type: 'string',
              title: 'Kuvan sijoitus tekstissä',
              description: 'Muista: teksti asettuu kuvan viereen vain, jos se tulee kuvan JÄLKEEN sisällössä. Ennen kuvaa oleva teksti pysyy aina kuvan yläpuolella.',
              options: {
                list: [
                  { title: 'Oikealla (Teksti ja kuva rinnakkain)', value: 'right' },
                  { title: 'Vasemmalla (Teksti ja kuva rinnakkain)', value: 'left' },
                  { title: 'Koko leveydellä (Kuva tekstin ylä/alapuolella)', value: 'full' },
                  { title: 'Alkuperäinen koko (ei skaalattu, ei keskitetty, tasattu vasemmalle)', value: 'original' }
                ],
                layout: 'radio'
              },
              initialValue: 'right'
            }
          ]
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
