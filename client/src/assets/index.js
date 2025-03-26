// Import all images
import heroBackground from './images/backgrounds/hero-bg.jpg';
import healthcareBg from './images/backgrounds/healthcare.jpg';

// Disease images
import covidImage from './images/diseases/covid-variant.jpg';
import malariaImage from './images/diseases/malaria.jpg';
import tuberculosisImage from './images/diseases/tuberculosis-placeholder.jpg';
import ebolaImage from './images/diseases/ebola-placeholder.jpg';

// Export backgrounds
export const backgrounds = {
  hero: heroBackground,
  healthcare: healthcareBg,
};

// Export disease images
export const diseaseImages = {
  covid: covidImage,
  malaria: malariaImage,
  tuberculosis: tuberculosisImage,
  ebola: ebolaImage,
};

// Helper function to get disease image
export const getDiseaseImage = (diseaseName) => {
  const normalizedName = diseaseName.toLowerCase();
  return diseaseImages[normalizedName] || diseaseImages.covid; // Default to covid if not found
};

// Helper function to get optimized image URL based on size
export const getOptimizedImageUrl = (image, size = 'medium') => {
  const sizes = {
    small: '300w',
    medium: '600w',
    large: '1200w'
  };
  
  // In a real app, you would have different sized images and return the appropriate one
  // For now, we'll just return the original image
  return image;
};
