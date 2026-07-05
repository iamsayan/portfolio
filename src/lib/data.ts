// Central Data Fetch Layer for Sayan Datta's Portfolio
// Designed to resolve local JSON structures and allow seamless drop-in Cockpit CMS APIs integration later.

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  email: string;
  backupEmail: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  bios: {
    short: string;
    medium: string;
    long: string;
  };
}

export interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  description: string;
  bullets: string[];
  tech: string[];
}

export interface ProjectItem {
  title: string;
  type: string;
  description: string;
  outcome?: string;
  category: "wordpress" | "fullstack" | "packages";
  tech: string[];
  downloads?: string;
  url: string;
}

export interface SkillsData {
  categories: {
    name: string;
    desc: string;
    skills: { name: string; pct: string; context: string }[];
  }[];
  additional: string[];
}

export interface FAQItem {
  q: string;
  a: string;
}

export async function getProfile(): Promise<ProfileData> {
  const data = await import('../data/profile.json');
  return data.default as ProfileData;
}

export async function getExperience(): Promise<ExperienceItem[]> {
  const data = await import('../data/experience.json');
  return data.default as ExperienceItem[];
}

export async function getProjects(): Promise<ProjectItem[]> {
  const data = await import('../data/projects.json');
  return data.default as ProjectItem[];
}

export async function getSkills(): Promise<SkillsData> {
  const data = await import('../data/skills.json');
  return data.default as SkillsData;
}

export async function getPhilosophy() {
  const data = await import('../data/philosophy.json');
  return data.default;
}

export async function getFAQs(): Promise<FAQItem[]> {
  const data = await import('../data/FAQs.json');
  return data.default as FAQItem[];
}

export async function getTestimonials() {
  const data = await import('../data/testimonials.json');
  return data.default;
}

export async function getStatistics() {
  const data = await import('../data/statistics.json');
  return data.default;
}
