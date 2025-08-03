const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function optimizeImages() {
  console.log("🖼️  Starting image optimization...");

  try {
    // Create optimized directories
    const outputDir = "assets/optimized";
    const outputPreviousDir = "assets/optimized/previousImages";
    const outputWebDir = "web/assets/optimized";
    const outputWebPreviousDir = "web/assets/optimized/previousImages";

    [outputDir, outputPreviousDir, outputWebDir, outputWebPreviousDir].forEach(
      (dir) => {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      }
    );

    let originalSize = 0;
    let optimizedSize = 0;
    let processedCount = 0;

    // Process main images
    console.log("📸 Optimizing main images...");
    const mainImagesDir = "assets/images";
    const mainFiles = fs
      .readdirSync(mainImagesDir)
      .filter((file) => /\.(jpg|jpeg|png)$/i.test(file));

    for (const file of mainFiles) {
      const inputPath = path.join(mainImagesDir, file);
      const outputPath = path.join(outputDir, file);
      const webOutputPath = path.join(outputWebDir, file);

      const originalStats = fs.statSync(inputPath);
      originalSize += originalStats.size;

      if (path.extname(file).toLowerCase() === ".png") {
        await sharp(inputPath)
          .png({ quality: 80, progressive: true })
          .toFile(outputPath);

        await sharp(inputPath)
          .png({ quality: 80, progressive: true })
          .toFile(webOutputPath);
      } else {
        await sharp(inputPath)
          .jpeg({ quality: 75, progressive: true })
          .toFile(outputPath);

        await sharp(inputPath)
          .jpeg({ quality: 75, progressive: true })
          .toFile(webOutputPath);
      }

      const optimizedStats = fs.statSync(outputPath);
      optimizedSize += optimizedStats.size;
      processedCount++;

      console.log(
        `✅ ${file}: ${formatBytes(originalStats.size)} → ${formatBytes(
          optimizedStats.size
        )}`
      );
    }

    // Process previous event images
    console.log("📷 Optimizing previous event images...");
    const previousImagesDir = "assets/previousImages";
    const previousFiles = fs
      .readdirSync(previousImagesDir)
      .filter((file) => /\.(jpg|jpeg|png)$/i.test(file));

    for (const file of previousFiles) {
      const inputPath = path.join(previousImagesDir, file);
      const outputPath = path.join(outputPreviousDir, file);
      const webOutputPath = path.join(outputWebPreviousDir, file);

      const originalStats = fs.statSync(inputPath);
      originalSize += originalStats.size;

      // More aggressive compression for gallery images
      if (path.extname(file).toLowerCase() === ".png") {
        await sharp(inputPath)
          .png({ quality: 70, progressive: true })
          .toFile(outputPath);

        await sharp(inputPath)
          .png({ quality: 70, progressive: true })
          .toFile(webOutputPath);
      } else {
        await sharp(inputPath)
          .jpeg({ quality: 65, progressive: true })
          .toFile(outputPath);

        await sharp(inputPath)
          .jpeg({ quality: 65, progressive: true })
          .toFile(webOutputPath);
      }

      const optimizedStats = fs.statSync(outputPath);
      optimizedSize += optimizedStats.size;
      processedCount++;

      console.log(
        `✅ ${file}: ${formatBytes(originalStats.size)} → ${formatBytes(
          optimizedStats.size
        )}`
      );
    }

    const savings = (
      ((originalSize - optimizedSize) / originalSize) *
      100
    ).toFixed(1);

    console.log("\n✅ Image optimization complete!");
    console.log(`📊 Original size: ${formatBytes(originalSize)}`);
    console.log(`📦 Optimized size: ${formatBytes(optimizedSize)}`);
    console.log(
      `💾 Space saved: ${savings}% (${formatBytes(
        originalSize - optimizedSize
      )})`
    );
    console.log(`📸 Processed ${processedCount} images`);

    // Create update instructions
    console.log("\n🔧 Next steps:");
    console.log("1. Update your image imports to use assets/optimized/");
    console.log("2. Test the app to ensure images load correctly");
    console.log("3. Deploy the optimized version");
    console.log("\n📱 Expected performance improvements:");
    console.log(
      `• ${Math.round(
        100 - (optimizedSize / originalSize) * 100
      )}% faster image loading`
    );
    console.log(
      `• ${Math.round(
        (originalSize - optimizedSize) / 1024 / 1024
      )} MB less memory usage`
    );
    console.log("• Better user experience on slow connections");
  } catch (error) {
    console.error("❌ Error optimizing images:", error);
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Run the optimization
optimizeImages().catch(console.error);
