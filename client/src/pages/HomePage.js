import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const featuredArticles = [
    {
      id: 1,
      title: "Global COVID-19 Surge: New Variant Emerges",
      description: "Latest updates on the new COVID-19 variant and its global impact on public health.",
      image: "https://cdn.who.int/media/images/default-source/health-topics/coronavirus/corona-virus-getty.tmb-1200v.jpg?sfvrsn=217a6a68_42",
      source: "WHO"
    },
    {
      id: 2,
      title: "Breakthrough in Malaria Prevention",
      description: "New developments in malaria prevention strategies.",
      image: "https://www.cdc.gov/malaria/media/images/malaria-home.jpg?_=86479",
      source: "CDC"
    },
    {
      id: 3,
      title: "European Health Crisis Alert",
      description: "Important health alerts for European regions.",
      image: "/images/categories/alerts.jpg",
      source: "ECDC"
    }
  ];

  const latestUpdates = [
    {
      id: 1,
      title: "Africa Disease Surveillance Update",
      description: "Latest health statistics and disease monitoring across Africa.",
      image: "/images/categories/surveillance.jpg",
      source: "Africa CDC",
      date: "3/22/2025"
    },
    {
      id: 2,
      title: "Uganda Health System Strengthening",
      description: "Updates on improvements in Uganda's healthcare infrastructure.",
      image: "/images/categories/updates.jpg",
      source: "Uganda MoH",
      date: "3/21/2025"
    },
    {
      id: 3,
      title: "Americas Health Emergency Response",
      description: "PAHO's latest report on health emergency preparedness.",
      image: "/images/diseases/default-health.jpg",
      source: "PAHO",
      date: "3/20/2025"
    },
    {
      id: 4,
      title: "Global Vaccination Progress Report",
      description: "WHO's comprehensive analysis of worldwide vaccination efforts.",
      image: "/images/categories/vaccination.jpg",
      source: "WHO",
      date: "3/19/2025"
    },
    {
      id: 5,
      title: "Mental Health Crisis Response",
      description: "New guidelines for addressing mental health emergencies.",
      image: "/images/categories/guidelines.jpg",
      source: "WHO",
      date: "3/18/2025"
    },
    {
      id: 6,
      title: "Tropical Disease Prevention Strategies",
      description: "Updated protocols for preventing and treating tropical diseases.",
      image: "/images/categories/prevention.jpg",
      source: "WHO",
      date: "3/17/2025"
    },
    {
      id: 7,
      title: "Healthcare Access Initiative",
      description: "New program to improve healthcare accessibility in rural areas.",
      image: "/images/diseases/default-health.jpg",
      source: "Uganda MoH",
      date: "3/16/2025"
    },
    {
      id: 8,
      title: "Infectious Disease Monitoring System",
      description: "Launch of new digital system for tracking infectious diseases.",
      image: "https://www.cdc.gov/eis/images/EIS-conf600x300.png",
      source: "CDC",
      date: "3/15/2025"
    },
    {
      id: 9,
      title: "Child Health Program Expansion",
      description: "Expansion of child healthcare services and vaccination programs.",
      image: "/images/categories/vaccination.jpg",
      source: "UNICEF",
      date: "3/14/2025"
    },
    {
      id: 10,
      title: "Environmental Health Report",
      description: "Impact of environmental factors on public health.",
      image: "https://cdn.who.int/media/images/default-source/topics/determinants-of-health/environmental-health/child-play-spraying-water.tmb-1200v.jpg?sfvrsn=2f5e2407_1",
      source: "WHO",
      date: "3/13/2025"
    },
    {
      id: 11,
      title: "Healthcare Worker Training Initiative",
      description: "New program for training healthcare workers in emerging technologies.",
      image: "/images/diseases/default-health.jpg",
      source: "Uganda MoH",
      date: "3/12/2025"
    },
    {
      id: 12,
      title: "Disease Prevention Guidelines",
      description: "Updated guidelines for preventing communicable diseases.",
      image: "/images/categories/prevention.jpg",
      source: "CDC",
      date: "3/11/2025"
    }
  ];

  return (
    <div className="home-page">
      <Container>
        <section className="featured-section">
          <div className="featured-grid">
            <div className="main-feature">
              <Link to={`/article/${featuredArticles[0].id}`}>
                <img src={featuredArticles[0].image} alt={featuredArticles[0].title} />
                <div className="feature-content">
                  <span className="card-source">{featuredArticles[0].source}</span>
                  <h2>{featuredArticles[0].title}</h2>
                  <p>{featuredArticles[0].description}</p>
                </div>
              </Link>
            </div>
            <div className="side-features">
              {featuredArticles.slice(1).map((article) => (
                <div key={article.id} className="side-feature">
                  <Link to={`/article/${article.id}`}>
                    <img src={article.image} alt={article.title} />
                    <div className="feature-content">
                      <span className="card-source">{article.source}</span>
                      <h3>{article.title}</h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="latest-updates">
          <h2 className="section-title">Latest Health Updates</h2>
          <div className="health-cards-grid">
            {latestUpdates.map((article) => (
              <article key={article.id} className="health-card">
                <div className="card-image-wrapper">
                  <img src={article.image} alt={article.title} className="card-image" />
                </div>
                <div className="card-content">
                  <div className="card-meta">
                    <span className="card-source">{article.source}</span>
                    <time>{article.date}</time>
                  </div>
                  <h3 className="card-title">{article.title}</h3>
                  <p className="card-description">{article.description}</p>
                  <Link to={`/article/${article.id}`} className="read-more">Read More</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default HomePage;
