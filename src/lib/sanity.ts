import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || '8idyoy2x';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      useCdn: false,
      apiVersion: '2024-01-01',
    })
  : null;


const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: any) {
  if (!builder || !source || !source.asset) return null;
  try {
    return builder.image(source).auto('format').fit('max').width(1920).quality(85);
  } catch (e) {
    return null;
  }
}

export function urlForLogo(source: any) {
  if (!builder || !source || !source.asset) return null;
  try {
    return builder.image(source).auto('format').height(96).quality(95);
  } catch (e) {
    return null;
  }
}


// Interfaces
export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  mainImage?: any;
  body?: any;
}

export interface EventItem {
  _id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  image?: any;
  body?: any;
}

export interface QuickLink {
  _id: string;
  title: string;
  url: string;
  description?: string;
  icon: string;
  order: number;
}


export interface PageContent {
  _id: string;
  title: string;
  slug: { current: string };
  lead?: string;
  layoutStyle?: string;
  externalLink?: string;
  externalLinkTitle?: string;
  heroBgImage?: any;
  mainImage?: any;
  body?: any;
  gallery?: { caption?: string; alt?: string; asset?: any }[];
  pdfFiles?: { title?: string; description?: string; fileUrl?: string }[];
  sections?: { title: string; anchorId: string; content?: any }[];
  stats?: any[];
  features?: any[];
  youtubeUrl?: string;
  youtubeTitle?: string;
  youtubeCaption?: string;
}

// Fallback Mock Data
const MOCK_POSTS: Post[] = [
  {
    _id: 'mock-post-1',
    title: 'Lukuvuoden 2026–2027 avajaiset ja uusien opiskelijoiden tervetulotilaisuus',
    slug: { current: 'lukuvuoden-avajaiset-2026' },
    publishedAt: '2026-08-15T09:00:00Z',
    excerpt: 'Lämpimästi tervetuloa uuteen lukuvuoteen! Ensimmäisen vuoden opiskelijat eli ykköset aloittavat lukiotaipaleensa ryhmänohjaajien opastuksella.',
  },
  {
    _id: 'mock-post-2',
    title: 'Syksyn 2026 ylioppilaskirjoitusten aikataulu ja ohjeet kokokkaille',
    slug: { current: 'syksyn-2026-yo-kirjoitukset' },
    publishedAt: '2026-08-01T12:00:00Z',
    excerpt: 'Tärkeää tietoa syksyn ylioppilaskirjoituksiin osallistuville. Tarkista koeajankohdat, valmistautumisohjeet ja saliohjeet.',
  },
  {
    _id: 'mock-post-3',
    title: 'Kansainvälisyysryhmä suuntaa Jiyu Gakuen -vaihto-ohjelmaan Japaniin',
    slug: { current: 'jiyu-gakuen-vaihto-2026' },
    publishedAt: '2026-07-20T10:30:00Z',
    excerpt: 'Alajärven lukion ja japanilaisen Jiyu Gakuen -koulun välinen perinteikäs yhteistyö jatkuu jälleen tänä syksynä.',
  },
  {
    _id: 'mock-post-4',
    title: 'Alajärven lukion opintotarjotin lukuvuodelle 2026–2027 on julkaistu',
    slug: { current: 'opintotarjotin-julkaisu-2026' },
    publishedAt: '2026-06-10T14:00:00Z',
    excerpt: 'Tutustu ensi lukuvuoden laajaan kurssi- ja opintojaksotarjontaan. Tarjolla on monipuolisia valinnaisaineita ja jatko-opintovalmiuksia.',
  },
  {
    _id: 'mock-post-5',
    title: 'Alajärven lukion lukiolaiset menestyivät valtakunnallisessa tiedekilpailussa',
    slug: { current: 'tiedekilpailu-menestys' },
    publishedAt: '2026-05-18T11:15:00Z',
    excerpt: 'Opiskelijamme saavuttivat hienoja tuloksia matemaattis-luonnontieteellisessä kilpailussa. Onnittelut kaikille osallistujille!',
  }
];

const MOCK_EVENTS: EventItem[] = [
  {
    _id: 'mock-event-1',
    title: 'Vanhempainilta 1. vuoden opiskelijoiden huoltajille',
    date: '2026-09-15',
    time: 'klo 18:00 – 19:30',
    location: 'Lukion juhlasali',
    description: 'Ykkösten huoltajien vanhempainilta. Aiheina lukio-opinnot, Wilman käyttö ja opiskeluhuolto.'
  },
  {
    _id: 'mock-event-2',
    title: 'Syksyn Ylioppilaskirjoitukset alkavat',
    date: '2026-09-21',
    time: 'klo 09:00',
    location: 'Liikuntahalli',
    description: 'Syksyn yo-kokeet alkavat äidinkielen lukutaidon ja suomi toisena kielenä -kokeella.'
  },
  {
    _id: 'mock-event-3',
    title: 'Korkeakoulupäivä ja opintovierailu',
    date: '2026-10-08',
    time: 'klo 08:30 – 15:00',
    location: 'Seinäjoen korkeakoulukampus',
    description: 'Abiturienttien opintovierailupäivä jatko-opiskelupaikkoihin ja korkeakoulumessuille.'
  },
  {
    _id: 'mock-event-4',
    title: 'Syysloma (viikko 42)',
    date: '2026-10-12',
    time: 'Koko viikko',
    location: 'Koulu suljettu',
    description: 'Lukion syysloma 12.–18.10.2026.'
  }
];

const MOCK_QUICKLINKS: QuickLink[] = [
  {
    _id: 'mock-ql-1',
    title: 'Wilma',
    url: 'https://alajarvi.inschool.fi',
    icon: 'wilma',
    order: 1
  },
  {
    _id: 'mock-ql-2',
    title: 'Ruokalista',
    url: 'https://alajarvi.fi/ruokalistat',
    icon: 'utensils',
    order: 2
  },
  {
    _id: 'mock-ql-3',
    title: 'Opetussuunnitelma',
    url: 'https://eperusteet.opintopolku.fi',
    icon: 'book-open',
    order: 3
  }
];

// Content Fetchers with automatic fallback
export async function getTopNews(limit = 3): Promise<Post[]> {
  if (!sanityClient) return MOCK_POSTS.slice(0, limit);
  try {
    const posts = await sanityClient.fetch<Post[]>(
      `*[_type == "post"] | order(publishedAt desc)[0...$limit]{
        _id, title, slug, publishedAt, excerpt, mainImage
      }`,
      { limit }
    );
    return posts && posts.length > 0 ? posts : MOCK_POSTS.slice(0, limit);
  } catch (e) {
    console.warn('Sanity query failed, using fallback news data:', e);
    return MOCK_POSTS.slice(0, limit);
  }
}

export async function getAllNews(): Promise<Post[]> {
  if (!sanityClient) return MOCK_POSTS;
  try {
    const posts = await sanityClient.fetch<Post[]>(
      `*[_type == "post"] | order(publishedAt desc){
        _id, title, slug, publishedAt, excerpt, mainImage
      }`
    );
    return posts && posts.length > 0 ? posts : MOCK_POSTS;
  } catch (e) {
    return MOCK_POSTS;
  }
}

export async function getNewsBySlug(slug: string): Promise<Post | null> {
  if (!sanityClient) {
    return MOCK_POSTS.find(p => p.slug.current === slug) || MOCK_POSTS[0];
  }
  try {
    const post = await sanityClient.fetch<Post>(
      `*[_type == "post" && slug.current == $slug][0]{
        _id, title, slug, publishedAt, excerpt, mainImage, body
      }`,
      { slug }
    );
    return post || MOCK_POSTS.find(p => p.slug.current === slug) || MOCK_POSTS[0];
  } catch (e) {
    return MOCK_POSTS.find(p => p.slug.current === slug) || MOCK_POSTS[0];
  }
}

export async function getUpcomingEvents(): Promise<EventItem[]> {
  if (!sanityClient) return MOCK_EVENTS;
  try {
    const events = await sanityClient.fetch<EventItem[]>(
      `*[_type == "event"] | order(date asc){
        _id, title, date, time, location, description, image, body
      }`
    );
    return events && events.length > 0 ? events : MOCK_EVENTS;
  } catch (e) {
    return MOCK_EVENTS;
  }
}

export async function getQuickLinks(): Promise<QuickLink[]> {
  if (!sanityClient) return MOCK_QUICKLINKS;
  try {
    const links = await sanityClient.fetch<QuickLink[]>(
      `*[_type == "quicklink"] | order(order asc){
        _id, title, url, description, icon, order
      }`
    );

    return links && links.length > 0 ? links : MOCK_QUICKLINKS;
  } catch (e) {
    return MOCK_QUICKLINKS;
  }
}

export interface HomepageData {
  heroBadge?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroBgImage?: any;
  heroBgImageMobile?: any;
  heroImage?: any;
  introBadge?: string;
  introTitle?: string;
  introDescription?: string;
  introImage?: any;
  features?: { title: string; description: string }[];
}

const MOCK_HOMEPAGE: HomepageData = {
  heroBadge: 'Laadukasta lukio-opetusta Alajärvellä',
  heroTitle: 'Rakenna tulevaisuutesi Alajärven lukiossa',
  heroDescription: 'Tarjoamme turvallisen, yhteisöllisen ja nykyaikaisen oppimisympäristön. Meillä saat yksilöllistä ohjausta, vahvat valmiudet jatko-opintoihin sekä ainutlaatuisia kansainvälisyyskokemuksia muun muassa Japanin vaihto-ohjelmissa.',
  introBadge: 'Miksi valita Alajärven lukio?',
  introTitle: 'Moderni lukio, jossa sinun tavoitteesi ovat keskiössä',
  introDescription: 'Alajärven lukio tarjoaa erinomaiset puitteet yleissivistävälle lukio-opiskelulle. Meillä yhdistyvät monipuolinen opintotarjotin, joustavat opintopolut sekä innostavat oppimisympäristöt.',
  features: [
    { title: 'Maksuttomat oppimateriaalit', description: 'Kaikki tietokoneet, oppikirjat ja yo-ilmoittautumiset maksutta.' },
    { title: 'Japanin vaihto-ohjelma', description: 'Mahdollisuus osallistua ainutlaatuiseen Jiyu Gakuen -yhteistyöhön.' },
    { title: 'Monipuolinen yhdistelmä tutkintoja', description: 'Mahdollisuus yhdistää lukio-opintoja ammatilliseen tutkintoon.' },
    { title: 'Korkeakouluyhteistyö', description: 'Väyläopintoja ja kurssikurkkauksia yliopistoihin ja amk:eihin.' }
  ]
};

export async function getHomepage(): Promise<HomepageData> {
  if (!sanityClient) return MOCK_HOMEPAGE;
  try {
    const data = await sanityClient.fetch<HomepageData>(
      `*[_type == "homepage"] | order(_updatedAt desc)[0]{
        heroBadge, heroTitle, heroDescription, heroBgImage, heroBgImageMobile, heroImage, introBadge, introTitle, introDescription, introImage, features
      }`
    );
    return data || MOCK_HOMEPAGE;
  } catch (e) {
    return MOCK_HOMEPAGE;
  }
}


export async function getPageBySlug(slug: string): Promise<PageContent | null> {
  if (!sanityClient) {
    return {
      _id: `mock-page-${slug}`,
      title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      slug: { current: slug }
    };
  }
  try {
    const page = await sanityClient.fetch<PageContent>(
      `*[_type == "page" && (_id == $slug || _id == "page-" + $slug || _id == "drafts.page-" + $slug || slug.current == $slug || slug.current == "lukion-" + $slug || slug.current match $slug + "*")] | order(_updatedAt desc)[0]{
        _id, title, slug, lead, layoutStyle, externalLink, externalLinkTitle,
        body[]{
          ...,
          _type == "file" => {
            "fileUrl": asset->url,
            description
          }
        },
        pdfFiles[]{
          title,
          description,
          "fileUrl": asset->url
        },
        gallery,
        sections[]{
          ...,
          content[]{
            ...,
            _type == "file" => {
              "fileUrl": asset->url,
              description
            }
          }
        }, heroBgImage, mainImage, stats, features, youtubeUrl, youtubeTitle, youtubeCaption
      }`,
      { slug }
    );
    return page || {
      _id: `mock-page-${slug}`,
      title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      slug: { current: slug }
    };
  } catch (e) {
    return {
      _id: `mock-page-${slug}`,
      title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      slug: { current: slug }
    };
  }
}

export interface SiteSettings {
  title?: string;
  subtitle?: string;
  logoImage?: any;
  address?: string;
  phone?: string;
  email?: string;
}

const MOCK_SITE_SETTINGS: SiteSettings = {
  title: 'ALAJÄRVEN LUKIO',
  subtitle: 'Sivistys & Osaaminen',
  address: 'Koulutie 1, 62900 Alajärvi',
};

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!sanityClient) return MOCK_SITE_SETTINGS;
  try {
    const settings = await sanityClient.fetch<SiteSettings>(
      `*[_type == "siteSettings"] | order(_updatedAt desc)[0]{
        title, subtitle, logoImage, address, phone, email
      }`
    );
    return settings || MOCK_SITE_SETTINGS;
  } catch (e) {
    return MOCK_SITE_SETTINGS;
  }
}


export interface ContactPerson {
  name?: string;
  role?: string;
  icon?: string;
  phone?: string;
  email?: string;
}

export interface ContactCoach {
  name?: string;
  sport?: string;
  club?: string;
}

export interface ContactInfo {
  leadership?: ContactPerson[];
  studentSupport?: ContactPerson[];
  teacherOfficePhone?: string;
  teacherEmailFormat?: string;
  teachers?: { name?: string; subjects?: string }[];
  coaches?: ContactCoach[];
  schoolName?: string;
  visitingAddress?: string;
  officePhone?: string;
  officeHours?: string;
  mapsUrl?: string;
}

const MOCK_CONTACT_INFO: ContactInfo = {
  leadership: [
    { name: 'Anne Luodeslampi', role: 'Rehtori', phone: '040 673 9091', email: 'anne.luodeslampi@alajarvi.fi' },
    { name: 'Sari Mäkelä', role: 'Apulaisrehtori', phone: '040 568 8322', email: 'sari.makela@alajarvi.fi' },
    { name: 'Satu Mäkelä', role: 'Koulusihteeri / Kanslia', phone: '040 662 0717', email: 'satu.makela@alajarvi.fi' },
  ],
  studentSupport: [
    { name: 'Anne Yli-Sissala', role: 'Opinto-ohjaaja (OPO)', icon: 'graduationCap', phone: '044 297 0314', email: 'anne.yli-sissala@alajarvi.fi' },
    { name: 'Antti Latvala', role: 'Kuraattori', icon: 'heartHandshake', phone: '040 534 9442', email: 'antti.latvala@hyvaep.fi' },
    { name: 'Noora Myllymäki', role: 'Terveydenhoitaja', icon: 'shieldCheck', phone: '044 465 9532', email: 'noora.myllymaki@hyvaep.fi' },
  ],
  teacherOfficePhone: '040 685 1154',
  teacherEmailFormat: 'etunimi.sukunimi@alajarvi.fi',
  teachers: [],
  coaches: [],
  schoolName: 'Alajärven lukio',
  visitingAddress: 'Kaupintie 7, 62900 Alajärvi',
  officePhone: '040 6620 717',
  officeHours: 'Ma–Pe klo 08:00 – 15:00',
  mapsUrl: 'https://maps.google.com/?q=Alajärven+lukio+Kaupintie+7+Alajärvi',
};

export async function getContactInfo(): Promise<ContactInfo> {
  if (!sanityClient) return MOCK_CONTACT_INFO;
  try {
    const info = await sanityClient.fetch<ContactInfo>(
      `*[_type == "contactInfo"] | order(_updatedAt desc)[0]{
        leadership, studentSupport, teacherOfficePhone, teacherEmailFormat,
        teachers, coaches, schoolName, visitingAddress, officePhone, officeHours, mapsUrl
      }`
    );
    return info || MOCK_CONTACT_INFO;
  } catch (e) {
    return MOCK_CONTACT_INFO;
  }
}

export async function getAllPages(): Promise<PageContent[]> {
  if (!sanityClient) return [];
  try {
    const pages = await sanityClient.fetch<PageContent[]>(
      `*[_type == "page"] | order(_updatedAt desc){
        _id, title, slug
      }`
    );
    return pages || [];
  } catch (e) {
    return [];
  }
}

export function extractPageAnchors(page: any): { id: string; label: string }[] {
  if (!page) return [];
  const anchors: { id: string; label: string }[] = [];

  // 1. From page.sections
  if (page.sections && Array.isArray(page.sections)) {
    page.sections.forEach((sec: any, idx: number) => {
      if (sec.title) {
        anchors.push({
          id: sec.anchorId || `aihe-${idx + 1}`,
          label: sec.title,
        });
      }
    });
  }

  // 2. From PortableText body headings (H2 & H3)
  if (page.body && Array.isArray(page.body)) {
    page.body.forEach((block: any, idx: number) => {
      if (block._type === 'block' && (block.style === 'h2' || block.style === 'h3')) {
        const text = block.children?.map((c: any) => c.text).join('') || '';
        if (text) {
          anchors.push({
            id: `heading-${idx}`,
            label: text,
          });
        }
      }
    });
  }

  return anchors;
}

export interface BodyCard {
  title?: string;
  anchorId?: string;
  blocks: any[];
}

export function splitBodyIntoCards(body: any[]): BodyCard[] {
  if (!body || !Array.isArray(body) || body.length === 0) return [];

  const cards: BodyCard[] = [];
  let currentCard: BodyCard | null = null;

  body.forEach((block: any, idx: number) => {
    if (block._type === 'block' && (block.style === 'h2' || block.style === 'h3')) {
      if (currentCard && (currentCard.title || currentCard.blocks.length > 0)) {
        cards.push(currentCard);
      }
      const titleText = block.children?.map((c: any) => c.text).join('') || '';
      currentCard = {
        title: titleText,
        anchorId: `heading-${idx}`,
        blocks: [],
      };
    } else {
      if (!currentCard) {
        currentCard = { blocks: [] };
      }
      currentCard.blocks.push(block);
    }
  });

  if (currentCard && (currentCard.title || currentCard.blocks.length > 0)) {
    cards.push(currentCard);
  }

  return cards;
}



