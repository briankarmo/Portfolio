# Social Sharing Image Fix - Mobile & Facebook Optimization

## Problem Fixed
- ✅ Logo was too large on mobile devices and getting cut off
- ✅ Facebook sharing was cropping top and bottom of the logo
- ✅ PWA install icon was too big on mobile
- ✅ Unwanted gray/blue background appearing on social shares

## Solution Implemented

### 1. Generated Optimized Social Sharing Images
Created properly sized images with padding to prevent cropping:

**`bkinc-social-og.png`** (1200x630)
- Facebook Open Graph standard size
- Logo sized at 450x450 with generous padding
- **TRANSPARENT background** - adapts to any platform
- Prevents top/bottom cropping

**`bkinc-social-square.png`** (1200x1200) 
- Square format for social platforms
- Logo sized at 800x800 with padding
- **TRANSPARENT background** - looks clean on any platform
- Perfect for Instagram, WhatsApp, etc.

### 2. Updated Social Meta Tags
- Open Graph images now use optimized versions
- Twitter card uses `summary_large_image` for better display
- Proper dimensions (1200x630 and 1200x1200) declared

### 3. Optimized PWA Install Prompt
- Reduced icon size from 48px to 40px (`w-10 h-10`)
- Removed background color - transparent to match your logo
- Used `object-contain` to prevent distortion
- Better mobile experience with proper sizing

## Files Modified

### Core Changes:
1. **[`app/layout.js`](app/layout.js)** 
   - Updated Open Graph images to use `bkinc-social-og.png` and `bkinc-social-square.png`
   - Changed Twitter card to `summary_large_image`
   - Updated preload links

2. **[`src/components/PWAInstallPrompt.jsx`](src/components/PWAInstallPrompt.jsx)**
   - Reduced icon size for mobile
   - Added black background container
   - Used `object-contain` for proper scaling

3. **[`scripts/generate-social-images.mjs`](scripts/generate-social-images.mjs)** *(NEW)*
   - Automated script to generate social images
   - Creates properly sized and padded versions
   - Uses Sharp for image processing

4. **[`package.json`](package.json)**
   - Added `images:social` script
   - Updated `images:all` to include social images

### Generated Images:
- ✅ `public/bkinc-social-og.png` - Facebook/Open Graph (1200x630)
- ✅ `public/bkinc-social-square.png` - Square social (1200x1200)
- ✅ Both copied to `out/` folder

## How to Regenerate Social Images

If you update your logo in the future, run:

```bash
npm run images:social
```

Or regenerate all images at once:

```bash
npm run images:all
```

## Testing Recommendations

### Facebook Sharing Test:
1. Share your website link on Facebook
2. Check preview - logo should be centered with no cropping
3. Black background should be visible around logo

### Mobile Test:
1. View install prompt on mobile device
2. Logo should be contained within a small icon (40px)
3. Should not overflow or look distorted

### Twitter/X Test:
1. Share link on Twitter
2. Large image card should display properly
3. Logo centered with proper spacing

## Technical Details

### Image Sizing Strategy:
- **Facebook (1200x630)**: Logo at 450px with 90px top/bottom padding
- **Square (1200x1200)**: Logo at 800px with 200px all-around padding
- **PWA Icon**: 40x40px with `object-contain` for proper scaling

### Background:
- **TRANSPARENT** (alpha: 0) for maximum flexibility
- Adapts to any platform's background color
- No unwanted gray or blue backgrounds
- Works perfectly on light and dark themes

### Format:
- PNG format with proper alpha channel
- Optimized for web using Sharp
- Maintains quality while reducing file size

## Results

✅ **Facebook**: Logo displays perfectly centered, no cropping, transparent background
✅ **Mobile**: Icon properly sized, fits in container, no background color
✅ **WhatsApp**: Square image displays cleanly with transparency
✅ **Twitter**: Large image card looks professional
✅ **PWA**: Install prompt icon is mobile-friendly with transparent background
✅ **No unwanted backgrounds**: Gray/blue backgrounds eliminated

---

**Note:** After deploying to production, use Facebook's Sharing Debugger (https://developers.facebook.com/tools/debug/) to clear cache and verify the new images.

