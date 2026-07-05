export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  pubDate: Date;
  tags: string[];
  readingTime: number;
  comingSoon?: boolean;
}

const UPCOMING_POSTS: BlogPost[] = [
  {
    id: "astro-vs-nextjs-performance",
    title: "Astro vs Next.js for Content-Rich Websites",
    description:
      "An in-depth architectural comparison of Astro and Next.js for content-heavy sites. Analyzing static pre-rendering, hydration models, and bundle metrics.",
    content: "",
    pubDate: new Date("2026-07-15"),
    tags: ["Astro", "Next.js", "Web Performance"],
    readingTime: 6,
    comingSoon: true,
  },
  {
    id: "headless-wordpress-wpgraphql",
    title: "Building with WordPress as a Headless CMS",
    description:
      "A comprehensive developer's guide on leveraging WPGraphQL and Next.js to deploy WordPress as a headless content infrastructure.",
    content: "",
    pubDate: new Date("2026-07-22"),
    tags: ["WordPress", "GraphQL", "Next.js"],
    readingTime: 8,
    comingSoon: true,
  },
  {
    id: "migrating-legacy-wp-nextjs",
    title: "Migrating Legacy WordPress Architectures to Next.js",
    description:
      "Real-world case study and migration roadmap for porting legacy multi-site installations to decoupled React storefronts.",
    content: "",
    pubDate: new Date("2026-07-30"),
    tags: ["WordPress", "Next.js", "Migrations"],
    readingTime: 10,
    comingSoon: true,
  },
  {
    id: "optimizing-php-laravel-latency",
    title: "Optimizing PHP for API Performance and Database Latency",
    description:
      "Practical strategies for profiling PHP processes, database index layouts, and setting up Redis cache layers in Laravel backends.",
    content: "",
    pubDate: new Date("2026-08-05"),
    tags: ["PHP", "Laravel", "Performance"],
    readingTime: 7,
    comingSoon: true,
  },
];

export async function getBlogPosts(): Promise<BlogPost[]> {
  return UPCOMING_POSTS;
}

export async function getBlogPostById(id: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.id === id);
}
