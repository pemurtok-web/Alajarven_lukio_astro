import { AsyncLocalStorage } from 'node:async_hooks';
import { createHash } from 'node:crypto';

// Per-request flag for Sanity's visual editing (Presentation tool). The middleware runs
// each request inside this store, so the content fetchers in sanity.ts can tell whether
// the current request is a Studio preview without every page having to pass it along.
// AsyncLocalStorage keeps concurrent requests separate — a module-level variable would
// leak one visitor's preview mode into another's response.
export const previewStore = new AsyncLocalStorage<{ preview: boolean }>();

export const PREVIEW_COOKIE = 'sanity-preview';

// The cookie value is derived from the server-only read token, so it can't be guessed or
// hand-crafted: only a browser that passed the Studio's secret check ever receives it.
export function previewCookieValue(token: string): string {
  return createHash('sha256').update(`sanity-preview:${token}`).digest('hex');
}

export function isPreview(): boolean {
  return previewStore.getStore()?.preview ?? false;
}
