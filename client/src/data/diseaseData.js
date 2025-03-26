import { 
  FaVirus, 
  FaBiohazard, 
  FaBug, 
  FaLungs, 
  FaHeadSideMask,
  FaSkull,
  FaThermometerHalf
} from 'react-icons/fa';

export const diseases = {
  covid19: {
    id: 'covid19',
    name: 'COVID-19',
    title: 'Coronavirus Disease (COVID-19)',
    shortDescription: 'An infectious disease caused by the SARS-CoV-2 virus',
    icon: FaVirus,
    severity: 'High',
    urgency: 'Immediate medical attention if severe symptoms',
    category: 'Viral Infection',
    transmission: ['Respiratory droplets', 'Close contact', 'Airborne transmission'],
    overview: `COVID-19 is a respiratory illness that can spread from person to person. 
    The virus that causes COVID-19 is a novel coronavirus first identified during an 
    investigation into an outbreak in Wuhan, China.`,
    sections: {
      symptoms: {
        title: 'Signs & Symptoms',
        content: [
          'Fever or chills',
          'Cough and shortness of breath',
          'Fatigue and body aches',
          'Loss of taste or smell',
          'Headache and sore throat',
          'Congestion or runny nose',
          'Nausea, vomiting, or diarrhea'
        ]
      },
      prevention: {
        title: 'Prevention',
        content: [
          'Get vaccinated and stay up to date with boosters',
          'Wear well-fitting masks in public spaces',
          'Maintain physical distance (2 meters)',
          'Practice good hand hygiene',
          'Ensure good ventilation',
          'Avoid crowded indoor spaces'
        ]
      },
      riskFactors: {
        title: 'Risk Factors',
        content: [
          'Age (older adults at higher risk)',
          'Underlying medical conditions',
          'Weakened immune system',
          'Obesity',
          'Cardiovascular disease',
          'Diabetes'
        ]
      },
      treatment: {
        title: 'Treatment Options',
        content: [
          'Antiviral medications',
          'Monoclonal antibody treatment',
          'Supportive care',
          'Rest and hydration',
          'Over-the-counter fever reducers',
          'Oxygen therapy if needed'
        ]
      }
    }
  },
  h1n1: {
    id: 'h1n1',
    name: 'H1N1 Flu',
    title: 'H1N1 Influenza (Swine Flu)',
    shortDescription: 'A variant of influenza A virus that caused a pandemic in 2009',
    icon: FaHeadSideMask,
    severity: 'Moderate to High',
    urgency: 'Seek care if high-risk or severe symptoms',
    category: 'Viral Infection',
    transmission: ['Respiratory droplets', 'Close contact', 'Contaminated surfaces'],
    overview: `H1N1 flu is a respiratory infection caused by an influenza A virus. 
    While it originally emerged as a pandemic in 2009, it now circulates as a seasonal flu strain.`,
    sections: {
      symptoms: {
        title: 'Signs & Symptoms',
        content: [
          'High fever (above 38°C)',
          'Severe body aches',
          'Persistent cough',
          'Extreme fatigue',
          'Headache and sore throat',
          'Runny or stuffy nose',
          'Possible diarrhea and vomiting'
        ]
      },
      prevention: {
        title: 'Prevention',
        content: [
          'Annual flu vaccination',
          'Regular hand washing',
          'Avoid close contact with sick people',
          'Cover mouth when coughing',
          'Stay home when sick',
          'Clean frequently touched surfaces'
        ]
      },
      riskFactors: {
        title: 'Risk Factors',
        content: [
          'Young children and elderly',
          'Pregnant women',
          'Chronic medical conditions',
          'Weakened immune system',
          'Healthcare workers',
          'Living in crowded conditions'
        ]
      },
      treatment: {
        title: 'Treatment',
        content: [
          'Antiviral medications',
          'Rest and hydration',
          'Over-the-counter pain relievers',
          'Fever reduction methods',
          'Isolation to prevent spread',
          'Supportive care'
        ]
      }
    }
  },
  mpox: {
    id: 'mpox',
    name: 'Mpox',
    title: 'Mpox (formerly Monkeypox)',
    shortDescription: 'A viral infection causing rash and other symptoms',
    icon: FaBug,
    severity: 'Moderate',
    urgency: 'Seek care upon rash appearance',
    category: 'Viral Infection',
    transmission: ['Direct contact', 'Respiratory secretions', 'Contaminated materials'],
    overview: `Mpox is a viral disease that causes rash and other symptoms. It spreads through 
    close contact with an infected person, animal, or contaminated materials.`,
    sections: {
      symptoms: {
        title: 'Signs & Symptoms',
        content: [
          'Rash that progresses in stages',
          'Fever and chills',
          'Swollen lymph nodes',
          'Muscle aches and backache',
          'Headache and exhaustion',
          'Respiratory symptoms'
        ]
      },
      prevention: {
        title: 'Prevention',
        content: [
          'Avoid skin-to-skin contact with infected persons',
          'Do not share personal items',
          'Practice good hand hygiene',
          'Get vaccinated if eligible',
          'Use PPE when caring for infected persons',
          'Avoid contact with contaminated materials'
        ]
      },
      riskFactors: {
        title: 'Risk Factors',
        content: [
          'Close contact with infected individuals',
          'Occupational exposure',
          'Travel to endemic areas',
          'Multiple sexual partners',
          'Compromised immune system',
          'Healthcare workers'
        ]
      },
      treatment: {
        title: 'Treatment',
        content: [
          'Supportive care',
          'Pain management',
          'Antiviral medications if needed',
          'Wound care for rash',
          'Rest and hydration',
          'Isolation until recovery'
        ]
      }
    }
  },
  malaria: {
    id: 'malaria',
    name: 'Malaria',
    title: 'Malaria',
    shortDescription: 'A mosquito-borne disease caused by Plasmodium parasites',
    icon: FaBug,
    severity: 'High',
    urgency: 'Immediate treatment required',
    category: 'Parasitic Disease',
    transmission: ['Mosquito bites', 'Blood transfusion', 'Mother to child'],
    overview: `Malaria is a life-threatening disease caused by parasites that are transmitted 
    through the bites of infected female Anopheles mosquitoes.`,
    sections: {
      symptoms: {
        title: 'Signs & Symptoms',
        content: [
          'Fever and chills',
          'Sweating and headaches',
          'Muscle pain and fatigue',
          'Nausea and vomiting',
          'Chest and abdominal pain',
          'Cough and diarrhea'
        ]
      },
      prevention: {
        title: 'Prevention',
        content: [
          'Use insecticide-treated bed nets',
          'Apply mosquito repellent',
          'Wear protective clothing',
          'Take preventive medications',
          'Eliminate standing water',
          'Install or repair screens'
        ]
      },
      riskFactors: {
        title: 'Risk Factors',
        content: [
          'Living in endemic areas',
          'Outdoor activities in endemic areas',
          'Poor housing conditions',
          'Limited access to healthcare',
          'Pregnancy',
          'Young children and elderly'
        ]
      },
      treatment: {
        title: 'Treatment',
        content: [
          'Antimalarial medications',
          'Supportive care',
          'Fluid replacement',
          'Management of complications',
          'Close monitoring',
          'Follow-up care'
        ]
      }
    }
  },
  tuberculosis: {
    id: 'tuberculosis',
    name: 'Tuberculosis',
    title: 'Tuberculosis (TB)',
    shortDescription: 'A bacterial infection primarily affecting the lungs',
    icon: FaLungs,
    severity: 'High',
    urgency: 'Early detection crucial',
    category: 'Bacterial Infection',
    transmission: ['Airborne droplets', 'Close contact', 'Prolonged exposure'],
    overview: `Tuberculosis is a bacterial infection that mainly affects the lungs but can also 
    affect other parts of the body. It spreads through the air when infected people cough or sneeze.`,
    sections: {
      symptoms: {
        title: 'Signs & Symptoms',
        content: [
          'Persistent cough (3+ weeks)',
          'Chest pain when breathing',
          'Coughing up blood',
          'Weight loss and fatigue',
          'Night sweats and fever',
          'Loss of appetite'
        ]
      },
      prevention: {
        title: 'Prevention',
        content: [
          'BCG vaccination',
          'Regular screening',
          'Good ventilation',
          'Respiratory hygiene',
          'Contact tracing',
          'Complete prescribed treatment'
        ]
      },
      riskFactors: {
        title: 'Risk Factors',
        content: [
          'Close contact with TB patients',
          'HIV infection',
          'Malnutrition',
          'Diabetes',
          'Smoking',
          'Living in crowded conditions'
        ]
      },
      treatment: {
        title: 'Treatment',
        content: [
          'Multi-drug therapy',
          'Regular monitoring',
          'Complete full course (6-9 months)',
          'Directly observed therapy',
          'Support for adherence',
          'Follow-up testing'
        ]
      }
    }
  },
  ebola: {
    id: 'ebola',
    name: 'Ebola',
    title: 'Ebola Virus Disease',
    shortDescription: 'A rare but severe and often fatal illness',
    icon: FaSkull,
    severity: 'Very High',
    urgency: 'Immediate isolation and treatment',
    category: 'Viral Infection',
    transmission: ['Direct contact', 'Bodily fluids', 'Contaminated objects'],
    overview: `Ebola is a rare but deadly virus that causes fever, body aches, and can lead to 
    severe bleeding, organ failure, and death. It spreads through direct contact with body fluids.`,
    sections: {
      symptoms: {
        title: 'Signs & Symptoms',
        content: [
          'Sudden fever and fatigue',
          'Severe headache',
          'Muscle pain',
          'Vomiting and diarrhea',
          'Internal/external bleeding',
          'Organ dysfunction'
        ]
      },
      prevention: {
        title: 'Prevention',
        content: [
          'Avoid contact with infected people',
          'Practice proper hand hygiene',
          'Use protective equipment',
          'Safe burial practices',
          'Avoid contact with bush meat',
          'Follow infection control protocols'
        ]
      },
      riskFactors: {
        title: 'Risk Factors',
        content: [
          'Healthcare workers',
          'Family members of patients',
          'Contact with infected animals',
          'Living in or traveling to affected areas',
          'Handling contaminated materials',
          'Participating in burial ceremonies'
        ]
      },
      treatment: {
        title: 'Treatment',
        content: [
          'Intensive supportive care',
          'Fluid and electrolyte management',
          'Maintaining oxygen and blood pressure',
          'Treatment of specific symptoms',
          'Prevention of complications',
          'Experimental treatments'
        ]
      }
    }
  }
};
