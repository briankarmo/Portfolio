# Logo Transparency Update for Mobile Devices

## Overview
Updated the BK Inc logo to have a transparent background, specifically to fix display issues on Samsung and other mobile devices where the logo was appearing with a black/grayish background.

**Important Note**: Mobile icons (PWA/home screen) use transparent backgrounds, but social media sharing images (Facebook/Twitter) use **black backgrounds** because social platforms don't support transparency properly. See `FACEBOOK-SOCIAL-IMAGE-FIX.md` for details.

## Changes Made

### 1. Logo Processing
- **Original Logo**: Backed up to `public/assets/bkinclogo-original.png`
- **New Transparent Logo**: `public/assets/bkinclogo.png` (now with transparent background)
- **Processing Script**: `scripts/generate-logo-icons.mjs`

### 2. Generated Icon Sizes
Created 11 optimized icon sizes for all mobile devices in `public/assets/icons/`:

| Size | Purpose |
|------|---------|
| 72x72 | Android ldpi |
| 96x96 | Android mdpi |
| 120x120 | iOS 2x |
| 128x128 | Android hdpi |
| 144x144 | Android xhdpi |
| 152x152 | iOS iPad |
| 167x167 | iOS iPad Pro |
| 180x180 | iOS 3x |
| 192x192 | Android xxhdpi / PWA manifest |
| 384x384 | Android xxxhdpi |
| 512x512 | PWA standard |

### 3. Updated Configuration Files

#### Updated `public/manifest.json`
- Replaced old icon references with new transparent logo icons
- Added all 8 key sizes for comprehensive device support
- Maintained `purpose: "any"` and `"any maskable"` flags

#### Updated `public/site.webmanifest`
- Updated to use new transparent logo icons
- Added all 8 sizes for better device compatibility

### 4. NPM Script Added
Added new script to `package.json`:
```json
"images:logo": "node scripts/generate-logo-icons.mjs"
```

Also updated `images:all` to include logo generation.

## How to Use

### Regenerate Logo Icons
If you need to regenerate the icons from a new logo file:

```bash
npm run images:logo
```

This will:
1. Create a backup of the original logo
2. Process the logo to remove white/light backgrounds
3. Generate all 11 icon sizes
4. Save them to `public/assets/icons/`

### Customization

To adjust the transparency threshold, edit `scripts/generate-logo-icons.mjs`:

```javascript
// Line ~45 - Adjust this value (240) if needed
// Higher = more aggressive background removal
if (r > 240 && g > 240 && b > 240) {
```

## Testing on Samsung Devices

To verify the fix:

1. **Clear browser cache** on your Samsung device
2. **Add to Home Screen** to test PWA icons
3. **Check in browser tab** to verify favicon displays correctly
4. **Dark mode**: Verify logo displays properly in dark mode

## Technical Details

### Why This Fix Works

Samsung browsers and many Android devices use the system's dark/light theme to render icon backgrounds. Without a transparent background:
- Light backgrounds appear black in dark mode
- Icons look inconsistent across different device themes

With transparency:
- Icons adapt to any background color
- Consistent appearance across all themes and devices
- Better PWA install experience

### Browser Support

The transparent PNG icons work on:
- ✅ All Samsung browsers
- ✅ Chrome/Edge (all platforms)
- ✅ Safari (iOS/macOS)
- ✅ Firefox
- ✅ All major PWA platforms

## Files Modified

1. `public/assets/bkinclogo.png` - Main logo (now transparent)
2. `public/manifest.json` - PWA manifest
3. `public/site.webmanifest` - Web app manifest
4. `package.json` - Added logo script
5. `scripts/generate-logo-icons.mjs` - New icon generator

## Files Created

1. `public/assets/bkinclogo-original.png` - Original logo backup
2. `public/assets/icons/bkinclogo-*.png` - 11 optimized icon sizes

---

**Last Updated**: November 7, 2025  
**Created By**: Automated logo processing script

