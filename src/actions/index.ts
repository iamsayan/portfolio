import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import cockpit from "@/lib/client";

export const server = {
  submitContact: defineAction({
    accept: "json",
    input: z.object({
      name: z.string(),
      email: z.email(),
      scope: z.string(),
      message: z.string(),
      _honeypot: z.string().optional(),
    }),
    handler: async (input) => {
      const token = import.meta.env.INBOX_TOKEN;
      if (!token) {
        throw new Error("INBOX_TOKEN not set");
      }
      const response = await cockpit.submitInbox(token, {
        name: input.name,
        email: input.email,
        scope: input.scope,
        message: input.message,
        _honeypot: input._honeypot,
      });
      return response;
    },
  }),
};
