import sharp from 'sharp';

export const optimizeImage = async (file, options = {}) => {
  const {
    width = 800,
    quality = 80,
    format = 'webp'
  } = options;

  try {
    const optimizedBuffer = await sharp(file)
      .resize(width, null, { withoutEnlargement: true })
      .toFormat(format, { quality })
      .toBuffer();

    return optimizedBuffer;
  } catch (error) {
    console.error('Image optimization failed:', error);
    return file;
  }
};

export const generateImageSrcSet = async (file) => {
  const sizes = [320, 640, 960, 1280];
  const srcSet = [];

  for (const width of sizes) {
    try {
      const optimized = await optimizeImage(file, { width });
      const blob = new Blob([optimized], { type: 'image/webp' });
      const url = URL.createObjectURL(blob);
      srcSet.push(`${url} ${width}w`);
    } catch (error) {
      console.error(`Failed to generate ${width}w image:`, error);
    }
  }

  return srcSet.join(', ');
};
