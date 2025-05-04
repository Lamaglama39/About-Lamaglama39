import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/alpaca.tsx"),
  route("/home", "routes/home.tsx"),
  route("/blog", "routes/blog.tsx"),
  route("/apps", "routes/apps.tsx"),
  route("/profile", "routes/profile.tsx"),
] satisfies RouteConfig;
