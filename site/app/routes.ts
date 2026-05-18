import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("experience/:slug", "routes/experience.$slug.tsx"),
] satisfies RouteConfig;
