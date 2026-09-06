import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '8idyoy2x',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skWVqeAwXd4GMMPqfBYfPlhldu1KmWKpoCPXYuRHGyv4VHPVQRS9u81oDNT25xOtcoNl2p4LN0NLZknSS',
  useCdn: false,
});

const hakijalleDoc = {
  _id: 'page-hakijalle',
  _type: 'page',
  title: 'Hakijalle – Tule opiskelemaan Alajärven lukioon!',
  slug: {
    _type: 'slug',
    current: 'hakijalle'
  },
  lead: 'Alajärven lukio on turvallinen, kannustava ja korkeatasoinen lukio Etelä-Pohjanmaalla. Tältä sivulta löydät kaiken tarvittavan tiedon yhteishakuun ja opintojen aloittamiseen.',
  layoutStyle: 'presentation',
  stats: [
    {
      _key: 'st-1',
      number: '7,00',
      label: 'YLEISLINJAN KESKIARVORAJA',
      description: 'Peruskoulun päättötodistuksen lukuaineiden keskiarvo.'
    },
    {
      _key: 'st-2',
      number: 'n. 60–70',
      label: 'ALOITUSPAIKAT',
      description: 'Aloituspaikkoja tarkistetaan vuosittain tarpeen mukaan.'
    }
  ],
  features: [
    {
      _key: 'ft-1',
      title: 'Maksuton 2. asteen koulutus',
      description: 'Opiskelijamme saavat oppikirjat, kannettavan tietokoneen ja muut oppimateriaalit veloituksetta oppivelvollisuuslain mukaisesti.',
      icon: 'check'
    },
    {
      _key: 'ft-2',
      title: 'Aito kansainvälisyys',
      description: 'Lukion pitkäaikainen yhteistyö Japanin Jiyu Gakuen -koulun ja Mukawan kaupungin kanssa avaa ainutlaatuisia vaihtomahdollisuuksia.',
      icon: 'globe'
    }
  ],
  sections: [
    {
      _key: 'sec-1',
      title: '1. Miksi valita juuri Alajärven lukio?',
      anchorId: 'miksi-alajarven-lukio',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Alajärven lukio tunnetaan hyvästä yhteishengestään, omistautuneista opettajistaan ja korkeista opiskelutuloksistaan. Pienessä ja ketterässä lukiossa et huku massaan – saat yksilöllistä ohjausta ja tukea joka vaiheessa.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h3',
          children: [{ _type: 'span', text: 'Maksuton 2. asteen koulutus & Aito kansainvälisyys' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Opiskelijamme saavat oppikirjat, kannettavan tietokoneen ja muut oppimateriaalit veloituksetta oppivelvollisuuslain mukaisesti. Lisäksi lukion perinteikäs yhteistyö Japanin Jiyu Gakuen -koulun ja Mukawan kaupungin kanssa avaa ainutlaatuisia vaihtomahdollisuuksia.'
            }
          ]
        }
      ]
    },
    {
      _key: 'sec-2',
      title: '2. Valintaperusteet ja keskiarvoraja',
      anchorId: 'valintaperusteet',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Alajärven lukioon haetaan lukuaineiden keskiarvon perusteella valtakunnallisessa yhteishaussa.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h3',
          children: [{ _type: 'span', text: 'Yleislinjan keskiarvoraja 7,00 | Aloituspaikat n. 60–70' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Keskiarvoraja lasketaan peruskoulun päättötodistuksen lukuaineiden keskiarvosta. Aloituspaikkoja tarkistetaan vuosittain tarpeen mukaan.'
            }
          ]
        }
      ]
    },
    {
      _key: 'sec-3',
      title: '3. Kuinka haetaan (Yhteishaku)',
      anchorId: 'hakeminen',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Haku lukioon tapahtuu osoitteessa Opintopolku.fi kevään yhteishaun aikana (helmi-maaliskuussa). Valitse ensimmäiseksi hakutoiveeksesi Alajärven lukio. Alajärven ja lähikuntien 9.-luokkalaisille järjestetään tutustumispäivät lukiolla keskeisinä ajankohtina. Yhteishaun tulokset julkaistaan kesäkuussa, jolloin opiskelupaikka vahvistetaan sähköisesti.'
            }
          ]
        }
      ]
    },
    {
      _key: 'sec-4',
      title: '4. Kaksoistutkinto & yhdistelmäopinnot',
      anchorId: 'yhdistelmaopinnot',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Voit yhdistää joustavasti lukio-opintojasi ammatilliseen perustutkintoon (JAMI). Kaksoistutkinnossa suoritat sekä ammatillisen tutkinnon että ylioppilastutkinnon.'
            }
          ]
        }
      ]
    },
    {
      _key: 'sec-5',
      title: '5. Monipuoliset opintopolut',
      anchorId: 'lukiolinjat',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Alajärven lukiossa voit syventää osaamistasi matemaattis-luonnontieteellisissä aineissa, vieraissa kielissä, humanistisissa aineissa sekä liikunnassa ja taiteissa.'
            }
          ]
        }
      ]
    }
  ]
};

async function seed() {
  console.log('Seeding Hakijalle page document into Sanity...');
  await client.createOrReplace(hakijalleDoc);
  console.log('Hakijalle page document successfully created/updated in Sanity!');
}

seed().catch(console.error);
