import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import OptimizedImage from '../components/common/OptimizedImage';
import EmergencyUpdates from '../components/home/EmergencyUpdates';
import HealthTopics from '../components/home/HealthTopics';
import HealthResources from '../components/home/HealthResources';
import HealthEvents from '../components/home/HealthEvents';
import HealthStats from '../components/home/HealthStats';
import './HomePage.css';

const HomePage = () => {
  const emergencyUpdates = [
    {
      id: 1,
      title: "COVID-19 XBB Variant Alert",
      description: "New XBB variant detected in Uganda and neighboring countries. Enhanced surveillance and testing recommended.",
      severity: "high",
      date: "March 26, 2025",
      location: "East Africa",
      link: "/alerts/covid-xbb-variant",
      image: "/images/diseases/covid-variant.jpg"
    },
    {
      id: 2,
      title: "Marburg Virus Outbreak Contained",
      description: "Successful containment of recent outbreak in Eastern Uganda. Learn about the measures taken and current status.",
      severity: "moderate",
      date: "March 25, 2025",
      location: "Eastern Uganda",
      link: "/alerts/marburg-update",
      image: "/images/diseases/marburg.jpg"
    },
    {
      id: 3,
      title: "Rift Valley Fever Alert",
      description: "Increased cases reported in pastoral communities. Prevention measures and livestock vaccination recommended.",
      severity: "high",
      date: "March 24, 2025",
      location: "Northern Uganda",
      link: "/alerts/rvf-alert",
      image: "/images/diseases/rvf.jpg"
    },
    {
      id: 4,
      title: "Cholera Outbreak Response",
      description: "Ongoing response to cholera cases in refugee settlements. WASH interventions intensified.",
      severity: "critical",
      date: "March 23, 2025",
      location: "West Nile Region",
      link: "/alerts/cholera-response",
      image: "/images/diseases/cholera.jpg"
    },
    {
      id: 5,
      title: "Ebola Surveillance Update",
      description: "Enhanced border screening following cases in neighboring DRC. No cases reported in Uganda.",
      severity: "moderate",
      date: "March 22, 2025",
      location: "Western Border",
      link: "/alerts/ebola-surveillance",
      image: "/images/diseases/ebola.jpg"
    }
  ];

  const latestUpdates = [
    {
      id: 1,
      title: "New Health Centers Opened",
      description: "Five new health centers established in underserved districts to improve healthcare access.",
      category: "Healthcare Infrastructure",
      date: "March 26, 2025",
      image: "/images/updates/health-center.jpg",
      link: "/news/new-health-centers"
    },
    {
      id: 2,
      title: "Vaccination Campaign Success",
      description: "National vaccination campaign reaches 95% coverage in target districts.",
      category: "Public Health",
      date: "March 25, 2025",
      image: "/images/updates/vaccination.jpg",
      link: "/news/vaccination-campaign"
    },
    {
      id: 3,
      title: "Mental Health Initiative Launch",
      description: "New program focuses on mental health support in rural communities.",
      category: "Mental Health",
      date: "March 24, 2025",
      image: "/images/updates/mental-health.jpg",
      link: "/news/mental-health-initiative"
    },
    {
      id: 4,
      title: "Healthcare Worker Training",
      description: "Advanced training program launched for frontline healthcare workers.",
      category: "Healthcare Education",
      date: "March 23, 2025",
      image: "/images/updates/training.jpg",
      link: "/news/healthcare-training"
    }
  ];

  const healthTopics = [
    {
      id: 1,
      title: "Tuberculosis Prevention",
      description: "Learn about TB prevention strategies and treatment options.",
      category: "Infectious Diseases",
      image: "/images/topics/tuberculosis.jpg",
      link: "/topics/tuberculosis",
      isNew: true,
      resourceCount: 12,
      resourceType: "Guidelines & Reports"
    },
    {
      id: 2,
      title: "Air Quality & Health",
      description: "Understanding the impact of air pollution on public health.",
      category: "Environmental Health",
      image: "/images/topics/air-quality.jpg",
      link: "/topics/air-quality",
      isNew: false,
      resourceCount: 8,
      resourceType: "Research & Data"
    },
    {
      id: 3,
      title: "Urban Health Initiatives",
      description: "Addressing health challenges in urban environments.",
      category: "Public Health",
      image: "/images/topics/urban-health.jpg",
      link: "/topics/urban-health",
      isNew: true,
      resourceCount: 15,
      resourceType: "Programs & Resources"
    },
    {
      id: 4,
      title: "Malaria Elimination",
      description: "Progress and strategies in malaria elimination efforts.",
      category: "Vector-borne Diseases",
      image: "/images/topics/malaria.jpg",
      link: "/topics/malaria",
      isNew: false,
      resourceCount: 20,
      resourceType: "Research & Guidelines"
    },
    {
      id: 5,
      title: "Mental Health Support",
      description: "Resources and support for mental health awareness.",
      category: "Mental Health",
      image: "/images/topics/mental-health.jpg",
      link: "/topics/mental-health",
      isNew: true,
      resourceCount: 10,
      resourceType: "Support & Resources"
    },
    {
      id: 6,
      title: "Maternal Health",
      description: "Improving maternal and child health outcomes.",
      category: "Reproductive Health",
      image: "/images/topics/maternal-health.jpg",
      link: "/topics/maternal-health",
      isNew: false,
      resourceCount: 18,
      resourceType: "Guidelines & Programs"
    }
  ];

  const healthResources = [
    {
      id: 1,
      title: "COVID-19 Treatment Guidelines",
      description: "Updated guidelines for healthcare providers on COVID-19 treatment protocols.",
      type: "guideline",
      date: "March 2025",
      format: "PDF",
      downloadUrl: "/resources/covid-treatment-guidelines.pdf",
      image: "/images/resources/covid-guidelines.jpg"
    },
    {
      id: 2,
      title: "Uganda Health Report 2025",
      description: "Comprehensive analysis of health trends and challenges in Uganda.",
      type: "report",
      date: "February 2025",
      format: "PDF",
      downloadUrl: "/resources/uganda-health-report-2025.pdf",
      image: "/images/resources/health-report.jpg"
    },
    {
      id: 3,
      title: "Vaccination Impact Study",
      description: "Research on the effectiveness of vaccination programs in East Africa.",
      type: "research",
      date: "January 2025",
      format: "Web",
      link: "/resources/vaccination-impact-study",
      image: "/images/resources/vaccination-study.jpg"
    },
    {
      id: 4,
      title: "Pandemic Preparedness Plan",
      description: "National strategy for pandemic preparedness and response.",
      type: "plan",
      date: "March 2025",
      format: "PDF",
      downloadUrl: "/resources/pandemic-preparedness-plan.pdf",
      image: "/images/resources/preparedness-plan.jpg"
    },
    {
      id: 5,
      title: "East Africa Disease Surveillance Report",
      description: "Regional disease surveillance data and analysis.",
      type: "report",
      date: "March 2025",
      format: "PDF",
      downloadUrl: "/resources/ea-surveillance-report.pdf",
      image: "/images/resources/surveillance-report.jpg"
    }
  ];

  const healthEvents = [
    {
      id: 1,
      title: "World Immunization Week",
      description: "Join us for a week of activities promoting vaccination awareness.",
      month: "APR",
      day: "24",
      location: "Nationwide",
      time: "24-30 April",
      isVirtual: false,
      registrationUrl: "/events/world-immunization-week/register",
      addToCalendarUrl: "/calendar/add/world-immunization-week",
      image: "/images/events/immunization-week.jpg"
    },
    {
      id: 2,
      title: "Mental Health Awareness Webinar",
      description: "Expert panel discussion on mental health challenges and solutions.",
      month: "APR",
      day: "15",
      location: "Online",
      time: "2:00 PM EAT",
      isVirtual: true,
      registrationUrl: "/events/mental-health-webinar/register",
      image: "/images/events/mental-health-webinar.jpg"
    },
    {
      id: 3,
      title: "Community Health Worker Training",
      description: "Training program for community health workers on new protocols.",
      month: "APR",
      day: "10",
      location: "Kampala",
      time: "9:00 AM - 4:00 PM",
      isVirtual: false,
      registrationUrl: "/events/chw-training/register",
      image: "/images/events/chw-training.jpg"
    },
    {
      id: 4,
      title: "East Africa Health Summit",
      description: "Regional conference on public health challenges and solutions.",
      month: "MAY",
      day: "5",
      location: "Kampala",
      time: "9:00 AM - 6:00 PM",
      isVirtual: false,
      registrationUrl: "/events/ea-health-summit/register",
      image: "/images/events/health-summit.jpg"
    },
    {
      id: 5,
      title: "Pandemic Response Workshop",
      description: "Hands-on workshop for healthcare professionals on pandemic management.",
      month: "APR",
      day: "20",
      location: "Multiple Locations",
      time: "9:00 AM - 3:00 PM",
      isVirtual: false,
      registrationUrl: "/events/pandemic-workshop/register",
      image: "/images/events/pandemic-workshop.jpg"
    }
  ];

  const healthStats = [
    {
      id: 1,
      title: "Active Cases",
      value: 1234,
      change: -12,
      period: "Last 7 days",
      category: "cases",
      link: "/statistics/cases",
      subStats: [
        { label: "Recovered", value: 892, unit: "patients" },
        { label: "Critical", value: 45, unit: "cases" }
      ]
    },
    {
      id: 2,
      title: "Vaccinations",
      value: 2500000,
      change: 5,
      period: "This month",
      category: "vaccinations",
      link: "/statistics/vaccinations",
      subStats: [
        { label: "Fully Vaccinated", value: 65, unit: "%" },
        { label: "Boosters", value: 25, unit: "%" }
      ]
    },
    {
      id: 3,
      title: "Tests Conducted",
      value: 15000,
      change: 8,
      period: "This week",
      category: "tests",
      link: "/statistics/tests",
      subStats: [
        { label: "Positivity Rate", value: 2.8, unit: "%" },
        { label: "24h Change", value: 150, unit: "tests" }
      ]
    },
    {
      id: 4,
      title: "Active Alerts",
      value: 12,
      change: 0,
      period: "Current",
      category: "alerts",
      link: "/statistics/alerts",
      subStats: [
        { label: "High Priority", value: 3 },
        { label: "Regions Affected", value: 5 }
      ]
    },
    {
      id: 5,
      title: "Hospital Capacity",
      value: 78,
      change: 3,
      period: "Current",
      category: "hospitals",
      link: "/statistics/hospitals",
      subStats: [
        { label: "ICU Beds Available", value: 45, unit: "beds" },
        { label: "Occupancy Rate", value: 78, unit: "%" }
      ]
    },
    {
      id: 6,
      title: "Disease Outbreaks",
      value: 4,
      change: -1,
      period: "This month",
      category: "outbreaks",
      link: "/statistics/outbreaks",
      subStats: [
        { label: "Under Control", value: 3 },
        { label: "Active Response", value: 1 }
      ]
    }
  ];

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-background">
          <OptimizedImage 
            src="/images/hero/healthcare-hero.jpg" 
            alt="Healthcare professionals working together"
            priority={true}
          />
        </div>
        <Container>
          <div className="hero-content">
            <h1>Your Gateway to Better Health</h1>
            <p>Access reliable health information, find nearby facilities, and stay updated with the latest health alerts in Uganda.</p>
            <div className="hero-cta">
              <Link to="/health-topics" className="cta-button primary">
                Explore Health Topics
              </Link>
              <Link to="/alerts" className="cta-button secondary">
                View Health Alerts
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <section className="emergency-updates-section">
          <div className="section-header">
            <h2>Emergency Updates</h2>
            <Link to="/alerts" className="view-all">View All Alerts</Link>
          </div>
          <EmergencyUpdates updates={emergencyUpdates} />
        </section>

        <section className="latest-updates-section">
          <div className="section-header">
            <h2>Latest Updates</h2>
            <Link to="/news" className="view-all">View All Updates</Link>
          </div>
          <div className="latest-updates-grid">
            {latestUpdates.map(update => (
              <Link to={update.link} key={update.id} className="update-card">
                <div className="update-image">
                  <OptimizedImage src={update.image} alt={update.title} />
                </div>
                <div className="update-content">
                  <span className="update-date">{update.date}</span>
                  <h3>{update.title}</h3>
                  <p>{update.description}</p>
                  <span className="update-category">{update.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="health-topics-section">
          <div className="section-header">
            <h2>Featured Health Topics</h2>
            <Link to="/topics" className="view-all">View All Topics</Link>
          </div>
          <HealthTopics topics={healthTopics} />
        </section>

        <section className="health-stats-section">
          <div className="section-header">
            <h2>Health Statistics</h2>
            <Link to="/statistics" className="view-all">View All Statistics</Link>
          </div>
          <HealthStats stats={healthStats} />
        </section>

        <section className="health-events-section">
          <div className="section-header">
            <h2>Upcoming Health Events</h2>
            <Link to="/events" className="view-all">View All Events</Link>
          </div>
          <HealthEvents events={healthEvents} />
        </section>

        <section className="health-resources-section">
          <div className="section-header">
            <h2>Health Resources</h2>
            <Link to="/resources" className="view-all">View All Resources</Link>
          </div>
          <HealthResources resources={healthResources} />
        </section>
      </Container>
    </div>
  );
};

export default HomePage;
