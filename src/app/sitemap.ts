// src/app/sitemap.ts
import type { MetadataRoute } from "next";

const routes = [
  "",
  "/about",
  "/projects",
  "/competition",
  "/graduation",
  "/contact",
  "/memory-lane",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://pan-portfolio-two.vercel.app${route}`,
    lastModified: new Date(),
  }));
}
