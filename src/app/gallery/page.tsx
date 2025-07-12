/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { storyblokGalleryApi } from "@/config/storyblok-gallery";
import GalleryGridWrapper from '@/components/GalleryGridWrapper';
import { GalleryHeader } from "@/components/ui/GalleryHeader";
import type { Metadata } from "next";
import BodyClassEffect from "@/components/BodyClassEffect";

interface GalleryImage {
  id: number;
  alt: string;
  name: string;
  focus: string;
  title: string;
  source: string;
  filename: string;
  copyright: string;
  fieldtype: string;
  meta_data: any;
  is_external_url: boolean;
}

interface GallerySettings {
  _uid: string;
  Columns: string;
  component: string;
  EnableModal: boolean;
  EnableDownload: boolean;
  _editable: string;
}

interface GalleryData {
  _uid: string;
  Title: string;
  Description: string;
  settings: GallerySettings[];
  images?: GalleryImage[];
  component: string;
  _editable: string;
}



export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  let galleryData: GalleryData | null = null;
  let errorMessage = null;
  let allSlugs: string[] = [];

  try {
    // Fetch all stories to debug what is available in this space
    const allStories = await storyblokGalleryApi.get("cdn/stories", { 
      version: "published", 
      cv: Date.now() 
    });
    allSlugs = allStories.data.stories.map((s: any) => s.slug);
    console.log("All slugs in gallery space:", allSlugs);

    const { data } = await storyblokGalleryApi.get("cdn/stories/gallery", {
      version: "published",
      cv: Date.now()
    });

    if (data?.story?.content) {
      galleryData = data.story.content;
    }
  } catch (error: any) {
    console.error("Error fetching gallery data:", error, error?.response?.data);
    errorMessage = error.message;
  }

  // Extract settings
  const settings = galleryData?.settings?.[0] || {};
  const columns = parseInt((settings as GallerySettings).Columns || '3');
  const enableModal = (settings as GallerySettings).EnableModal !== false;
  const enableDownload = (settings as GallerySettings).EnableDownload !== false;

  // Prepare images
  const images = Array.isArray(galleryData?.images) ? galleryData.images : [];

  return (
    <>
      <BodyClassEffect className="gallery-full-width" />
      <div className="w-full bg-white dark:bg-black min-h-screen">
        {/* Error Display */}
        {errorMessage && (
          <div className="text-center text-red-400">
            <p className="text-xl">Error: {errorMessage}</p>
            <p className="text-sm mt-2">Please check your Storyblok configuration.</p>
          </div>
        )}

        {/* Gallery Content */}
        {!errorMessage && (
          <GalleryGridWrapper
            images={images}
            columns={columns}
            enableModal={enableModal}
            enableDownload={enableDownload}
          />
        )}
      </div>
    </>
  );
} 