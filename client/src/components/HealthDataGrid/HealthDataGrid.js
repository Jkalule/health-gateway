import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HealthDataCard from '../HealthDataCard/HealthDataCard';
import { io } from 'socket.io-client';
import './HealthDataGrid.css';

const healthSources = [
  {
    id: 'who',
    title: 'World Health Organization',
    description: 'Global health guidance, statistics, and emergency updates from WHO.',
    url: 'https://www.who.int',
    imageUrl: '/images/sources/who.png'
  },
  {
    id: 'cdc',
    title: 'Centers for Disease Control',
    description: 'Disease control, prevention strategies, and health data from the US CDC.',
    url: 'https://www.cdc.gov',
    imageUrl: '/images/sources/cdc.png'
  },
  {
    id: 'ecdc',
    title: 'European CDC',
    description: 'European public health surveillance and disease control information.',
    url: 'https://www.ecdc.europa.eu',
    imageUrl: '/images/sources/ecdc.png'
  },
  {
    id: 'africa-cdc',
    title: 'Africa CDC',
    description: 'Public health initiatives and disease surveillance across Africa.',
    url: 'https://africacdc.org',
    imageUrl: '/images/sources/africa-cdc.png'
  },
  {
    id: 'paho',
    title: 'Pan American Health Organization',
    description: 'Health systems and response coordination in the Americas.',
    url: 'https://www.paho.org',
    imageUrl: '/images/sources/paho.png'
  },
  {
    id: 'jhu',
    title: 'Johns Hopkins COVID-19 Resource',
    description: 'Comprehensive COVID-19 data tracking and analysis.',
    url: 'https://coronavirus.jhu.edu',
    imageUrl: '/images/sources/jhu.png'
  },
  {
    id: 'owid',
    title: 'Our World in Data',
    description: 'Research and data visualization on global health trends.',
    url: 'https://ourworldindata.org',
    imageUrl: '/images/sources/owid.png'
  },
  {
    id: 'ihme',
    title: 'Institute for Health Metrics',
    description: 'Global health measurement and evaluation research.',
    url: 'https://www.healthdata.org',
    imageUrl: '/images/sources/ihme.png'
  },
  {
    id: 'gho',
    title: 'Global Health Observatory',
    description: 'WHO\'s gateway to health-related statistics.',
    url: 'https://www.who.int/data/gho',
    imageUrl: '/images/sources/gho.png'
  },
  {
    id: 'nextstrain',
    title: 'Nextstrain',
    description: 'Real-time tracking of pathogen evolution.',
    url: 'https://nextstrain.org',
    imageUrl: '/images/sources/nextstrain.png'
  },
  {
    id: 'moh-uganda',
    title: 'Uganda Ministry of Health',
    description: 'Official health updates and guidelines for Uganda.',
    url: 'https://www.health.go.ug',
    imageUrl: '/images/sources/moh-uganda.png'
  },
  {
    id: 'lancet',
    title: 'The Lancet',
    description: 'Peer-reviewed medical research and analysis.',
    url: 'https://www.thelancet.com',
    imageUrl: '/images/sources/lancet.png'
  }
];

const HealthDataGrid = () => {
  const [sources, setSources] = useState(healthSources);

  useEffect(() => {
    // Connect to WebSocket server for real-time updates
    const socket = io('http://localhost:5000');

    socket.on('healthDataUpdate', (updatedSource) => {
      setSources(prevSources => {
        const sourceIndex = prevSources.findIndex(s => s.id === updatedSource.id);
        if (sourceIndex === -1) {
          return [...prevSources, updatedSource];
        }
        const newSources = [...prevSources];
        newSources[sourceIndex] = {
          ...newSources[sourceIndex],
          ...updatedSource
        };
        return newSources;
      });
    });

    return () => socket.disconnect();
  }, []);

  return (
    <Container fluid className="health-data-grid">
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {sources.map((source) => (
          <Col key={source.id}>
            <HealthDataCard source={source} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HealthDataGrid;
