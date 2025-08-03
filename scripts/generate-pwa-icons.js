const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// PWA icon sizes needed for different devices
const ICON_SIZES = [
  { size: 72, name: "icon-72x72.png" },
  { size: 96, name: "icon-96x96.png" },
  { size: 128, name: "icon-128x128.png" },
  { size: 144, name: "icon-144x144.png" },
  { size: 152, name: "icon-152x152.png" },
  { size: 192, name: "icon-192x192.png" },
  { size: 384, name: "icon-384x384.png" },
  { size: 512, name: "icon-512x512.png" },
];

async function generatePWAIcons() {
  console.log("🎨 Generating PWA icons...");

  try {
    const inputLogo = "web/assets/images/logo-crosul.png";
    const outputDir = "web/assets/icons";

    // Create icons directory
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log("📱 Creating app icons in different sizes...");

    for (const icon of ICON_SIZES) {
      const outputPath = path.join(outputDir, icon.name);

      await sharp(inputLogo)
        .resize(icon.size, icon.size, {
          fit: "contain",
          background: { r: 31, g: 62, b: 37, alpha: 1 }, // Your theme color background
        })
        .png({ quality: 100 })
        .toFile(outputPath);

      console.log(`✅ Created ${icon.name} (${icon.size}x${icon.size})`);
    }

    // Create Apple Touch Icons (for iOS)
    console.log("🍎 Creating Apple Touch Icons...");

    const appleSizes = [120, 152, 167, 180];
    for (const size of appleSizes) {
      const outputPath = path.join(
        outputDir,
        `apple-touch-icon-${size}x${size}.png`
      );

      await sharp(inputLogo)
        .resize(size, size, {
          fit: "contain",
          background: { r: 31, g: 62, b: 37, alpha: 1 },
        })
        .png({ quality: 100 })
        .toFile(outputPath);

      console.log(`✅ Created apple-touch-icon-${size}x${size}.png`);
    }

    // Create favicon
    console.log("🌐 Creating favicon...");
    await sharp(inputLogo)
      .resize(32, 32, {
        fit: "contain",
        background: { r: 31, g: 62, b: 37, alpha: 1 },
      })
      .png()
      .toFile(path.join(outputDir, "favicon-32x32.png"));

    await sharp(inputLogo)
      .resize(16, 16, {
        fit: "contain",
        background: { r: 31, g: 62, b: 37, alpha: 1 },
      })
      .png()
      .toFile(path.join(outputDir, "favicon-16x16.png"));

    console.log("\n🎉 PWA Icons generated successfully!");
    console.log(`📁 Icons saved in: ${outputDir}`);
    console.log("\n📱 Generated icons:");
    console.log("• Standard PWA icons (72px - 512px)");
    console.log("• Apple Touch Icons (iOS)");
    console.log("• Favicons (16px, 32px)");

    console.log("\n🔧 Next steps:");
    console.log("1. Update manifest.json to use new icons");
    console.log("2. Update HTML to reference new icons");
    console.log("3. Test installation on different devices");
  } catch (error) {
    console.error("❌ Error generating PWA icons:", error);
  }
}

// Run the icon generation
generatePWAIcons().catch(console.error);
