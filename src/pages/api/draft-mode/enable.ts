import type { APIRoute } from 'astro';
import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { PREVIEW_COOKIE, previewCookieValue } from '../../../lib/preview-context';
import { sanityClient, previewToken } from '../../../lib/sanity';

export const prerender = false;

// Called by the Studio's Presentation tool. It creates a short-lived secret in the dataset
// and puts it in the URL; validating it proves the request really comes from a logged-in
// editor, so a guessed URL can't switch anyone into draft mode.
export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  if (!sanityClient || !previewToken) {
    return new Response('Esikatselu ei ole käytössä: SANITY_API_READ_TOKEN puuttuu.', { status: 500 });
  }

  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    sanityClient.withConfig({ token: previewToken }),
    request.url,
  );
  if (!isValid) {
    return new Response('Virheellinen esikatselulinkki.', { status: 401 });
  }

  cookies.set(PREVIEW_COOKIE, previewCookieValue(previewToken), {
    path: '/',
    httpOnly: true,
    // The site runs inside the Studio's iframe, which may be on another origin
    // (sanity dev on :3333), so the cookie must be allowed in a third-party context.
    sameSite: 'none',
    secure: true,
  });
  return redirect(redirectTo, 307);
};
