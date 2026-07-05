// Central Data Fetch Layer for Sayan Datta's Portfolio
// Designed to resolve local JSON structures and allow seamless drop-in Cockpit CMS APIs integration later.

export async function getProfile() {
  const data = await import('../data/profile.json');
  return data.default;
}

export async function getExperience() {
  const data = await import('../data/experience.json');
  return data.default;
}

export async function getProjects() {
  const data = await import('../data/projects.json');
  return data.default;
}

export async function getSkills() {
  const data = await import('../data/skills.json');
  return data.default;
}

export async function getPhilosophy() {
  const data = await import('../data/philosophy.json');
  return data.default;
}

export async function getFAQs() {
  const data = await import('../data/FAQs.json');
  return data.default;
}

export async function getTestimonials() {
  const data = await import('../data/testimonials.json');
  return data.default;
}

export async function getStatistics() {
  const data = await import('../data/statistics.json');
  return data.default;
}
