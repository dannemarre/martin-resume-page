import type { Config } from "@react-router/dev/config";
import { experiences } from "./app/generated/content";

export default {
  ssr: false,
  prerender: () => [
    "/",
    ...experiences.map((e) => `/experience/${e.slug}`),
  ],
} satisfies Config;
