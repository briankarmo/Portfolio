import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = path.resolve(process.cwd());
const publicDir = path.join(projectRoot, 'public');
const heroSource = path.join(publicDir, 'heroimage.png');
const bkSource = path.join(publicDir, 'BK.png');
const bkincSource = path.join(publicDir, 'BK-logo-512.png');

async function ensureSourceExists() {
  const missing = [];
  for (const p of [heroSource, bkSource]) {
    try {
      await fs.access(p);
    } catch {
      missing.push(p);
    }
  }
  if (missing.length) {
    throw new Error(`Missing required source image(s):\n${missing.join('\n')}`);
  }
}

async function generateHeroImages() {
  const base = sharp(heroSource).withMetadata().toColourspace('srgb');

  console.log('Generating comprehensive hero images for all devices and platforms...');

  // PNG icon sizes for favicon/app icons - no longer generated (BK icons are used)
  const iconPngTargets = [];

  await Promise.all(
    iconPngTargets.map(({ w, h, name }) =>
      base
        .clone()
        .resize(w, h, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ compressionLevel: 9, adaptiveFiltering: true })
        .toFile(path.join(publicDir, name))
    )
  );

  // Social preview images with extra padding for aggressive mobile cropping
  // Using original image with transparent background
  const socialTargets = [
    { w: 600, h: 315, name: 'heroImage-600x315.png' },
    { w: 1200, h: 630, name: 'heroImage-1200x630.png' }
  ];

  const metadata = await sharp(heroSource).metadata();
  
  await Promise.all(
    socialTargets.map(async ({ w, h, name }) => {
      // Scale down to 70% of height with extra top padding for mobile messaging apps
      const scaledHeight = Math.floor(h * 0.70);
      const scaledWidth = Math.floor((metadata.width / metadata.height) * scaledHeight);
      
      // Resize the image smaller first
      const resizedBuffer = await base
        .clone()
        .resize(scaledWidth, scaledHeight, { 
          fit: 'inside',
          kernel: 'lanczos3'
        })
        .toBuffer();
      
      // Get dimensions of resized image
      const resizedMeta = await sharp(resizedBuffer).metadata();
      
      // Position image lower (more top padding) to avoid mobile crop
      const topPadding = Math.floor((h - resizedMeta.height) * 0.55); // 55% of remaining space on top
      const leftPadding = Math.floor((w - resizedMeta.width) / 2);
      
      // Create transparent canvas
      return sharp({
        create: {
          width: w,
          height: h,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
      })
      .composite([{
        input: resizedBuffer,
        top: topPadding,
        left: leftPadding
      }])
      .png({ 
        compressionLevel: 6, 
        adaptiveFiltering: true,
        quality: 100
      })
      .toFile(path.join(publicDir, name));
    })
  );

  // Comprehensive device-specific widths
  const deviceWidths = {
    // Mobile Portrait
    mobile: [320, 375, 390, 414, 428, 480],
    // Mobile Landscape & Small Tablets
    mobileLandscape: [667, 736, 844, 896, 926],
    // Tablets Portrait
    tablet: [768, 810, 820, 834, 1024],
    // Tablets Landscape & Small Desktop
    tabletLandscape: [1112, 1194, 1280, 1366],
    // Desktop
    desktop: [1440, 1536, 1600, 1920, 2048, 2560],
    // 4K and beyond
    highRes: [3072, 3840, 5120]
  };

  // Flatten all widths for generation
  const allWidths = [
    ...deviceWidths.mobile,
    ...deviceWidths.mobileLandscape,
    ...deviceWidths.tablet,
    ...deviceWidths.tabletLandscape,
    ...deviceWidths.desktop,
    ...deviceWidths.highRes
  ];

  console.log(`Generating ${allWidths.length} responsive sizes in WebP, AVIF, and JPG formats...`);

  // Generate all formats for all widths
  const formatGenerations = [];

  // WebP generation (best quality/size ratio for web)
  formatGenerations.push(
    base
      .clone()
      .ensureAlpha()
      .toFormat('webp', { quality: 90, alphaQuality: 100 })
      .toFile(path.join(publicDir, 'heroimage.webp'))
  );

  // AVIF generation (next-gen format, best compression)
  formatGenerations.push(
    base
      .clone()
      .ensureAlpha()
      .toFormat('avif', { quality: 70, chromaSubsampling: '4:4:4', effort: 4 })
      .toFile(path.join(publicDir, 'heroimage.avif'))
  );

  // JPEG generation (universal fallback)
  formatGenerations.push(
    base
      .clone()
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .jpeg({ quality: 90, progressive: true, mozjpeg: true })
      .toFile(path.join(publicDir, 'heroimage.jpg'))
  );

  // Responsive variants for all widths
  for (const w of allWidths) {
    // WebP variants
    formatGenerations.push(
      base
        .clone()
        .resize(w, null, { fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'lanczos3' })
        .toFormat('webp', { quality: 90, alphaQuality: 100 })
        .toFile(path.join(publicDir, `heroimage-${w}.webp`))
    );

    // AVIF variants
    formatGenerations.push(
      base
        .clone()
        .resize(w, null, { fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'lanczos3' })
        .ensureAlpha()
        .toFormat('avif', { quality: 70, chromaSubsampling: '4:4:4', effort: 4 })
        .toFile(path.join(publicDir, `heroimage-${w}.avif`))
    );

    // JPEG variants (with white background for compatibility)
    formatGenerations.push(
      base
        .clone()
        .resize(w, null, { fit: 'inside', background: { r: 255, g: 255, b: 255 }, kernel: 'lanczos3' })
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .jpeg({ quality: 85, progressive: true, mozjpeg: true })
        .toFile(path.join(publicDir, `heroimage-${w}.jpg`))
    );

    // PNG variants for critical sizes (mobile, tablet, desktop standards)
    if ([320, 375, 414, 768, 1024, 1920].includes(w)) {
      formatGenerations.push(
        base
          .clone()
          .resize(w, null, { fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'lanczos3' })
          .png({ compressionLevel: 9, adaptiveFiltering: true })
          .toFile(path.join(publicDir, `heroimage-${w}.png`))
      );
    }
  }

  // Social media specific sizes
  console.log('Generating social media optimized images...');
  
  const socialMediaSizes = [
    // Instagram
    { w: 1080, h: 1080, name: 'heroimage-instagram-square' }, // Square post
    { w: 1080, h: 1350, name: 'heroimage-instagram-portrait' }, // Portrait post
    { w: 1080, h: 566, name: 'heroimage-instagram-landscape' }, // Landscape post
    { w: 1080, h: 1920, name: 'heroimage-instagram-story' }, // Story/Reel
    
    // Facebook
    { w: 1200, h: 630, name: 'heroimage-facebook-og' }, // Open Graph
    { w: 1200, h: 1200, name: 'heroimage-facebook-square' }, // Square post
    { w: 940, h: 788, name: 'heroimage-facebook-post' }, // Standard post
    
    // Twitter/X
    { w: 1200, h: 675, name: 'heroimage-twitter-card' }, // Twitter card
    { w: 1600, h: 900, name: 'heroimage-twitter-post' }, // Twitter post
    
    // LinkedIn
    { w: 1200, h: 627, name: 'heroimage-linkedin-og' }, // Open Graph
    { w: 1200, h: 1200, name: 'heroimage-linkedin-square' }, // Square post
    
    // Pinterest
    { w: 1000, h: 1500, name: 'heroimage-pinterest-pin' }, // Standard pin
    
    // YouTube
    { w: 1280, h: 720, name: 'heroimage-youtube-thumbnail' } // Thumbnail
  ];

  for (const { w, h, name } of socialMediaSizes) {
    // WebP
    formatGenerations.push(
      base
        .clone()
        .resize(w, h, { fit: 'cover', position: 'center', kernel: 'lanczos3' })
        .toFormat('webp', { quality: 90, alphaQuality: 100 })
        .toFile(path.join(publicDir, `${name}.webp`))
    );

    // JPEG (most compatible for social media)
    formatGenerations.push(
      base
        .clone()
        .resize(w, h, { fit: 'cover', position: 'center', kernel: 'lanczos3' })
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .jpeg({ quality: 90, progressive: true, mozjpeg: true })
        .toFile(path.join(publicDir, `${name}.jpg`))
    );

    // PNG for platforms that support transparency
    if (name.includes('instagram') || name.includes('twitter')) {
      formatGenerations.push(
        base
          .clone()
          .resize(w, h, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'lanczos3' })
          .png({ compressionLevel: 9, adaptiveFiltering: true })
          .toFile(path.join(publicDir, `${name}.png`))
      );
    }
  }

  // PWA Splash Screens for iOS
  console.log('Generating PWA splash screens...');
  
  const iosSplashSizes = [
    { w: 640, h: 1136, name: 'heroimage-splash-iphone5' },      // iPhone 5/SE
    { w: 750, h: 1334, name: 'heroimage-splash-iphone6' },      // iPhone 6/7/8
    { w: 1242, h: 2208, name: 'heroimage-splash-iphone6-plus' }, // iPhone 6+/7+/8+
    { w: 1125, h: 2436, name: 'heroimage-splash-iphonex' },     // iPhone X/XS/11 Pro
    { w: 828, h: 1792, name: 'heroimage-splash-iphonexr' },     // iPhone XR/11
    { w: 1242, h: 2688, name: 'heroimage-splash-iphonexs-max' }, // iPhone XS Max/11 Pro Max
    { w: 1170, h: 2532, name: 'heroimage-splash-iphone12' },    // iPhone 12/13/14
    { w: 1284, h: 2778, name: 'heroimage-splash-iphone12-max' }, // iPhone 12/13/14 Pro Max
    { w: 1536, h: 2048, name: 'heroimage-splash-ipad' },        // iPad
    { w: 1668, h: 2224, name: 'heroimage-splash-ipad-pro-10' }, // iPad Pro 10.5"
    { w: 1668, h: 2388, name: 'heroimage-splash-ipad-pro-11' }, // iPad Pro 11"
    { w: 2048, h: 2732, name: 'heroimage-splash-ipad-pro-12' }  // iPad Pro 12.9"
  ];

  for (const { w, h, name } of iosSplashSizes) {
    formatGenerations.push(
      base
        .clone()
        .resize(w, h, { fit: 'contain', background: { r: 255, g: 255, b: 255 }, kernel: 'lanczos3' })
        .png({ compressionLevel: 9, adaptiveFiltering: true })
        .toFile(path.join(publicDir, `${name}.png`))
    );
  }

  // Android splash screens
  const androidSplashSizes = [
    { w: 320, h: 480, name: 'heroimage-splash-android-mdpi' },    // mdpi
    { w: 480, h: 800, name: 'heroimage-splash-android-hdpi' },    // hdpi
    { w: 720, h: 1280, name: 'heroimage-splash-android-xhdpi' },  // xhdpi
    { w: 960, h: 1600, name: 'heroimage-splash-android-xxhdpi' }, // xxhdpi
    { w: 1280, h: 1920, name: 'heroimage-splash-android-xxxhdpi' } // xxxhdpi
  ];

  for (const { w, h, name } of androidSplashSizes) {
    formatGenerations.push(
      base
        .clone()
        .resize(w, h, { fit: 'contain', background: { r: 255, g: 255, b: 255 }, kernel: 'lanczos3' })
        .png({ compressionLevel: 9, adaptiveFiltering: true })
        .toFile(path.join(publicDir, `${name}.png`))
    );
  }

  // Retina/Hi-DPI variants (2x and 3x)
  console.log('Generating Retina/Hi-DPI variants...');
  
  const retinaBaseWidths = [320, 375, 414, 768, 1024, 1440, 1920];
  
  for (const w of retinaBaseWidths) {
    // 2x variants
    formatGenerations.push(
      base
        .clone()
        .resize(w * 2, null, { fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'lanczos3' })
        .toFormat('webp', { quality: 90, alphaQuality: 100 })
        .toFile(path.join(publicDir, `heroimage-${w}@2x.webp`))
    );

    formatGenerations.push(
      base
        .clone()
        .resize(w * 2, null, { fit: 'inside', background: { r: 255, g: 255, b: 255 }, kernel: 'lanczos3' })
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .jpeg({ quality: 85, progressive: true, mozjpeg: true })
        .toFile(path.join(publicDir, `heroimage-${w}@2x.jpg`))
    );

    // 3x variants for smaller screens (mobile primarily)
    if (w <= 414) {
      formatGenerations.push(
        base
          .clone()
          .resize(w * 3, null, { fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'lanczos3' })
          .toFormat('webp', { quality: 90, alphaQuality: 100 })
          .toFile(path.join(publicDir, `heroimage-${w}@3x.webp`))
      );

      formatGenerations.push(
        base
          .clone()
          .resize(w * 3, null, { fit: 'inside', background: { r: 255, g: 255, b: 255 }, kernel: 'lanczos3' })
          .flatten({ background: { r: 255, g: 255, b: 255 } })
          .jpeg({ quality: 85, progressive: true, mozjpeg: true })
          .toFile(path.join(publicDir, `heroimage-${w}@3x.jpg`))
      );
    }
  }

  // Execute all generations
  await Promise.all(formatGenerations);

  console.log(`✅ Generated ${formatGenerations.length} hero image variants!`);
  console.log('   - Responsive sizes for all devices (mobile, tablet, desktop, 4K)');
  console.log('   - Multiple formats (WebP, AVIF, JPEG, PNG)');
  console.log('   - Social media optimized (Instagram, Facebook, Twitter, LinkedIn, etc.)');
  console.log('   - PWA splash screens (iOS and Android)');
  console.log('   - Retina/Hi-DPI variants (2x and 3x)');

  // No hero .ico generated; BK favicon is the canonical icon set
}

async function run() {
  await ensureSourceExists();
  const fixAvifOnly = process.argv.includes('--fix-avif');
  if (fixAvifOnly) {
    await refineHeroAvif([512, 768]);
    console.log('Refined AVIFs generated for 512 and 768 widths');
    return;
  }
  await generateHeroImages();
  await generateBkIcons();
  await writeFaviconsFromBk();
  await generateBkincSocialImages();
  await generatePortfolioImages();
  console.log('Hero and BK images generated in /public');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});



// BK ICONS
async function generateBkIcons() {
  // Build alpha mask and apply as transparency using dest-in (keeps subject, removes bg)
  const maskBuffer = await sharp(bkSource)
    .greyscale()
    .threshold(12)
    .toBuffer();

  const iconPngTargets = [
    { w: 16, h: 16, name: 'bk-16x16.png' },
    { w: 32, h: 32, name: 'bk-32x32.png' },
    { w: 48, h: 48, name: 'bk-48x48.png' },
    { w: 64, h: 64, name: 'bk-64x64.png' },
    { w: 96, h: 96, name: 'bk-96x96.png' },
    { w: 180, h: 180, name: 'bk-180x180.png' },
    { w: 192, h: 192, name: 'bk-192x192.png' },
    { w: 256, h: 256, name: 'bk-256x256.png' },
    { w: 384, h: 384, name: 'bk-384x384.png' },
    { w: 512, h: 512, name: 'bk-512x512.png' }
  ];

  await Promise.all(
    iconPngTargets.map(({ w, h, name }) =>
      (async () => {
        // resize image and mask identically
        const resized = sharp(bkSource)
          .resize(w, h, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .ensureAlpha();
        const resizedMask = await sharp(maskBuffer)
          .resize(w, h, { fit: 'contain' })
          .toBuffer();
        return resized
          .composite([{ input: resizedMask, blend: 'dest-in' }])
          .toColourspace('srgb')
          .withMetadata()
          .png({ compressionLevel: 9, adaptiveFiltering: true })
          .toFile(path.join(publicDir, name));
      })()
    )
  );

  const icoBuffer = await sharp(bkSource)
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .composite([{ input: await sharp(maskBuffer).resize(256, 256).toBuffer(), blend: 'dest-in' }])
    .png()
    .toBuffer();
  const toIco = (await import('png-to-ico')).default;
  const ico = await toIco([icoBuffer]);
  await fs.writeFile(path.join(publicDir, 'bk.ico'), ico);
}

async function writeFaviconsFromBk() {
  // Mirror BK icons to common favicon filenames used by browsers
  const fromIco = path.join(publicDir, 'bk.ico');
  const toIco = path.join(publicDir, 'favicon.ico');
  try { await fs.copyFile(fromIco, toIco); } catch {}
  try { await fs.copyFile(path.join(publicDir, 'bk-16x16.png'), path.join(publicDir, 'favicon-16x16.png')); } catch {}
  try { await fs.copyFile(path.join(publicDir, 'bk-32x32.png'), path.join(publicDir, 'favicon-32x32.png')); } catch {}
}

async function generatePortfolioImages() {
  const portfolioDir = path.join(publicDir, 'assets', 'portfolio');
  let entries = [];
  try {
    entries = await fs.readdir(portfolioDir);
  } catch {
    return; // no portfolio folder found
  }
  const imageFiles = entries.filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f));
  if (!imageFiles.length) return;

  const targets = [
    { w: 800, h: 450 },
    { w: 400, h: 225 }
  ];

  await Promise.all(
    imageFiles.flatMap((file) => {
      const inputPath = path.join(portfolioDir, file);
      const baseName = file.replace(/\.(png|jpe?g|webp|avif)$/i, '');
      return targets.flatMap(({ w, h }) => [
        sharp(inputPath)
          .ensureAlpha()
          .resize(w, h, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .png({ compressionLevel: 9, adaptiveFiltering: true })
          .toFile(path.join(portfolioDir, `${baseName}-${w}x${h}.png`)),
        sharp(inputPath)
          .ensureAlpha()
          .resize(w, h, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .toFormat('webp', { quality: 90, alphaQuality: 100 })
          .toFile(path.join(portfolioDir, `${baseName}-${w}x${h}.webp`)),
        sharp(inputPath)
          .ensureAlpha()
          .resize(w, h, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .toFormat('avif', { quality: 65, chromaSubsampling: '4:4:4', effort: 4 })
          .toFile(path.join(portfolioDir, `${baseName}-${w}x${h}.avif`))
      ]);
    })
  );
}

async function refineHeroAvif(widths) {
  const base = sharp(heroSource).withMetadata().toColourspace('srgb');
  await Promise.all(widths.map(async (w) => {
    return base
      .clone()
      .resize(w, null, { fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'mitchell' })
      .ensureAlpha()
      .toFormat('avif', { quality: 75, chromaSubsampling: '4:4:4', effort: 4 })
      .toFile(path.join(publicDir, `heroimage-${w}.avif`));
  }));
}

async function generateBkincSocialImages() {
  try {
    await fs.access(bkincSource);
  } catch {
    console.log('BK-logo-512.png not found, skipping social image generation');
    return;
  }

  // Facebook Open Graph recommended: 1200x630
  // Twitter Summary Card: 1:1 ratio, at least 144x144
  // Create images with black background, logo contained and centered
  
  const socialTargets = [
    { w: 1200, h: 630, name: 'bkinc-og-1200x630.png' },
    { w: 1200, h: 1200, name: 'bkinc-og-1200x1200.png' }
  ];

  const metadata = await sharp(bkincSource).metadata();
  
  await Promise.all(
    socialTargets.map(async ({ w, h, name }) => {
      // Calculate the maximum size to fit the logo (smaller height-wise to fit within Facebook container)
      // Using 35% of canvas height to make it shorter, 50% width to maintain aspect ratio
      const maxLogoWidth = Math.floor(w * 0.50);  // 50% of canvas width
      const maxLogoHeight = Math.floor(h * 0.35); // 35% of canvas height (shorter)
      
      // Determine the scaling to fit within the max dimensions using contain fit
      // Use height as the limiting factor to make it shorter
      const scale = Math.min(maxLogoWidth / metadata.width, maxLogoHeight / metadata.height);
      const scaledWidth = Math.floor(metadata.width * scale);
      const scaledHeight = Math.floor(metadata.height * scale);
      
      // Resize the logo with contain fit, preserving transparency
      const resizedBuffer = await sharp(bkincSource)
        .resize(scaledWidth, scaledHeight, { 
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 },
          kernel: 'lanczos3'
        })
        .ensureAlpha()
        .toBuffer();
      
      // Center the logo on the canvas (vertically centered)
      const topPadding = Math.floor((h - scaledHeight) / 2);
      const leftPadding = Math.floor((w - scaledWidth) / 2);
      
      // Create canvas with pure black background (RGB 0,0,0)
      return sharp({
        create: {
          width: w,
          height: h,
          channels: 3, // RGB only, no alpha for solid black
          background: { r: 0, g: 0, b: 0 } // Pure black background
        }
      })
      .composite([{
        input: resizedBuffer,
        top: topPadding,
        left: leftPadding,
        blend: 'over' // Ensure logo overlays on black background
      }])
      .png({ 
        compressionLevel: 9, 
        adaptiveFiltering: true,
        quality: 100
      })
      .toFile(path.join(publicDir, name));
    })
  );
  
  console.log('BK Inc social media images generated');
}
