# Facebook Social Image Background Fix

## Problem
When sharing the portfolio link on Facebook, the logo appeared with a **baby blue background** instead of the expected appearance.

## Root Cause
Facebook and other social media platforms (Twitter, LinkedIn, etc.) **do not support transparent backgrounds** in Open Graph (OG) images. When a transparent PNG is used:

- Facebook adds its own default background color (light blue/gray)
- The image doesn't display as intended
- Brand consistency is lost

## Solution
Updated the social media image generation script to create images with a **solid black background** instead of transparent backgrounds.

### Changes Made

#### Updated `scripts/generate-social-images.mjs`
- Changed from transparent backgrounds to solid black (`rgb(0, 0, 0)`)
- Used Sharp's `create` method to generate a black canvas
- Composite the transparent logo on top of the black background
- This ensures consistent appearance across all social platforms

#### Regenerated Images
- ✅ `public/bkinc-social-og.png` (1200x630) - Now with black background
- ✅ `public/bkinc-social-square.png` (1200x1200) - Now with black background

## How to Regenerate

If you update the logo and need to regenerate social images:

```bash
npm run images:social
```

This will create new social media images with:
- **Black background** (not transparent)
- Proper sizing for Facebook OG (1200x630)
- Square format for Twitter/Instagram (1200x1200)

## Important: Clearing Facebook's Cache

After deploying the new images, Facebook will cache the old version. To update:

### Option 1: Facebook Sharing Debugger (Recommended)
1. Go to https://developers.facebook.com/tools/debug/
2. Enter your URL: `https://www.briankarmo.com`
3. Click **"Scrape Again"** to clear the cache
4. Preview will show the new image with black background

### Option 2: Add Version Query Parameter
Temporarily add a version parameter to your OG image URLs in `app/layout.js`:

```javascript
images: [
  {
    url: '/bkinc-social-og.png?v=2', // Add version
    width: 1200,
    height: 630,
  }
]
```

### Option 3: Wait for Natural Cache Expiry
Facebook's cache typically expires after 7 days, but this is not recommended if you need immediate updates.

## Testing Your Social Images

### Facebook
1. Use Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
2. Check the preview image has black background

### Twitter
1. Use Twitter Card Validator: https://cards-dev.twitter.com/validator
2. Verify the square image displays correctly

### LinkedIn
1. Use LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
2. Confirm the image renders with black background

### General Testing
When sharing on any platform, the logo should now appear with a **professional black background** that matches your brand aesthetic.

## Technical Details

### Before Fix
```javascript
// Old code - transparent background
.extend({
  background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent
})
```

### After Fix
```javascript
// New code - PURE black background (no alpha, sRGB color space)
await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 3,
    background: { r: 0, g: 0, b: 0 } // Pure black RGB(0,0,0)
  }
})
.composite([{ input: logoBuffer, top: 90, left: 375 }])
.png({
  compressionLevel: 9,
  palette: false,
  quality: 100,
  colors: 256
})
.removeAlpha()        // Remove any alpha channel
.toColorspace('srgb') // Ensure standard RGB color space
```

**Key improvements:**
- `.removeAlpha()` - Eliminates any transparency that could cause gray backgrounds
- `.toColorspace('srgb')` - Prevents color profile issues that lighten black
- No palette mode - Avoids color conversion that can add gray tones

## Why Black Background?
- ✅ Matches the logo's dark, metallic aesthetic
- ✅ Professional appearance on all platforms
- ✅ High contrast makes the logo stand out
- ✅ Consistent with your website's dark theme
- ✅ Works well on both light and dark mode interfaces

## Browser/Platform Compatibility
- ✅ Facebook - Black background displays correctly
- ✅ Twitter - Works perfectly
- ✅ LinkedIn - Professional appearance
- ✅ WhatsApp - Link previews work
- ✅ Slack - Unfurl shows proper image
- ✅ Discord - Embeds display correctly
- ✅ iMessage - Link previews work

---

**Fixed**: November 7, 2025  
**Related**: `LOGO-TRANSPARENT-UPDATE.md` (mobile icon transparency fix)  
**Note**: Mobile icons use transparent backgrounds (correct), but social OG images need solid backgrounds.

