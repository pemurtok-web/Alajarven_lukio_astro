import type { APIRoute } from 'astro';
import { PREVIEW_COOKIE } from '../../../lib/preview-context';

export const prerender = false;

export const GET: APIRoute = ({ cookies, redirect, url }) => {
  cookies.delete(PREVIEW_COOKIE, { path: '/', sameSite: 'none', secure: true });
  const to = url.searchParams.get('redirect');
  // Only allow same-site paths so this can't be used as an open redirect.
  return redirect(to && to.startsWith('/') && !to.startsWith('//') ? to : '/', 307);
};
