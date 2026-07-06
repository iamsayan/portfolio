// Central Data Fetch Layer for Sayan Datta's Portfolio
// Designed to resolve local JSON structures and allow seamless drop-in Cockpit CMS APIs integration later.
import cockpit, { type TreeEntity } from "@/lib/client";

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  experience: string;
  timezone: string;
  specialty: string;
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
  formspreeId?: string;
}

export interface RoleItem {
  position: string;
  duration: string;
  description: string;
  tech: string[];
  accomplishments: string[];
}

export interface ExperienceItem extends TreeEntity {
  company: string;
  location: string;
  type: string;
  roles: RoleItem[];
}

export interface ProjectItem {
  title: string;
  type: string;
  featured: boolean;
  category: "wordpress" | "fullstack" | "packages";
  tech: string[];
  downloads?: string;
  url: string;
  overview?: string;
  problem?: string;
  solution?: string;
  role?: string;
  challenges?: string;
  impact?: string;
  links?: { label: string; url: string }[];
  description?: string; // for secondary items
}

export interface SkillItem {
  name: string;
  level: string;
  context: string;
  tags: string[];
}

export interface SkillsData {
  core: SkillItem[];
  modern: SkillItem[];
  backend: SkillItem[];
  cms: SkillItem[];
  infra: SkillItem[];
  legacy: SkillItem[];
}

export interface FAQItem {
  q: string;
  a: string;
}

export async function getProfile(): Promise<ProfileData> {
  const data = await import("../data/profile.json");
  return data.default as ProfileData;
}

export async function getExperience(): Promise<ExperienceItem[]> {
  const data = await cockpit.getContentTree<ExperienceItem[]>("experiences", { populate: 1 });
  return data as ExperienceItem[];
}

export async function getProjects(): Promise<ProjectItem[]> {
  const data = await import("../data/projects.json");
  return data.default as ProjectItem[];
}

export async function getSkills(): Promise<SkillsData> {
  const data = await import("../data/skills.json");
  return data.default as SkillsData;
}

export async function getPhilosophy() {
  const data = await import("../data/philosophy.json");
  return data.default;
}

export async function getFAQs(): Promise<FAQItem[]> {
  const data = await import("../data/FAQs.json");
  return data.default as FAQItem[];
}

export interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  type: "colleague" | "user";
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  const data = await import("../data/testimonials.json");
  return data.default as TestimonialItem[];
}

export async function getStatistics() {
  const data = await import("../data/statistics.json");
  return data.default;
}
