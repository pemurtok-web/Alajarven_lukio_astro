import { defineType, defineField } from 'sanity';

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Sivuston yleisasetukset & Logo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Sivuston nimi (Otsikko)',
      type: 'string',
      initialValue: 'ALAJÄRVEN LUKIO',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sivuston alaotsikko (Slogan)',
      type: 'string',
      initialValue: 'SIVISTYS & OSAAMINEN',
    }),
    defineField({
      name: 'logoImage',
      title: 'Oma Logo (Kuva PNG / SVG / WebP)',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt-teksti' }],
    }),
    defineField({
      name: 'address',
      title: 'Osoite (Headerin yläpalkki)',
      type: 'string',
      initialValue: 'Koulutie 1, 62900 Alajärvi',
    }),
    defineField({
      name: 'phone',
      title: 'Puhelinnumero',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Sähköposti',
      type: 'string',
    }),
  ],
});
