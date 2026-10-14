import { defineMiddleware } from 'astro:middleware';
import { PREVIEW_COOKIE, previewCookieValue, previewStore } from './lib/preview-context';
import { previewToken } from './lib/sanity';

// The preview cookie only means something when the server has a read token to fetch
// drafts with; otherwise the request is served exactly like a normal visit.
export const onRequest = defineMiddleware(async (context, next) => {
  const preview =
    !context.isPrerendered &&
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
