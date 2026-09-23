import { defineType, defineField, defineArrayMember } from 'sanity';

// Lomakkeet-sivun (/opiskelijalle/lomakkeet) ladattavat lomakkeet. Sähköinen
// YO-ilmoittautuminen on kiinteästi sivun koodissa; tällä dokumentilla ylläpitäjä
// lisää, poistaa ja järjestää tulostettavia lomakkeita itse.
export const formsPageSchema = defineType({
  name: 'formsPage',
  title: 'Lomakkeet-sivu',
  type: 'document',
  fields: [
    defineField({
      name: 'lead',
      title: 'Sivun johdantoteksti',
      description: 'Näkyy sivun yläosassa otsikon alla. Jätä tyhjäksi, jos haluat käyttää oletustekstiä.',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'downloadableForms',
      title: 'Ladattavat lomakkeet',
      description: '💡 Lisää lomake ja lataa tiedosto (esim. PDF tai Word) TAI anna linkki ulkoiseen lomakkeeseen. Järjestystä voi muuttaa raahaamalla.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'downloadableForm',
          title: 'Lomake',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Lomakkeen nimi',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Lyhyt kuvaus',
              type: 'string',
            }),
            defineField({
              name: 'file',
              title: 'Lomaketiedosto',
              description: 'Lataa lomake tiedostona (PDF, Word tai vastaava).',
              type: 'file',
              options: { accept: '.pdf,.doc,.docx,.odt,.rtf,.xls,.xlsx' },
            }),
            defineField({
              name: 'url',
              title: 'TAI linkki ulkoiseen lomakkeeseen',
              description: 'Käytä vain, jos tiedostoa ei ole ladattu yllä (esim. Kelan lomake). Jos molemmat on annettu, tiedosto näytetään.',
              type: 'url',
              validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
            }),
          ],
          validation: (Rule) =>
            Rule.custom((value: any) =>
              value?.file?.asset || value?.url ? true : 'Lataa tiedosto tai anna linkki.'
            ),
          preview: {
            select: { title: 'title', subtitle: 'description', fileName: 'file.asset.originalFilename', url: 'url' },
            prepare: ({ title, subtitle, fileName, url }) => ({
              title,
              subtitle: fileName ? `📎 ${fileName}` : url ? `🔗 ${url}` : subtitle,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Lomakkeet-sivu' }),
  },
});
