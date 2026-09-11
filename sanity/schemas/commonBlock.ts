import { defineArrayMember } from 'sanity';

export const commonBlock = defineArrayMember({
  type: 'block',
  styles: [
    { title: 'Normaali teksti (Pienennä / Poista sisennys)', value: 'normal' },
    { title: 'Otsikko 2 (H2)', value: 'h2' },
    { title: 'Otsikko 3 (H3)', value: 'h3' },
    { title: 'Lainaus / Sitatti', value: 'blockquote' },
    { title: '➡️ Sisennetty teksti (1. taso - Suurenna sisennystä)', value: 'indent-1' },
    { title: '⏩ Sisennetty teksti (2. taso - Suurenna sisennystä)', value: 'indent-2' },
    { title: '⏭️ Sisennetty teksti (3. taso - Suurenna sisennystä)', value: 'indent-3' },
  ],
  lists: [
    { title: '• Luettelomerkit (Sisennys: Tab / Shift+Tab)', value: 'bullet' },
    { title: '1. Numerointi (Sisennys: Tab / Shift+Tab)', value: 'number' },
  ],
  marks: {
    decorators: [
      { title: 'Lihavoitu (Bold)', value: 'strong' },
      { title: 'Kursiivi (Italic)', value: 'em' },
      { title: 'Alleviivattu (Underline)', value: 'underline' },
      { title: 'Yliviivattu (Strikethrough)', value: 'strike-through' },
      { title: 'Koodi', value: 'code' },
    ],
    annotations: [
      {
        name: 'link',
        type: 'object',
        title: 'Verkkolinkki (URL)',
        fields: [
          {
            name: 'href',
            type: 'url',
            title: 'Osoite',
            description: 'Ulkoinen linkki (esim. https://...) TAI sivuston oma sisäinen sivu (esim. /opiskelijalle/yo-ilmoittautuminen). Sähköposti- ja puhelinlinkit: mailto:... / tel:...',
            validation: (Rule) =>
              Rule.required()
                .error('Linkille on annettava osoite')
                .uri({
                  allowRelative: true,
                  scheme: ['http', 'https', 'mailto', 'tel'],
                }),
          },
          {
            name: 'style',
            type: 'string',
            title: 'Ulkoasu',
            description: 'Näkyykö linkki tavallisena tekstilinkkinä, vai halutaanko se erottuvan huomiopainikkeena',
            options: {
              list: [
                { title: 'Normaali linkki', value: 'inline' },
                { title: 'Painike (korostettu)', value: 'button' },
              ],
              layout: 'radio',
            },
            initialValue: 'inline',
          },
          {
            name: 'size',
            type: 'string',
            title: 'Painikkeen koko',
            description: 'Käytä "Suuri", kun painikkeen pitää erottua sivulla varmasti (esim. tärkeä ilmoittautuminen)',
            options: {
              list: [
                { title: 'Normaali', value: 'normal' },
                { title: 'Suuri (erottuu selvästi)', value: 'large' },
              ],
              layout: 'radio',
            },
            initialValue: 'normal',
            hidden: ({ parent }: any) => parent?.style !== 'button',
          },
        ],
      },
    ],
  },
});
