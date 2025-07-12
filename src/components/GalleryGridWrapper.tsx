import dynamic from "next/dynamic";

// Dynamically import GalleryGrid to avoid SSR issues with Framer Motion
const GalleryGrid = dynamic(() => import("./GalleryGrid"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>
  ),
});

export default GalleryGrid; 