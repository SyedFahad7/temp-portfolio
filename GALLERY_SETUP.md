# Gallery Setup Guide

This guide will help you set up the Storyblok-powered gallery functionality in your portfolio.

## Prerequisites

1. A Storyblok account
2. One Storyblok space for your content

## Setup Steps

### 1. Install Dependencies

The required dependencies have already been added to `package.json`:
- `@storyblok/js`: ^4.0.1
- `@storyblok/react`: ^5.1.0

Run the following command to install them:
```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following variable:

```env
# Storyblok Configuration
STORYBLOK_API_TOKEN=your_storyblok_api_token_here
```

### 3. Storyblok Space Setup

1. Create a Storyblok space (or use your existing one)
2. Get your API token from Settings > API Keys
3. Add it to `STORYBLOK_API_TOKEN`

### 4. Gallery Content Structure

In your Storyblok space, create a story with the slug `gallery` with the following structure:

```json
{
  "Title": "Portfolio Gallery",
  "Description": "Explore my work and projects",
  "settings": [
    {
      "Columns": "3",
      "EnableModal": true,
      "EnableDownload": true
    }
  ],
  "images": [
    {
      "id": 1,
      "alt": "Project 1",
      "title": "Project 1",
      "source": "https://a.storyblok.com/f/your-image-url.jpg",
      "filename": "project1.jpg"
    },
    {
      "id": 2,
      "alt": "Project 2",
      "title": "Project 2", 
      "source": "https://a.storyblok.com/f/your-image-url.jpg",
      "filename": "project2.jpg"
    }
  ]
}
```

### 5. Features

The gallery includes the following features:

- **Responsive Grid**: Automatically adjusts columns based on screen size
- **Modal View**: Click images to view them in a full-screen modal
- **Download**: Download images directly from the gallery
- **Animations**: Smooth transitions and hover effects
- **Settings**: Configure columns, modal, and download options via Storyblok

### 6. Customization

You can customize the gallery by:

1. **Changing the layout**: Modify `GalleryGrid.tsx` to adjust the grid layout
2. **Custom styling**: Update the CSS classes in the components
3. **Adding filters**: Implement category or tag-based filtering
4. **Changing columns**: Update the `Columns` setting in Storyblok

### 7. Troubleshooting

If you encounter issues:

1. **Check environment variables**: Ensure your Storyblok token is set correctly
2. **Verify Storyblok content**: Make sure the `gallery` story exists in your space
3. **Check console logs**: The app logs helpful debugging information
4. **Network issues**: Ensure your Storyblok space is accessible

### 8. Navigation

The gallery is accessible via:
- The navbar icon (Images icon)
- Direct URL: `/gallery`

The gallery link has already been added to the navigation in `src/data/resume.tsx`.

### 9. Content Management

To add or update images:

1. Go to your Storyblok dashboard
2. Find the `gallery` story
3. Add new images to the `images` array
4. Publish the story
5. The changes will appear on your gallery page

Each image should have:
- `id`: Unique identifier
- `alt`: Alt text for accessibility
- `title`: Image title (displayed in modal)
- `source`: Full URL to the image
- `filename`: Filename for downloads 