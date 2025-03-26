import axios from 'axios';
import { load } from 'cheerio';
import { healthSources } from '../config/healthSources';
import { getPlaceholderImage } from './placeholderUtils';

const getSourceConfig = (url) => {
  const hostname = new URL(url).hostname.toLowerCase();
  return Object.values(healthSources).find(source => 
    hostname.includes(source.baseUrl.toLowerCase())
  );
};

export const scrapeHealthImage = async (url, title, description) => {
  try {
    const response = await axios.get(url);
    const $ = load(response.data);
    
    const sourceConfig = getSourceConfig(url);
    if (!sourceConfig) {
      console.warn('Unknown source for URL:', url);
      return getPlaceholderImage(title, description);
    }

    // Try each selector from the source configuration
    for (const selector of sourceConfig.imageSelectors) {
      let imageUrl;
      if (selector.startsWith('meta')) {
        imageUrl = $(selector).attr('content');
      } else {
        imageUrl = $(selector).first().attr('src');
      }

      if (imageUrl) {
        // Handle relative URLs
        if (imageUrl.startsWith('/')) {
          return `https://${sourceConfig.baseUrl}${imageUrl}`;
        }
        return imageUrl;
      }
    }
    
    // Return a disease-specific placeholder if no image is found
    return getPlaceholderImage(title, description);
  } catch (error) {
    console.error(`Error scraping image from ${url}:`, error);
    return getPlaceholderImage(title, description);
  }
};
