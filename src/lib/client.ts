import { CockpitClient } from "@/lib/cockpit";

const cockpit = new CockpitClient({
  host: import.meta.env.API_URL!,
  apiKey: import.meta.env.API_KEY!,
});

export default cockpit;

export type * from "@/lib/cockpit";
