import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { diseases } from '../data/diseaseData';
import DiseaseDetail from '../components/DiseaseDetail';

const DiseaseDetailPage = () => {
  const { id } = useParams();
  const disease = diseases[id];

  if (!disease) {
    return <Navigate to="/health-guidelines" replace />;
  }

  return <DiseaseDetail disease={disease} />;
};

export default DiseaseDetailPage;
