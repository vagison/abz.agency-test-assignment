import fs from 'fs/promises';
import sharp from 'sharp';
import tinify from 'tinify';

tinify.key = process.env.TINIFY_API;

async function optimizeImage(inputPath) {
  const tmpFile = `${inputPath}_unoptimized`;

  try {
    // Renaming inputFile to tmpFile
    await fs.rename(inputPath, tmpFile);

    // Optimizing tmpFile and saving iinto the file with the same name as inputFile
    await tinify.fromFile(tmpFile).toFile(inputPath);

    // Removing tmpFile
    await fs.rm(tmpFile);

    console.log('Image optimized successfully!');

    return { inputPath };
  } catch (error) {
    console.log('There was an error while optimizing');
    await fs.rename(tmpFile, inputPath);
  }
}

async function resizeAndOptimizeImage(inputPath, outputPath) {
  try {
    // Target dimensions
    const targetWidth = 70;
    const targetHeight = 70;

    // Cropping and saving
    await sharp(inputPath)
      .resize(targetWidth, targetHeight, {
        position: sharp.strategy.entropy,
      })
      .toFile(outputPath);
    console.log('Image cropped and resized successfully!');

    // Removing tmp file
    await fs.rm(inputPath);

    // Optimizing and saving
    await optimizeImage(outputPath);
  } catch (error) {
    console.error(error);
  }
}

export { resizeAndOptimizeImage, optimizeImage };
