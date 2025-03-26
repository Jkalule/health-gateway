/**
 * Get srcSet string for responsive images
 * @param {string} imagePath - Base path of the image
 * @param {Array<number>} sizes - Array of widths in pixels
 * @returns {string} srcSet string
 */
export const getSrcSet = (imagePath, sizes = [300, 600, 1200]) => {
  const extension = imagePath.split('.').pop();
  const basePath = imagePath.replace(`.${extension}`, '');
  
  return sizes
    .map(size => `${basePath}-${size}w.${extension} ${size}w`)
    .join(', ');
};

/**
 * Get sizes attribute for responsive images
 * @param {Object} breakpoints - Object with breakpoint configurations
 * @returns {string} sizes attribute string
 */
export const getSizes = (breakpoints = {
  sm: 300,
  md: 600,
  lg: 1200
}) => {
  const entries = Object.entries(breakpoints);
  return entries
    .map(([breakpoint, size], index) => {
      if (index === entries.length - 1) {
        return `${size}px`;
      }
      return `(max-width: ${breakpoint}px) ${size}px`;
    })
    .join(', ');
};

/**
 * Load image and get its dimensions
 * @param {string} src - Image source URL
 * @returns {Promise<{width: number, height: number}>}
 */
export const getImageDimensions = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Check if image exists
 * @param {string} url - Image URL
 * @returns {Promise<boolean>}
 */
export const imageExists = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Get aspect ratio class based on image dimensions
 * @param {number} width 
 * @param {number} height 
 * @returns {string} CSS class name
 */
export const getAspectRatioClass = (width, height) => {
  const ratio = width / height;
  if (ratio > 1.5) return 'aspect-wide';
  if (ratio < 0.75) return 'aspect-tall';
  return 'aspect-square';
};
