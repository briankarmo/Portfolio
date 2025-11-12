# Favicon & Image Generation Guide

## Overview

This portfolio includes comprehensive favicon and image generation scripts to ensure your branding looks perfect across all devices and platforms.

## Generated Favicon Files

### 📱 Mobile & Tablet
- `apple-touch-icon.png` (180x180) - iOS home screen icon
- `android-chrome-192x192.png` (192x192) - Android home screen
- `android-chrome-512x512.png` (512x512) - Android high-res

### 💻 Desktop Browsers
- `favicon.ico` - Classic Windows favicon
- `favicon-16x16.png` - Small browser tab
- `favicon-32x32.png` - Standard browser tab
- `favicon-48x48.png` - High DPI browser tab
- `favicon-96x96.png` - Desktop bookmark
- `BK.png` (192x192) - Main favicon file

### 🪟 Windows Tiles
- `mstile-150x150.png` - Windows Start menu tile
- `browserconfig.xml` - Windows tile configuration

### 🌐 Social Media
- `bkinc-og-1200x630.png` - Facebook, LinkedIn OpenGraph
- `bkinc-og-1200x1200.png` - Twitter, Instagram square

## NPM Scripts

### Generate Favicons
```bash
npm run images:favicon
```
Generates all favicon files from the source image located at:
`public/ChatGPT Image Nov 6, 2025, 07_48_31 PM.png`

### Generate Project Images
```bash
npm run images:projects
```
Optimizes all project screenshots in `public/assets/portfolio/`:
- Creates WebP versions at 800x450 and 1200x675
- Reduces file sizes while maintaining quality
- Automatically processes all PNG files

### Generate Hero Images
```bash
npm run images:hero
```
Generates responsive hero images in multiple formats and sizes.

### Generate All Images
```bash
npm run images:all
```
Runs all image generation scripts in sequence.

## Updating Project Screenshots

When you have new project screenshots:

1. **Save PNG files** to `public/assets/portfolio/`
   - Name them descriptively (e.g., `shutterguide.png`, `modernapp.png`)
   - Recommended size: 1920x1080 or higher

2. **Run the optimization script**
   ```bash
   npm run images:projects
   ```

3. **Update `src/data.js`** with the new image imports and project details

## Favicon Theme Colors

The favicon uses a gold theme (#D4AF37) matching the BK Inc logo:
- Theme color: `#D4AF37` (Gold)
- Background: `#000000` (Black)

This is configured in:
- `public/manifest.json`
- `public/site.webmanifest`
- `app/layout.js`
- `public/browserconfig.xml`

## File Locations

### Configuration Files
- `public/manifest.json` - PWA manifest
- `public/site.webmanifest` - Alternative web manifest
- `public/browserconfig.xml` - Windows tile configuration

### Scripts
- `scripts/generate-favicon.mjs` - Favicon generation
- `scripts/generate-project-images.mjs` - Project image optimization
- `scripts/generate-hero-images.mjs` - Hero image generation

### Layout Integration
- `app/layout.js` - Next.js metadata and icon configuration

## Platform Support

✅ **Fully Supported:**
- iOS (Safari, Chrome)
- Android (Chrome, Firefox, Samsung Internet)
- Windows (Edge, Chrome, Firefox)
- macOS (Safari, Chrome, Firefox)
- Linux (Chrome, Firefox)

✅ **Social Media:**
- Facebook OpenGraph
- Twitter Cards
- LinkedIn
- Discord
- WhatsApp

## Troubleshooting

### Favicons Not Updating?
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+Shift+R)
3. Check browser DevTools > Application > Manifest
4. Verify files exist in `public/` directory

### Image Quality Issues?
- Ensure source images are high resolution (1920x1080 minimum)
- Check the quality setting in scripts (currently 85%)
- Adjust resize fit mode if needed (`cover` vs `contain`)

### Script Errors?
- Verify Sharp and png-to-ico are installed: `npm install`
- Check that source image exists at specified path
- Ensure you have write permissions in `public/` directory

## Need to Change the Logo?

1. Replace the source image: `public/ChatGPT Image Nov 6, 2025, 07_48_31 PM.png`
2. Run: `npm run images:favicon`
3. Commit the newly generated files

## Performance Notes

- WebP images are ~30% smaller than PNG
- Proper favicon sizes improve load times
- Multiple sizes ensure crisp display at any resolution
- ICO format provides maximum browser compatibility

