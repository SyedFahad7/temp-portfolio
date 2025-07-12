import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

console.log("Environment variables check:");
console.log("STORYBLOK_API_TOKEN:", process.env.STORYBLOK_API_TOKEN ? "Present" : "Missing");
console.log("STORYBLOK_GALLERY_API_TOKEN:", process.env.STORYBLOK_GALLERY_API_TOKEN ? "Present" : "Missing");

if (!process.env.STORYBLOK_API_TOKEN) {
  throw new Error("STORYBLOK_API_TOKEN is not defined");
}

console.log("Initializing Storyblok Gallery with token:", process.env.STORYBLOK_API_TOKEN.substring(0, 10) + "...");

export const storyblokGalleryApi = storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "eu",
    version: "draft"
  }
})(); 