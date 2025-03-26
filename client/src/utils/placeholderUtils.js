import { diseasePlaceholders } from '../config/diseasePlaceholders';

const diseaseKeywords = {
  'covid': 'covid-19',
  'coronavirus': 'covid-19',
  'flu': 'influenza',
  'h1n1': 'h1n1',
  'swine flu': 'h1n1',
  'mpox': 'mpox',
  'monkeypox': 'mpox',
  'tb': 'tuberculosis',
  'tuberculosis': 'tuberculosis',
  'malaria': 'malaria',
  'ebola': 'ebola',
  'zika': 'zika',
  'dengue': 'dengue',
  'yellow fever': 'yellow-fever',
  'hepatitis': 'hepatitis',
  'hiv': 'hiv',
  'aids': 'hiv',
  'cholera': 'cholera',
  'typhoid': 'typhoid',
  'pneumonia': 'pneumonia',
  'meningitis': 'meningitis'
};

const categoryKeywords = {
  'surveillance': 'surveillance',
  'monitoring': 'surveillance',
  'tracking': 'surveillance',
  'vaccine': 'vaccination',
  'vaccination': 'vaccination',
  'treatment': 'treatment',
  'therapy': 'treatment',
  'prevention': 'prevention',
  'preventive': 'prevention',
  'research': 'research',
  'study': 'research',
  'statistics': 'statistics',
  'data': 'statistics',
  'numbers': 'statistics',
  'alert': 'alerts',
  'warning': 'alerts',
  'update': 'updates',
  'news': 'updates',
  'guideline': 'guidelines',
  'protocol': 'guidelines'
};

export const getPlaceholderImage = (title, description) => {
  const searchText = `${title} ${description}`.toLowerCase();
  
  // First, check for specific diseases
  for (const [keyword, disease] of Object.entries(diseaseKeywords)) {
    if (searchText.includes(keyword.toLowerCase())) {
      return diseasePlaceholders[disease];
    }
  }
  
  // Then, check for categories
  for (const [keyword, category] of Object.entries(categoryKeywords)) {
    if (searchText.includes(keyword.toLowerCase())) {
      return diseasePlaceholders[category];
    }
  }
  
  // Return default placeholder if no match found
  return diseasePlaceholders.default;
};
