export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  pubDate: Date;
  tags: string[];
  readingTime: number;
}

const mockMetadata = [
  {
    title: "Astro vs Next.js for Content-Rich Websites",
    description: "An in-depth architectural comparison of Astro and Next.js for content sites. Analyzing static building, hydration, and bundle sizes.",
    tags: ["Astro", "Next.js", "Web Performance"],
    readingTime: 6,
    pubDate: new Date(2026, 5, 20)
  },
  {
    title: "Building with WordPress as a Headless CMS",
    description: "A comprehensive guide on leveraging WPGraphQL and Next.js to deploy WordPress as a headless content infrastructure.",
    tags: ["WordPress", "GraphQL", "Next.js"],
    readingTime: 8,
    pubDate: new Date(2026, 5, 12)
  },
  {
    title: "Migrating Legacy WordPress Architectures to Next.js",
    description: "Case study and step-by-step optimization roadmap for migrating high-traffic legacy websites to modern frontend stacks.",
    tags: ["WordPress", "Next.js", "Migrations"],
    readingTime: 10,
    pubDate: new Date(2026, 4, 28)
  },
  {
    title: "Optimizing PHP for API Performance and Database Latency",
    description: "Practical strategies for profiling PHP configurations, tuning Laravel database indexes, and setting up Redis cache layers.",
    tags: ["PHP", "Laravel", "Performance"],
    readingTime: 7,
    pubDate: new Date(2026, 4, 15)
  }
];

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=4");
    if (!res.ok) throw new Error();
    const data = await res.json();
    
    return data.map((post: any, index: number) => {
      const meta = mockMetadata[index % mockMetadata.length];
      return {
        id: post.id.toString(),
        title: meta.title,
        description: meta.description,
        content: `<h2>${meta.title}</h2>\n\n<p>${post.body}</p>\n\n<p>This article is dynamically loaded from an external demo API (JSONPlaceholder) as a temporary integration placeholder for Cockpit CMS. In a production environment, this fetch request will target your live Cockpit CMS collection endpoint.</p>\n\n<h3>Core Principles</h3>\n<p>Integrating a headless CMS allows developers to design decoupled frontends while enabling content creators to use their choice of editor panel. This setup guarantees security by isolating database engines behind API gateways, while utilizing Astro static site generation (SSG) to pre-compile layout trees into lightweight static page files.</p>\n\n<blockquote>\n  \"Static site compilers like Astro represent a paradigm shift in web performance, eliminating runtime server delays for content-heavy sites.\"\n</blockquote>\n\n<p>Tuning configurations and caching routes via CDN nodes further reduces Cumulative Layout Shift (CLS) and Time to First Byte (TTFB), scoring high metrics on Lighthouse tests.</p>`,
        pubDate: meta.pubDate,
        tags: meta.tags,
        readingTime: meta.readingTime
      };
    });
  } catch (error) {
    console.error("Failed to fetch blog posts from API, falling back to empty list", error);
    return [];
  }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) return null;
    const post = await res.json();
    
    // Map index to metadata
    const index = (parseInt(id, 10) - 1) % mockMetadata.length;
    const meta = mockMetadata[index >= 0 ? index : 0];
    
    return {
      id: post.id.toString(),
      title: meta.title,
      description: meta.description,
      content: `<h2>${meta.title}</h2>\n\n<p>${post.body}</p>\n\n<p>This article is dynamically loaded from an external demo API (JSONPlaceholder) as a temporary integration placeholder for Cockpit CMS. In a production environment, this fetch request will target your live Cockpit CMS collection endpoint.</p>\n\n<h3>Core Principles</h3>\n<p>Integrating a headless CMS allows developers to design decoupled frontends while enabling content creators to use their choice of editor panel. This setup guarantees security by isolating database engines behind API gateways, while utilizing Astro static site generation (SSG) to pre-compile layout trees into lightweight static page files.</p>\n\n<blockquote>\n  \"Static site compilers like Astro represent a paradigm shift in web performance, eliminating runtime server delays for content-heavy sites.\"\n</blockquote>\n\n<p>Tuning configurations and caching routes via CDN nodes further reduces Cumulative Layout Shift (CLS) and Time to First Byte (TTFB), scoring high metrics on Lighthouse tests.</p>`,
      pubDate: meta.pubDate,
      tags: meta.tags,
      readingTime: meta.readingTime
    };
  } catch (error) {
    console.error(`Failed to fetch blog post ID ${id} from API`, error);
    return null;
  }
}
