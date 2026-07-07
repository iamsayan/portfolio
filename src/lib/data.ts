// Central Data Fetch Layer for Sayan Datta's Portfolio
//
// The site has two Cockpit CMS singletons driving dynamic content:
//   - `home`         — homepage content (stats, hero projects, credibility cards)
//   - `projectsPage` — full projects catalog (`/projects` page)
//
// All other data sources (profile, experience via the "experiences" Cockpit
// collection, skills, philosophy, FAQs, testimonials) are resolved here too —
// either from local JSON or from Cockpit — depending on what each is bound to.
import cockpit, { type Entity, type SingletonEntity, type TreeEntity } from "@/lib/client";

// ── Profile (local JSON) ─────────────────────────────────

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  experience: string;
  timezone: string;
  specialty: string;
  email: string;
  backupEmail: string;
  socials: { github: string; linkedin: string; twitter: string };
  bios: { short: string; medium: string; long: string };
}

export async function getProfile(): Promise<ProfileData> {
  const data = await import("../data/profile.json");
  return data.default as ProfileData;
}

// ── Experience (Cockpit "experiences" tree collection) ──

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

export async function getExperiences(): Promise<ExperienceItem[]> {
  const data = await cockpit.getContentTree<ExperienceItem[]>("experiences", { populate: 1 });
  return data as ExperienceItem[];
}

// ── Projects: raw Cockpit singleton (`projectsPage`) ──────

/**
 * A single link as it appears in the `links` repeater of a project in
 * Cockpit. The `title` field is the user-editable label shown on the page
 * (e.g. "WordPress Directory", "Source on GitHub"). The other fields
 * (`active`, `target`, `data`, `children`, `meta`) are Cockpit's repeater
 * metadata — preserved so the round-trip to the API is lossless.
 */
export interface ProjectLink {
  title: string;
  url: string;
  active: boolean;
  target: string;
  data: { type: string };
  children: unknown[];
  meta: unknown[];
}

/**
 * A single project as it appears inside a project's API response.
 * This is the raw API shape — pages consume these field names directly
 * with no normalization.
 *
 * Field names match Cockpit exactly:
 *   - `subtitle` — the small line under the title (e.g. "4.6★ · 5,000+ Active Installs")
 *   - `modules`  — shipped plugins / modules (e.g. Gutena's 12 block plugins)
 *   - `links[].title` — the user-editable link label
 *   - `acquired` — `true` for acquired products, `null` for everything else
 */
export interface Project extends Entity {
  title: string;
  type: string;
  category: "wordpress" | "fullstack" | "packages";
  tech: string[];
  subtitle: string;
  url: string;
  overview: string;
  problem: string;
  solution: string;
  role: string;
  challenges: string;
  impact: string;
  acquired: boolean | null;
  links: ProjectLink[];
  modules: string[];
}

/**
 * The top-level shape of the `projectsPage` singleton returned by
 * `cockpit.getContentItemByFilter("projectsPage")`. The user curates the
 * two project arrays directly in Cockpit admin.
 */
export interface ProjectsPage extends SingletonEntity {
  featuredProjects: Project[];
  projects: Project[];
}

/**
 * Whether a project is a team contribution. Derived from the `type` field:
 * the user signals team work by setting `type` to a value containing
 * "Company" (e.g. "Company Product (Expresstech)") or "Team".
 */
export function isTeamContribution(p: Project): boolean {
  const t = (p.type ?? "").toLowerCase();
  return t.includes("company") || t.includes("team");
}

/**
 * Fetch the `projectsPage` singleton from Cockpit. This is the raw API
 * response — no local fallback. If the API is unreachable or the env vars
 * are missing, the build will fail with a clear Cockpit error.
 *
 * `populate: 1` is required so the project references inside the singleton's
 * `featuredProjects[]` and `projects[]` arrays are expanded with their full
 * field data — without it, Cockpit returns just `{ _model, _id }` shells.
 */
export async function getProjectsPage(): Promise<ProjectsPage> {
  return cockpit.getContentItemByFilter<ProjectsPage>("projectsPage", { populate: 1 });
}

// ── Homepage: raw Cockpit singleton (`home`) ──────────────

/**
 * A single stat as it appears in the `stats` repeater of the `home`
 * singleton. Rendered in the homepage's hero stat bar.
 */
export interface HomeStat {
  title: string;
  value: string;
}

/**
 * A single credibility card as it appears in the `highlights` repeater of
 * the `home` singleton. Rendered in the homepage's "Credibility & Background"
 * section (3-column grid). The `pill` is the small uppercase label at the
 * top of the card (e.g. "Current Role", "Open Source", "Education").
 */
export interface HomeHighlight {
  title: string;
  subtitle: string;
  description: string;
  pill: string;
}

/**
 * The top-level shape of the `home` singleton returned by
 * `cockpit.getContentItemByFilter("home")`. The user curates every field
 * directly in Cockpit admin:
 *   - `stats`      — the 4 hero stat-bar values (e.g. "8+", "138k+", "19", "19")
 *   - `projects`   — the curated projects to feature on the homepage
 *                    (distinct from `projectsPage.featuredProjects` — these
 *                    are the user's "showcase" picks for the home page only)
 *   - `highlights` — the 3 credibility cards in the
 *                    "Credibility & Background" section
 */
export interface HomePage extends SingletonEntity {
  projects: Project[];
  highlights: HomeHighlight[];
  stats: HomeStat[];
}

/**
 * Fetch the `home` singleton from Cockpit. Same populate semantics as
 * `getProjectsPage()` — without `populate: 1`, the `projects` array would
 * return empty `{ _model, _id }` shells.
 */
export async function getHomePage(): Promise<HomePage> {
  return cockpit.getContentItemByFilter<HomePage>("home", { populate: 1 });
}

// ── Everything else: local JSON (until each is migrated) ──

export interface SkillItem {
  name: string;
  level: string;
  desc?: string;
  icon?: string;
  tags: string[];
}

export interface SkillsData {
  languages: SkillItem[];
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

export interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  type: "colleague" | "user";
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

export async function getTestimonials(): Promise<TestimonialItem[]> {
  const data = await import("../data/testimonials.json");
  return data.default as TestimonialItem[];
}
