import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/profile/",
        "/planner/",
        "/login/",
        "/register/",
        "/forgot-password/",
        "/reset-password/",
        "/events/*/edit/",
      ],
    },

    sitemap: "https://arev-event.am/sitemap.xml",
  };
}