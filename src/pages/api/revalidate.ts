import type { APIContext } from "astro";

export const prerender = false;

export async function POST(context: APIContext) {
  // Invalidate all entries tagged 'data'
  await context.cache.invalidate({ tags: ["data"] });

  return Response.json({ purged: true });
}
