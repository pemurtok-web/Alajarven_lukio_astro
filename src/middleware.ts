import { defineMiddleware } from 'astro:middleware';
import { PREVIEW_COOKIE, previewCookieValue, previewStore } from './lib/preview-context';
import { previewToken } from './lib/sanity';

// The preview cookie only means something when the server has a read token to fetch
// drafts with; otherwise the request is served exactly like a normal visit.
//
// The cookie outlives the Studio session (it lasts until the browser closes), so an editor
// opening the site in a normal tab would otherwise see drafts and edit frames there too and
// could mistake an unpublished draft for live content. Browsers tell us whether a page is
// loaded inside an iframe (Sec-Fetch-Dest), so preview is limited to the Studio's frame.
// Browsers too old to send the header keep the cookie-only behaviour.
export const onRequest = defineMiddleware(async (context, next) => {
  const fetchDest = context.request.headers.get('sec-fetch-dest');
  const inStudioFrame = !fetchDest || fetchDest === 'iframe';
  const preview =
    !context.isPrerendered &&
    inStudioFrame &&
    Boolean(previewToken) &&
    context.cookies.get(PREVIEW_COOKIE)?.value === previewCookieValue(previewToken!);
  context.locals.preview = preview;

  const response = await previewStore.run({ preview }, next);
  if (preview) {
    // Draft content must never be cached anywhere a regular visitor could receive it.
    response.headers.set('Cache-Control', 'private, no-store');
  }
  return response;
});
