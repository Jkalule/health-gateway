const mongoose = require('mongoose');
const HealthGuideline = require('../models/HealthGuideline');
require('dotenv').config();

const guidelines = [
  {
    disease: 'covid-19',
    overview: "COVID-19 is a respiratory illness caused by the SARS-CoV-2 virus. It can spread from an infected person's mouth or nose in small liquid particles when they cough, sneeze, speak, sing or breathe.",    signs: [
      'Fever or chills',
      'Cough',
      'Shortness of breath',
      'Fatigue',
      'Muscle or body aches',
      'Loss of taste or smell'
    ],
    symptoms: [
      'Fever (37.8°C or higher)',
      'Continuous dry cough',
      'Fatigue',
      'Loss of taste or smell',
      'Difficulty breathing',
      'Chest pain or pressure',
      'Loss of speech or movement'
    ],
    preventionMeasures: [
      'Get vaccinated and stay up to date with boosters',
      'Wear a well-fitting mask in public indoor spaces',
      'Maintain physical distance of at least 2 meters from others',
      'Wash hands frequently with soap and water',
      'Use hand sanitizer when soap isn\'t available',
      'Avoid crowded and poorly ventilated spaces',
      'Stay home if you feel unwell'
    ],
    firstAid: [
      'Isolate from others immediately',
      'Monitor temperature and oxygen levels',
      'Rest and stay hydrated',
      'Take acetaminophen for fever',
      'Use breathing exercises',
      'Contact healthcare provider for guidance'
    ],
    riskFactors: [
      'Age (older adults are at higher risk)',
      'Underlying medical conditions',
      'Weakened immune system',
      'Obesity',
      'Pregnancy',
      'Smoking'
    ],
    whenToSeekHelp: [
      'Difficulty breathing or shortness of breath',
      'Persistent chest pain or pressure',
      'Confusion or inability to wake/stay awake',
      'Bluish lips or face',
      'Oxygen saturation below 94%'
    ],
    source: 'WHO'
  },
  {
    disease: 'ebola',
    overview: 'Ebola virus disease is a severe, often fatal illness affecting humans and other primates. The virus is transmitted to people from wild animals and spreads in the human population through direct contact with bodily fluids.',
    signs: [
      'Sudden onset of fever',
      'Severe headache',
      'Muscle pain',
      'Weakness and fatigue'
    ],
    symptoms: [
      'Fever',
      'Fatigue',
      'Muscle pain',
      'Headache',
      'Vomiting',
      'Diarrhea',
      'Unexplained bleeding or bruising',
      'Internal bleeding'
    ],
    preventionMeasures: [
      'Avoid contact with infected people',
      'Wear protective clothing when caring for patients',
      'Practice proper hand hygiene',
      'Avoid contact with bats and primates',
      'Don\'t handle raw or undercooked bushmeat',
      'Follow proper burial practices'
    ],
    firstAid: [
      'Isolate the person immediately',
      'Contact healthcare authorities',
      'Wear protective equipment',
      'Provide oral rehydration',
      'Monitor vital signs',
      'Control fever with medication'
    ],
    riskFactors: [
      'Healthcare workers',
      'Family members of infected individuals',
      'Hunters handling infected animals',
      'Contact with contaminated objects',
      'Participation in burial rituals'
    ],
    whenToSeekHelp: [
      'Any suspected contact with an infected person',
      'Sudden onset of fever',
      'Unexplained bleeding',
      'Severe headache with fever',
      'Muscle pain with fever'
    ],
    source: 'WHO'
  },
  {
    disease: 'malaria',
    overview: "Malaria is a life-threatening disease caused by parasites transmitted through the bites of infected female Anopheles mosquitoes. It's preventable and curable if diagnosed and treated promptly.",
    signs: [
      'Fever',
      'Chills',
      'Sweating',
      'Headache',
      'Fatigue'
    ],
    symptoms: [
      'Cyclical fever and chills',
      'Headache',
      'Muscle aches',
      'Fatigue',
      'Nausea and vomiting',
      'Diarrhea',
      'Anemia',
      'Jaundice'
    ],
    preventionMeasures: [
      'Sleep under insecticide-treated mosquito nets',
      'Use mosquito repellent',
      'Wear long-sleeved clothing and long pants',
      'Take preventive antimalarial medication',
      'Eliminate standing water near homes',
      'Install screens on windows and doors'
    ],
    firstAid: [
      'Seek immediate medical attention',
      'Control fever with medication',
      'Stay hydrated',
      'Rest in a cool environment',
      'Monitor temperature'
    ],
    riskFactors: [
      'Living in or visiting malaria-endemic areas',
      'Young children and infants',
      'Pregnant women',
      'People with HIV/AIDS',
      'International travelers without immunity'
    ],
    whenToSeekHelp: [
      'Fever with chills',
      'Severe headache',
      'Confusion or drowsiness',
      'Rapid breathing',
      'Dark or bloody urine'
    ],
    source: 'WHO'
  },
  {
    disease: 'tuberculosis',
    overview: 'Tuberculosis (TB) is a bacterial infection that primarily affects the lungs. It spreads through the air when infected people cough, sneeze, or spit. Most infections show no symptoms as the body contains the bacteria.',
    signs: [
      'Persistent cough',
      'Weight loss',
      'Night sweats',
      'Fever',
      'Loss of appetite'
    ],
    symptoms: [
      'Cough lasting more than 3 weeks',
      'Chest pain',
      'Coughing up blood',
      'Weakness',
      'Weight loss',
      'Fever',
      'Night sweats'
    ],
    preventionMeasures: [
      'Get BCG vaccination',
      'Early detection and treatment',
      'Improve ventilation in buildings',
      'Use UV light in high-risk areas',
      'Practice good respiratory hygiene',
      'Complete full course of treatment if infected'
    ],
    firstAid: [
      'Isolate from others',
      'Wear a mask',
      'Seek medical attention',
      'Cover mouth when coughing',
      'Rest adequately',
      'Maintain good nutrition'
    ],
    riskFactors: [
      'HIV infection',
      'Malnutrition',
      'Diabetes',
      'Smoking',
      'Heavy alcohol use',
      'Living in crowded conditions'
    ],
    whenToSeekHelp: [
      'Persistent cough lasting more than 3 weeks',
      'Coughing up blood',
      'Chest pain',
      'Unintentional weight loss',
      'Persistent fever'
    ],
    source: 'WHO'
  },
  {
    disease: 'mpox',
    overview: 'Mpox (formerly known as monkeypox) is a viral infection that causes a rash and other symptoms. It spreads through close, personal contact with someone who has mpox, including direct contact with the rash, scabs, or body fluids.',
    signs: [
      'Rash that goes through several stages',
      'Fever',
      'Chills',
      'Swollen lymph nodes',
      'Exhaustion',
      'Muscle aches and backache',
      'Headache'
    ],
    symptoms: [
      'Rash that may look like pimples or blisters',
      'Fever and chills',
      'Swollen lymph nodes',
      'Exhaustion',
      'Muscle aches',
      'Respiratory symptoms (sore throat, cough)',
      'Headache'
    ],
    preventionMeasures: [
      'Avoid close, skin-to-skin contact with people who have a rash',
      'Do not touch the rash or scabs of a person with mpox',
      'Avoid contact with objects used by someone with mpox',
      'Wash hands often with soap and water',
      'Get vaccinated if you are at risk',
      'Wear personal protective equipment if caring for others with mpox'
    ],
    firstAid: [
      'Isolate from others',
      'Contact healthcare provider immediately',
      'Keep rash areas clean and dry',
      'Use over-the-counter medications for pain',
      'Stay hydrated',
      'Monitor symptoms'
    ],
    riskFactors: [
      'Close physical contact with someone who has mpox',
      'Direct contact with contaminated materials',
      'Travel to areas where mpox is common',
      'Occupational exposure (healthcare workers)',
      'Weakened immune system'
    ],
    whenToSeekHelp: [
      'As soon as you notice a suspicious rash',
      "If you've had close contact with someone diagnosed with mpox",
      "If you develop severe symptoms",
      "If you have difficulty breathing",
      'If you have a compromised immune system'
    ]
  },
  {
    disease: 'h1n1',
    overview: 'H1N1 influenza (swine flu) is a respiratory infection caused by an influenza A virus. While it originally emerged as a pandemic in 2009, it now circulates as a seasonal flu strain.',
    signs: [
      'Sudden fever',
      'Cough',
      'Sore throat',
      'Runny or stuffy nose',
      'Body aches',
      'Fatigue',
      'Chills'
    ],
    symptoms: [
      'High fever (above 38°C/100.4°F)',
      'Persistent cough',
      'Severe body aches',
      'Extreme fatigue',
      'Headache',
      'Diarrhea and vomiting (in some cases)',
      'Shortness of breath'
    ],
    preventionMeasures: [
      'Get annual flu vaccination',
      'Wash hands frequently',
      'Cover mouth and nose when coughing or sneezing',
      'Avoid close contact with sick people',
      'Stay home when sick',
      'Clean and disinfect frequently touched surfaces',
      'Maintain good general health habits'
    ],
    firstAid: [
      'Rest and get plenty of sleep',
      'Drink plenty of fluids',
      'Take over-the-counter pain relievers',
      'Use decongestants for nasal symptoms',
      'Monitor temperature',
      'Use humidifier to ease breathing'
    ],
    riskFactors: [
      'Age (very young and elderly)',
      'Pregnancy',
      'Chronic medical conditions',
      'Weakened immune system',
      'Obesity',
      'Healthcare workers',
      'Living or working in crowded conditions'
    ],
    whenToSeekHelp: [
      'Difficulty breathing or shortness of breath',
      'Pain or pressure in chest or abdomen',
      'Sudden dizziness or confusion',
      'Severe or persistent vomiting',
      'Flu symptoms that improve but return with fever and worse cough',
      'In children: bluish skin color, not drinking enough fluids, not waking up'
    ]
  }
];

async function initializeGuidelines() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/uganda-health-gateway');
    console.log('Connected to MongoDB');

    // Clear existing guidelines
    await HealthGuideline.deleteMany({});
    console.log('Cleared existing guidelines');

    // Insert new guidelines
    await HealthGuideline.insertMany(guidelines);
    console.log('Successfully inserted health guidelines');

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error initializing guidelines:', error);
    process.exit(1);
  }
}

initializeGuidelines();
