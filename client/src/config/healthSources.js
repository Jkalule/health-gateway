export const healthSources = {
  WHO: {
    name: 'World Health Organization',
    baseUrl: 'www.who.int',
    imageSelectors: [
      'meta[property="og:image"]',
      '.image-feature img',
      '.sf-content-block img'
    ]
  },
  CDC: {
    name: 'Centers for Disease Control and Prevention',
    baseUrl: 'www.cdc.gov',
    imageSelectors: [
      'meta[property="og:image"]',
      '.syndicate img',
      '.card-img-top'
    ]
  },
  ECDC: {
    name: 'European Centre for Disease Prevention and Control',
    baseUrl: 'www.ecdc.europa.eu',
    imageSelectors: [
      'meta[property="og:image"]',
      '.image-container img',
      '.field-image img'
    ]
  },
  AFRICA_CDC: {
    name: 'Africa CDC',
    baseUrl: 'africacdc.org',
    imageSelectors: [
      'meta[property="og:image"]',
      '.featured-image img',
      '.entry-content img'
    ]
  },
  PAHO: {
    name: 'Pan American Health Organization',
    baseUrl: 'www.paho.org',
    imageSelectors: [
      'meta[property="og:image"]',
      '.highlight-image img',
      '.content-image img'
    ]
  },
  JHU: {
    name: 'Johns Hopkins Coronavirus Resource Center',
    baseUrl: 'coronavirus.jhu.edu',
    imageSelectors: [
      'meta[property="og:image"]',
      '.featured-image img',
      '.content-image img'
    ]
  },
  OWID: {
    name: 'Our World in Data',
    baseUrl: 'ourworldindata.org',
    imageSelectors: [
      'meta[property="og:image"]',
      '.article-image img',
      '.wp-post-image'
    ]
  },
  UGANDA_MOH: {
    name: 'Uganda Ministry of Health',
    baseUrl: 'www.health.go.ug',
    imageSelectors: [
      'meta[property="og:image"]',
      '.featured-image img',
      '.entry-content img'
    ]
  }
};
