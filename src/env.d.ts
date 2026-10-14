/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

declare namespace App {
  interface Locals {
    /** True when the request comes from Sanity's Presentation tool (draft content + click-to-edit). */
    preview: boolean;
  }
}
