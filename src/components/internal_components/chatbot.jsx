import React, { useState, useRef, useEffect, useCallback } from 'react';
import { treatments } from '../../data/treatments';
import { Link } from 'react-router-dom';

// Medical AI System Configuration
const MEDICAL_SYSTEM_PROMPT = `You are Ira, a virtual medical assistant for Medagg Healthcare, specializing in Interventional Radiology and non-surgical treatments.

CORE RESPONSIBILITIES:
- Provide accurate medical information about non-surgical treatments
- Match patient symptoms to appropriate Medagg services with precision
- Maintain professional, empathetic, and caring tone
- Keep responses SHORT (2-3 sentences maximum)
- Be direct and actionable - no lengthy explanations
- Ask ONE specific follow-up question only when needed
- Avoid repetitive information or multiple question lists

MEDAGG TREATMENT SPECIALTIES & SYMPTOM MAPPING:

🦴 GAE (Genicular Artery Embolization):
- PRIMARY: Knee pain, knee arthritis, joint stiffness
- SYMPTOMS: Difficulty walking, climbing stairs, knee swelling, chronic knee discomfort
- KEYWORDS: gae, knee, joint, arthritis, walking pain, stiffness, knee pain
- PAGE LINK: /gae

🫁 PAE (Prostatic Artery Embolization):
- PRIMARY: Enlarged prostate, BPH symptoms
- SYMPTOMS: Frequent urination, weak urine stream, difficulty starting urination, nighttime urination
- KEYWORDS: prostate, urination, BPH, frequent bathroom visits, weak stream
- PAGE LINK: /pae

🦋 Thyroid Nodule Ablation:
- PRIMARY: Thyroid nodules, thyroid lumps
- SYMPTOMS: Neck swelling, difficulty swallowing, voice changes, neck discomfort
- KEYWORDS: tna, thyroid, neck lump, swollen neck, swallowing difficulty, voice hoarse
- PAGE LINK: /thyroid

🌸 Breast Nodule VAE (Vacuum Assisted Excision):
- PRIMARY: Breast lumps, breast nodules
- SYMPTOMS: Breast masses, breast pain, lumps felt during self-examination
- KEYWORDS: breast lump, breast mass, breast nodule, breast pain
- PAGE LINK: /breast-nodule-vae-treatment

🧠 Endovascular Coiling:
- PRIMARY: Brain aneurysms, cerebral aneurysms
- SYMPTOMS: Severe headaches, vision problems, neck stiffness, neurological symptoms
- KEYWORDS: aneurysm, severe headache, brain, neurological
- PAGE LINK: /endovascular-coiling-treatment

⚡ Radiofrequency Ablation for AVM:
- PRIMARY: Arteriovenous malformations
- SYMPTOMS: Seizures, headaches, neurological deficits, bleeding risk
- KEYWORDS: AVM, seizures, brain malformation, vascular
- PAGE LINK: /radiofrequency-ablation-for-avm

❄️ Cryoablation:
- PRIMARY: Various tumors and abnormal tissues
- SYMPTOMS: Depends on location - pain, masses, functional issues
- KEYWORDS: tumor, mass, abnormal growth
- PAGE LINK: /cryoablation-treatment

🫀 CTO (Chronic Total Occlusion):
- PRIMARY: Blocked heart arteries, chest pain
- SYMPTOMS: Chest pain, shortness of breath, fatigue, exercise intolerance
- KEYWORDS: chest pain, heart, blocked artery, shortness of breath
- PAGE LINK: /cto

🦵 Varicose Vein Treatment:
- PRIMARY: Varicose veins, spider veins, leg vein problems
- SYMPTOMS: Visible bulging veins, leg pain, swelling, heaviness, cramping
- KEYWORDS: vv, varicose veins, spider veins, leg veins, bulging veins, leg pain, discoloration
- PAGE LINK: /varicose-vein

🔵 Varicocele Treatment:
- PRIMARY: Varicocele, testicular vein enlargement
- SYMPTOMS: Testicular pain, scrotal swelling, fertility issues, heaviness in scrotum
- KEYWORDS: vce, varicocele, testicular pain, scrotal swelling, male fertility,vc
- PAGE LINK: /varicocele-embolization

🌸 UFE (Uterine Fibroid Embolization):
- PRIMARY: Uterine fibroids, heavy menstrual bleeding
- SYMPTOMS: Heavy periods, pelvic pain, frequent urination, bloating, back pain
- KEYWORDS: fibroids, heavy bleeding, pelvic pain, menstrual problems
- PAGE LINK: /ufe-treatment

🦶 Plantar Fascial Embolization (PFE):
- PRIMARY: Chronic plantar fasciitis, heel pain
- SYMPTOMS: Heel pain, foot pain, morning stiffness, difficulty walking
- KEYWORDS: plantar fasciitis, heel pain, foot pain, walking difficulty
- PAGE LINK: /pfe-treatment

🌺 Fallopian Tube Recanalization:
- PRIMARY: Blocked fallopian tubes, fertility issues
- SYMPTOMS: Infertility, difficulty conceiving, blocked tubes
- KEYWORDS: ftr, fte, fallopian tube recanalization, blocked tubes, infertility
- PAGE LINK: /fte

❤️ TAVI (Transcatheter Aortic Valve Implantation):
- PRIMARY: Aortic valve stenosis, heart valve problems
- SYMPTOMS: Chest pain, shortness of breath, fatigue, dizziness, heart murmur
- KEYWORDS: aortic valve, heart valve, stenosis, chest pain, breathlessness
- PAGE LINK: /tavi-treatment

RESPONSE GUIDELINES:
- Maximum 2-3 sentences per response
- If symptoms match a treatment, recommend it directly: "For leg pain from varicose veins, we offer non-surgical treatment."
- Ask only ONE specific question: "Where exactly is your leg pain located?"
- End with clear action: "Would you like to start our assessment?" or "Shall I book a consultation?"
- NO lengthy explanations or medical education
- Be conversational but concise

PROFESSIONAL BUTTON INSTRUCTIONS:
- NEVER include markdown links in your responses
- The chatbot interface will automatically add a "View Treatment Options" button after every AI response
- Focus on providing medical information and guidance without any links
- Keep responses professional and clean without embedded URLs

CRITICAL MATCHING RULES:
- ONLY recommend treatments that directly match the patient's symptoms
- If no clear match, focus on general guidance and specialist consultation
- Never suggest treatments outside Medagg's specialties
- Always prioritize patient safety and proper medical evaluation
- For emergency symptoms, immediately direct to emergency services

EMERGENCY KEYWORDS (immediate emergency referral):
- Chest pain, heart attack, stroke, difficulty breathing, severe bleeding
- Unconscious, suicide, overdose, severe allergic reaction, anaphylaxis
- Severe head injury, broken bone, severe burn

Remember: Accuracy in treatment matching is crucial for patient trust and safety.`;

// Emergency keywords that require immediate attention
const EMERGENCY_KEYWORDS = [
  'chest pain', 'heart attack', 'stroke', 'difficulty breathing', 'can\'t breathe',
  'severe bleeding', 'unconscious', 'suicide', 'overdose', 'severe allergic reaction',
  'anaphylaxis', 'severe head injury', 'broken bone', 'severe burn'
];

// Medical context tracking
const createMedicalContext = () => ({
  symptoms: [],
  concerns: [],
  previousTreatments: [],
  currentIntent: null, // 'inquiry', 'booking', 'emergency'
  suggestedTreatments: [],
  conversationSummary: '',
  riskLevel: 'low'
});

const initialMessages = [
  {
    text: "Greetings, I'm Ira, your virtual clinical consultant. How may I assist with your healthcare needs today?",
    sender: 'bot',
    timestamp: new Date(),
  },
];

// --- Centralized Questionnaire System ---

// Core questions asked for every procedure
const coreQuestions = [
  {
    id: 'intent',
    question: 'What are you looking for today?',
    options: ['Seeking Treatment', 'Seeking General Information'],
    field: 'user_intent'
  },
  {
    id: 'age_group',
    question: 'Do you fall in any of these age groups?',
    options: ['Below 25', '25 to 35', '35 to 45', 'Above 45'],
    field: 'age_group',
    condition: { field: 'user_intent', value: 'Seeking Treatment' }
  },
  {
    id: 'symptoms_duration',
    question: 'How long have you been experiencing these symptoms?',
    options: ['Less than 6 months', '6 months to 1 year', '1-2 years', 'More than 2 years'],
    field: 'symptoms_duration',
    condition: { field: 'user_intent', value: 'Seeking Treatment' }
  },
  {
    id: 'non_surgical_preference',
    question: 'Are you looking for a non-surgical solution?',
    options: ['Yes', 'No'],
    field: 'non_surgical_preference',
    condition: { field: 'user_intent', value: 'Seeking Treatment' }
  },
  {
    id: 'medical_insurance',
    question: 'Do you hold any medical insurance?',
    options: ['Yes', 'No'],
    field: 'medical_insurance',
    condition: { field: 'user_intent', value: 'Seeking Treatment' }
  },
  {
    id: 'name',
    question: 'What is your full name?',
    options: [],
    field: 'name',
    isInput: true,
    placeholder: 'Enter your full name',
    condition: { field: 'user_intent', value: 'Seeking Treatment' }
  },
  {
    id: 'phone',
    question: 'What is your phone number?',
    options: [],
    field: 'phone',
    isInput: true,
    placeholder: 'Enter your phone number',
    condition: { field: 'user_intent', value: 'Seeking Treatment' }
  },
  {
    id: 'city',
    question: 'Which city are you located in?',
    options: [],
    field: 'city',
    isInput: true,
    placeholder: 'Enter your city',
    condition: { field: 'user_intent', value: 'Seeking Treatment' }
  },
  {
    id: 'preferred_language',
    question: 'What is your preferred language for consultation?',
    options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
    field: 'preferred_language',
    condition: { field: 'user_intent', value: 'Seeking Treatment' }
  },
  {
    id: 'appointment_timing',
    question: 'When can we call you to fix your appointment slot?',
    options: ['Today', 'over the next 2 days', 'next week'],
    field: 'appointment_timing',
    condition: { field: 'user_intent', value: 'Seeking Treatment' }
  }
];

const questionnaires = {
  UFE: {
    procedure: 'UFE',
    welcomeMessage: 'Let’s begin a brief fibroid assessment.',
    treatmentPage: '/uae',
    youtubeVideo: 'https://www.youtube.com/shorts/iw5G9U2LMNI',
    specificQuestions: [
      {
        id: 'ufe_diagnosis',
        question: 'Have you been diagnosed of Uterine fibroids?',
        options: ['Yes', 'No'],
        field: 'uterine_fibroids_diagnosed',
        condition: { field: 'user_intent', value: 'Seeking Treatment' }
      },
      {
        id: 'ufe_reports',
        question: 'Do you have any of these reports available?',
        options: ['USG Abdomen', 'MRI Abdomen', 'No Report'],
        field: 'fibroid_tests',
        condition: { field: 'uterine_fibroids_diagnosed', value: 'Yes' }
      }
    ]
  },
  PAE: {
    procedure: 'PAE',
    welcomeMessage: 'Let’s begin a short prostate symptom check.',
    treatmentPage: '/pae',
    youtubeVideo: 'https://www.youtube.com/shorts/c5DucffDYec',
    specificQuestions: [
      {
        id: 'pae_diagnosis',
        question: 'Have you been diagnosed of Enlarged Prostate?',
        options: ['Yes', 'No'],
        field: 'enlarged_prostate_diagnosed',
        condition: { field: 'user_intent', value: 'Seeking Treatment' }
      },
      {
        id: 'pae_symptoms',
        question: 'Do you have Frequent urination?',
        options: ['Yes', 'No'],
        field: 'frequent_urination',
        condition: { field: 'user_intent', value: 'Seeking Treatment' }
      },
      {
        id: 'pae_reports',
        question: 'Do you have any of these reports available?',
        options: ['PSA Test', 'USG Pelvic', 'Uroflowmetry', 'No Report'],
        field: 'prostate_tests',
        multiSelect: true,
        condition: { field: 'enlarged_prostate_diagnosed', value: 'Yes' }
      }
    ]
  },
  GAE: {
    procedure: 'GAE',
    welcomeMessage: 'Let’s get started with a quick knee pain assessment.',
    treatmentPage: '/gae',
    youtubeVideo: 'https://www.youtube.com/shorts/vM5o0rX3lag',
    specificQuestions: [
      {
        id: 'gae_diagnosis',
        question: 'Have you been diagnosed of Osteoarthritis?',
        options: ['Yes', 'No'],
        field: 'osteoarthritis_diagnosed',
        condition: { field: 'user_intent', value: 'Seeking Treatment' }
      },
      {
        id: 'gae_reports',
        question: 'Do you have any of these reports available?',
        options: ['X-Ray Knee', 'MRI Knee', 'No Report'],
        field: 'knee_reports',
        multiSelect: true,
        condition: { field: 'osteoarthritis_diagnosed', value: 'Yes' }
      }
    ]
  },
  TNA: {
    procedure: 'TNA',
    welcomeMessage: 'Let’s start a brief thyroid nodule assessment.',
    treatmentPage: '/thyroid',
    youtubeVideo: 'https://www.youtube.com/shorts/HqoeDQTqAXc',
    specificQuestions: [
      {
        id: 'tna_swollen_neck',
        question: 'Do you have Swollen Neck?',
        options: ['Yes', 'No'],
        field: 'swollen_neck',
        condition: { field: 'user_intent', value: 'Seeking Treatment' }
      },
      {
        id: 'tna_diagnosis',
        question: 'Have you been diagnosed of Thyroid Nodule?',
        options: ['Yes', 'No'],
        field: 'thyroid_nodule_diagnosed',
        condition: { field: 'user_intent', value: 'Seeking Treatment' }
      },
      {
        id: 'tna_reports',
        question: 'Do you have any of these reports available?',
        options: ['USG Neck', 'FNAC', 'No Report'],
        field: 'thyroid_reports',
        multiSelect: true,
        condition: { field: 'thyroid_nodule_diagnosed', value: 'Yes' }
      },
      {
        id: 'tna_appointment',
        question: 'Can we fix up an appointment for you?',
        options: ['Yes', 'No'],
        field: 'fix_appointment',
        condition: { field: 'non_surgical_preference', value: 'Yes' }
      }
    ]
  },
  VV: {
    procedure: 'VV',
    welcomeMessage: 'Let’s quickly assess your vein symptoms.',
    treatmentPage: '/varicose-vein',
    youtubeVideo: 'https://www.youtube.com/shorts/vyanUzoXLg0',
    specificQuestions: [
      {
        id: 'vv_symptoms',
        question: 'Do you have bulging veins or discolaration in legs?',
        options: ['Yes', 'No'],
        field: 'bulging_veins_discoloration',
        condition: { field: 'user_intent', value: 'Seeking Treatment' }
      },
      {
        id: 'vv_diagnosis',
        question: 'Have you been diagnosed of Varicose Veins?',
        options: ['Yes', 'No'],
        field: 'varicose_veins_diagnosed',
        condition: { field: 'user_intent', value: 'Seeking Treatment' }
      },
      {
        id: 'vv_reports',
        question: 'Do you have any of these reports available?',
        options: ['Doppler Scan', 'No Report'],
        field: 'varicose_vein_reports',
        condition: { field: 'varicose_veins_diagnosed', value: 'Yes' }
      }
    ]
  },
  VCE: {
    procedure: 'VCE',
    welcomeMessage: 'Let’s do a quick varicocele symptom check.',
    treatmentPage: '/varicocele-embolization',
    youtubeVideo: 'https://www.youtube.com/shorts/VcS_xm4QExg',
    specificQuestions: [
      {
        id: 'vce_symptoms',
        question: 'Do you have bulging veins or pain in scrotum?',
        options: ['Yes', 'No'],
        field: 'bulging_veins_scrotum',
        condition: { field: 'user_intent', value: 'Seeking Treatment' }
      },
      {
        id: 'vce_diagnosis',
        question: 'Have you been diagnosed of Varicocele?',
        options: ['Yes', 'No'],
        field: 'varicocele_diagnosed',
        condition: { field: 'user_intent', value: 'Seeking Treatment' }
      },
      {
        id: 'vce_reports',
        question: 'Do you have any of these reports available?',
        options: ['Doppler Scan', 'No Report'],
        field: 'varicocele_reports',
        condition: { field: 'varicocele_diagnosed', value: 'Yes' }
      },
      {
        id: 'vce_appointment',
        question: 'Can we fix up an appointment for you?',
        options: ['Yes', 'No'],
        field: 'fix_appointment_vce',
        condition: { field: 'non_surgical_preference', value: 'Yes' }
      }
    ]
  },
  FTR: {
    procedure: 'FTR',
    welcomeMessage: 'Let’s begin a short fertility assessment.',
    treatmentPage: '/fte',
    youtubeVideo: 'https://www.youtube.com/shorts/FstX8x8hkOE',
    specificQuestions: [
      {
        id: 'ftr_diagnosis',
        question: 'Have you been Diagnosed with Blocked FT?',
        options: ['Yes', 'No'],
        field: 'blocked_ft_diagnosed',
        condition: { field: 'user_intent', value: 'Seeking Treatment' }
      },
      {
        id: 'ftr_reports',
        question: 'Do you have HSG Report?',
        options: ['Yes', 'No'],
        field: 'hsg_report_available',
        condition: { field: 'blocked_ft_diagnosed', value: 'Yes' }
      }
    ]
  }
};

// Function to get the full questionnaire for a procedure
const getQuestionnaire = (procedure) => {
  const procedureData = questionnaires[procedure];
  if (!procedureData) return null;

  // Reorder questions: core intro -> specific -> core contact info
  const contactInfoStartIndex = coreQuestions.findIndex(q => q.id === 'name');
  const introQuestions = coreQuestions.slice(0, contactInfoStartIndex);
  const contactQuestions = coreQuestions.slice(contactInfoStartIndex);

  // Find the index of the last specific question that sets a condition for another specific question
  const lastConditionalSpecificIndex = procedureData.specificQuestions.reduce((lastIndex, q, currentIndex) => {
    if (q.condition && procedureData.specificQuestions.some(sq => sq.condition && sq.condition.field === q.field)) {
      return currentIndex;
    }
    return lastIndex;
  }, -1);

  // Insert the specific questions after the core questions that set their conditions
  const combinedQuestions = [...introQuestions];
  procedureData.specificQuestions.forEach(sq => {
    const conditionOriginIndex = combinedQuestions.findIndex(q => q.field === sq.condition?.field);
    if (conditionOriginIndex !== -1) {
      combinedQuestions.splice(conditionOriginIndex + 1, 0, sq);
    } else {
      combinedQuestions.push(sq);
    }
  });

  // Add the remaining contact questions at the end
  combinedQuestions.push(...contactQuestions);

  return {
    ...procedureData,
    questions: combinedQuestions
  };
};

// Function to get next question based on current responses
const getNextQuestion = (currentStep, responses, questionnaire) => {
  const allQuestions = questionnaire.questions;
  
  for (let i = currentStep; i < allQuestions.length; i++) {
    const question = allQuestions[i];
    
    // Check if question has a condition
    if (question.condition) {
      const conditionField = question.condition.field;
      const conditionValue = question.condition.value;
      
      // Skip question if condition is not met
      if (responses[conditionField] !== conditionValue) {
        continue;
      }
    }
    
    return { question, index: i };
  }
  
  return null; // No more questions
};

// Enhanced symptom detection function
const detectProcedureFromSymptoms = (input) => {
  console.log('Checking input for symptoms:', input); // Debug log
  
  const symptomMap = {
    UFE: [
      'ufe', 'uterine fibroid embolization', 'uae', 'uterine artery embolization',
      'uterus', 'womb',
      'heavy periods', 'heavy bleeding', 'menstrual', 'period pain', 'pelvic pain', 
      'fibroid', 'fibroids', 'uterine', 'bloating', 'frequent urination', 'back pain',
      'heavy menstruation', 'prolonged periods', 'painful periods'
    ],
    PAE: [
      'pae', 'prostatic artery embolization',
      'prostate gland',
      'prostate', 'bph', 'urination', 'frequent bathroom', 'weak stream', 'enlarged prostate',
      'difficulty urinating', 'nighttime urination', 'bladder', 'urinary problems',
      'can\'t empty bladder', 'frequent peeing', 'prostate issues'
    ],
    GAE: [
      'gae', 'genicular artery embolization',
      'knee', 'knees', 'joint',
      'knee pain', 'joint pain', 'arthritis', 'walking pain', 'stiffness',
      'climbing stairs', 'knee swelling', 'joint stiffness', 'osteoarthritis',
      'knee arthritis', 'difficulty walking', 'knee discomfort'
    ],
    TNA: [
      'tna', 'thyroid nodule ablation', 'thyroid ablation',
      'thyroid', 'neck',
      'neck lump', 'swollen neck', 'thyroid nodule', 'neck swelling',
      'difficulty swallowing', 'voice changes', 'hoarse voice', 'neck discomfort',
      'thyroid problems', 'neck mass'
    ],
    VV: [
      'vv', 'varicose vein treatment',
      'legs', 'leg',
      'varicose veins', 'spider veins', 'leg veins', 'bulging veins', 'leg pain',
      'discoloration', 'leg swelling', 'heaviness in legs', 'cramping legs',
      'visible veins', 'leg discomfort', 'vein problems'
    ],
    VCE: [
      'vce', 'varicocele embolization',
      'testicles', 'scrotum',
      'varicocele', 'testicular pain', 'scrotal swelling', 'scrotum pain',
      'male fertility', 'testicular discomfort', 'scrotal heaviness',
      'testicular veins', 'fertility issues', 'sperm problems'
    ],
    FTR: [
      'ftr', 'fallopian tube recanalization', 'fte',
      'fallopian tubes',
      'fallopian tube', 'blocked tubes', 'infertility', 'can\'t conceive',
      'difficulty conceiving', 'fertility problems', 'trying to get pregnant',
      'blocked fallopian', 'tube blockage', 'conception issues'
    ]
  };

  for (const [procedure, symptoms] of Object.entries(symptomMap)) {
    const matchedSymptom = symptoms.find(symptom => input.includes(symptom));
    if (matchedSymptom) {
      console.log(`Found match: "${matchedSymptom}" for procedure: ${procedure}`); // Debug log
      return procedure;
    }
  }
  console.log('No procedure detected for input:', input); // Debug log
  return null;
};

// Get procedure information for user
const getProcedureInfo = (procedure) => {
  const procedureInfoMap = {
    UFE: {
      message: "I understand you're experiencing symptoms related to uterine fibroids or heavy bleeding. Our UFE (Uterine Fibroid Embolization) is a non-surgical treatment that can help. Let me ask you a few questions to better understand your condition."
    },
    PAE: {
      message: "It sounds like you're having prostate-related symptoms. Our PAE (Prostatic Artery Embolization) is a minimally invasive treatment for enlarged prostate. I'll ask some questions to assess your condition."
    },
    GAE: {
      message: "I can help with your knee pain concerns. Our GAE (Genicular Artery Embolization) treats knee arthritis without surgery. Let me gather some information about your symptoms."
    },
    TNA: {
      message: "For thyroid nodule concerns, we offer TNA (Thyroid Nodule Ablation) as a non-surgical option. I'll ask you some questions to understand your condition better."
    },
    VV: {
      message: "I understand you're dealing with varicose vein issues. We provide non-surgical varicose vein treatment. Let me ask about your specific symptoms."
    },
    VCE: {
      message: "For varicocele concerns, we offer VCE (Varicocele Embolization) as a minimally invasive treatment. I'll gather some information about your condition."
    },
    FTR: {
      message: "I understand you're facing fertility challenges with blocked fallopian tubes. Our FTR (Fallopian Tube Recanalization) can help restore fertility. Let me ask some questions."
    }
  };

  return procedureInfoMap[procedure] || { message: "Let me help you with your medical concern." };
};

// Quick response buttons for AI-powered interactions
const quickResponses = [
  'Book a consultation',
  'What treatments do you offer?',
  'I have knee pain, can you help?',
  'Tell me about non-surgical options',
  'Insurance & billing questions'
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeCondition, setActiveCondition] = useState(null);
  const [isQuickResponsesOpen, setIsQuickResponsesOpen] = useState(false);
  
  // AI and Medical Context states
  const [medicalContext, setMedicalContext] = useState(createMedicalContext());
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  
  // Appointment booking states
  const [isBookingFlow, setIsBookingFlow] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    name: '',
    city: '',
    phone: '',
    language: '',
    procedure: ''
  });
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  
  // Questionnaire states
  const [isQuestionnaireActive, setIsQuestionnaireActive] = useState(false);
  const [questionnaireStep, setQuestionnaireStep] = useState(0);
  const [questionnaireResponses, setQuestionnaireResponses] = useState({});
  const [isSubmittingQuestionnaire, setIsSubmittingQuestionnaire] = useState(false);
  const [currentQuestionnaire, setCurrentQuestionnaire] = useState(null);
  const [tempMultiSelect, setTempMultiSelect] = useState([]);
  
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Emergency detection function
  const detectEmergency = useCallback((userInput) => {
    const lowercaseInput = userInput.toLowerCase();
    return EMERGENCY_KEYWORDS.some(keyword => lowercaseInput.includes(keyword));
  }, []);

  // Emergency response function
  const getEmergencyResponse = useCallback(() => {
    return {
      text: "🚨 This sounds like a medical emergency. Please call emergency services immediately (108 in India or your local emergency number) or go to the nearest emergency room. If you're experiencing chest pain, difficulty breathing, or any life-threatening symptoms, seek immediate medical attention. I'm here to help with non-emergency medical questions after you've received proper emergency care.",
      isEmergency: true
    };
  }, []);

  // OpenAI API integration
  const callOpenAI = async (userInput, context = []) => {
    try {
      setIsAIProcessing(true);
      
      // Check if Groq API key is available
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey || apiKey === 'your_groq_api_key_here') {
        throw new Error('Groq API key not configured');
      }
      
      // Build conversation context
      const messages = [
        { role: 'system', content: MEDICAL_SYSTEM_PROMPT },
        ...context,
        { role: 'user', content: userInput }
      ];

      const requestPayload = {
        model: 'llama-3.1-8b-instant',
        messages: messages,
        max_tokens: 150,
        temperature: 0.3
      };


      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestPayload)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        text: data.choices[0].message.content,
        usage: data.usage
      };
    } catch (error) {
      console.error('API Error:', error);
      // Fallback to basic response
      return {
        text: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment, or feel free to call us directly at +91 9363656010 for immediate assistance.",
        error: true
      };
    } finally {
      setIsAIProcessing(false);
    }
  };

  // Update medical context based on conversation
  const updateMedicalContext = useCallback((userInput, aiResponse) => {
    setMedicalContext(prev => {
      const updated = { ...prev };
      
      // Extract symptoms and concerns from user input
      const lowercaseInput = userInput.toLowerCase();
      
      // Common symptom keywords
      const symptomKeywords = ['pain', 'ache', 'swelling', 'bleeding', 'lump', 'nodule', 'difficulty', 'problem'];
      const foundSymptoms = symptomKeywords.filter(symptom => lowercaseInput.includes(symptom));
      
      if (foundSymptoms.length > 0) {
        updated.symptoms = [...new Set([...updated.symptoms, ...foundSymptoms])];
      }
      
      // Detect treatment interest
      if (lowercaseInput.includes('appointment') || lowercaseInput.includes('book') || lowercaseInput.includes('schedule')) {
        updated.currentIntent = 'booking';
      } else if (foundSymptoms.length > 0) {
        updated.currentIntent = 'inquiry';
      }
      
      return updated;
    });
  }, []);

  // Function to start questionnaire
  const startQuestionnaire = useCallback((procedure) => {
    const questionnaire = getQuestionnaire(procedure);
    if (!questionnaire) return;

    setIsQuestionnaireActive(true);
    setQuestionnaireStep(0);
    setQuestionnaireResponses({ procedure });
    setCurrentQuestionnaire(questionnaire);
    
    const botMessage = {
      text: questionnaire.welcomeMessage,
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, botMessage]);
    
    // Ask first question after a short delay
    setTimeout(() => {
      const firstQuestion = {
        text: questionnaire.questions[0].question,
        sender: 'bot',
        timestamp: new Date(),
        isQuestionnaireQuestion: true,
        questionId: questionnaire.questions[0].id,
        options: questionnaire.questions[0].options,
        isInput: questionnaire.questions[0].isInput,
        field: questionnaire.questions[0].field,
        placeholder: questionnaire.questions[0].placeholder
      };
      setMessages(prev => [...prev, firstQuestion]);
    }, 1000);
  }, []);

  // Booking flow questions
  const bookingQuestions = [
    { field: 'name', question: 'What is your full name?', placeholder: 'Enter your full name' },
    { field: 'city', question: 'Which city are you located in?', placeholder: 'Enter your city' },
    { field: 'phone', question: 'What is your phone number?', placeholder: 'Enter your phone number' },
    { field: 'language', question: 'What is your preferred language for consultation?', placeholder: 'e.g., English, Hindi, Tamil' },
    { field: 'procedure', question: 'Which procedure or treatment are you interested in?', placeholder: 'e.g., PAE, GAE, Thyroid treatment' }
  ];

  // Function to start booking flow
  const startBookingFlow = useCallback(() => {
    setIsBookingFlow(true);
    setBookingStep(0);
    setBookingData({ name: '', city: '', phone: '', language: '', procedure: '' });
    
    const botMessage = {
      text: 'I\'d be happy to help you book an appointment! Let me collect some information from you.',
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, botMessage]);
    
    // Ask first question after a short delay
    setTimeout(() => {
      const firstQuestion = {
        text: bookingQuestions[0].question,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, firstQuestion]);
    }, 1000);
  }, []);

  // Function to handle questionnaire responses
  const handleQuestionnaireResponse = useCallback((response) => {
    const currentQuestion = currentQuestionnaire.questions[questionnaireStep];
    const selectedOption = Array.isArray(response) ? response.join(', ') : response;
    const updatedResponses = { ...questionnaireResponses, [currentQuestion.field]: selectedOption };
    setQuestionnaireResponses(updatedResponses);

    // Check if user selected "Seeking General Information" on first question
    if (currentQuestion.field === 'user_intent' && selectedOption === 'Seeking General Information') {
      // End questionnaire and show information response
      const infoMessage = {
        text: `🎉 Thank you for your interest in ${currentQuestionnaire.procedure}! \n\nHere are some helpful resources for you:\n\n📖 Learn more about ${currentQuestionnaire.procedure} treatment on our detailed page\n🎥 Watch our informative video about ${currentQuestionnaire.procedure} procedure\n\nFeel free to reach out if you have any questions!`,
        sender: 'bot',
        timestamp: new Date(),
        aiGenerated: true,
        recommendedTreatment: currentQuestionnaire.treatmentPage,
        youtubeVideo: currentQuestionnaire.youtubeVideo
      };
      setMessages(prev => [...prev, infoMessage]);
      
      // Reset questionnaire state
      setIsQuestionnaireActive(false);
      setQuestionnaireStep(0);
      setQuestionnaireResponses({});
      setCurrentQuestionnaire(null);
      return;
    }

    // Check if user selected "No" for non-surgical solution
    if ((currentQuestion.field === 'non_surgical_preference' && selectedOption === 'No') || (currentQuestion.field === 'fix_appointment' && selectedOption === 'No') || (currentQuestion.field === 'fix_appointment_vce' && selectedOption === 'No')) {
      // End questionnaire and show information response
      const infoMessage = {
        text: `🎉 Thank you for your interest in ${currentQuestionnaire.procedure}! \n\nHere are some helpful resources for you:\n\n📖 Learn more about ${currentQuestionnaire.procedure} treatment on our detailed page\n🎥 Watch our informative video about ${currentQuestionnaire.procedure} procedure\n\nFeel free to reach out if you have any questions!`,
        sender: 'bot',
        timestamp: new Date(),
        aiGenerated: true,
        recommendedTreatment: currentQuestionnaire.treatmentPage,
        youtubeVideo: currentQuestionnaire.youtubeVideo
      };
      setMessages(prev => [...prev, infoMessage]);
      
      // Reset questionnaire state
      setIsQuestionnaireActive(false);
      setQuestionnaireStep(0);
      setQuestionnaireResponses({});
      setCurrentQuestionnaire(null);
      return;
    }

    // Find next valid question based on conditions
    const nextQuestionData = getNextQuestion(questionnaireStep + 1, updatedResponses, currentQuestionnaire);
    
    if (nextQuestionData) {
      // Move to next question
      setQuestionnaireStep(nextQuestionData.index);
      
      setTimeout(() => {
        const nextQuestion = {
          text: nextQuestionData.question.question,
          sender: 'bot',
          timestamp: new Date(),
          isQuestionnaireQuestion: true,
          questionId: nextQuestionData.question.id,
          options: nextQuestionData.question.options,
          isInput: nextQuestionData.question.isInput,
          field: nextQuestionData.question.field,
          placeholder: nextQuestionData.question.placeholder
        };
        setMessages(prev => [...prev, nextQuestion]);
      }, 500);
    } else {
      // All questions answered, set flag to trigger submission
      setQuestionnaireStep(prev => prev + 1); // Increment step to mark completion
    }
  }, [questionnaireStep, questionnaireResponses, currentQuestionnaire]);

  // Function to handle booking step responses
  const handleBookingResponse = useCallback((userInput) => {
    const currentQuestion = bookingQuestions[bookingStep];
    const updatedData = { ...bookingData, [currentQuestion.field]: userInput };
    setBookingData(updatedData);

    if (bookingStep < bookingQuestions.length - 1) {
      // Move to next question
      const nextStep = bookingStep + 1;
      setBookingStep(nextStep);
      
      setTimeout(() => {
        const nextQuestion = {
          text: bookingQuestions[nextStep].question,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, nextQuestion]);
      }, 500);
    } else {
      // All questions answered, submit to TeleCRM
      submitBookingToTeleCRM(updatedData);
    }
  }, [bookingStep, bookingData]);

  // Effect to submit questionnaire when all questions are answered
  useEffect(() => {
    if (isQuestionnaireActive && currentQuestionnaire && questionnaireStep === currentQuestionnaire.questions.length) {
      submitQuestionnaireToTeleCRM(questionnaireResponses, currentQuestionnaire);
    }
  }, [questionnaireStep, isQuestionnaireActive, questionnaireResponses, currentQuestionnaire]);

  // Function to submit questionnaire responses to TeleCRM
  const submitQuestionnaireToTeleCRM = useCallback(async (responses, questionnaire) => {
    setIsSubmittingQuestionnaire(true);
    
    const submittingMessage = {
      text: `Thank you for completing the ${questionnaire.procedure} assessment. Let me save your responses...`,
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, submittingMessage]);

    try {
      const allowedFields = [
        'procedure', 'name', 'city', 'preferred_language', 'age_group',
        'uterine_fibroids_diagnosed', 'symptoms_duration', 'non_surgical_preference',
        'medical_insurance', 'fibroid_tests', 'appointment_timing', 'phone',
        'enlarged_prostate_diagnosed', 'frequent_urination', 'prostate_tests',
        'osteoarthritis_diagnosed', 'knee_reports',
        'swollen_neck', 'thyroid_nodule_diagnosed', 'thyroid_reports', 'fix_appointment',
        'bulging_veins_discoloration', 'varicose_veins_diagnosed', 'varicose_vein_reports',
        'bulging_veins_scrotum', 'varicocele_diagnosed', 'varicocele_reports', 'fix_appointment_vce',
        'blocked_ft_diagnosed', 'hsg_report_available'
      ];

      const responsesForSubmission = {};
      for (const key in responses) {
        if (allowedFields.includes(key)) {
          responsesForSubmission[key] = responses[key];
        }
      }

      console.log('Questionnaire Responses being submitted:', responsesForSubmission);

      const payload = {
        fields: {
          phone: responsesForSubmission.phone || '',
          name: responsesForSubmission.name || '',
          city: responsesForSubmission.city || '',
          preferred_language: responsesForSubmission.preferred_language || '',
          procedure: responsesForSubmission.procedure || questionnaire.procedure,
          age_group_hidden_0: responsesForSubmission.age_group || '',
          uterine_fibroids_diagnosed_hidden_1: responsesForSubmission.uterine_fibroids_diagnosed || '',
          symptoms_duration_hidden_2: responsesForSubmission.symptoms_duration || '',
          non_surgical_preference_hidden_3: responsesForSubmission.non_surgical_preference || '',
          medical_insurance_hidden_4: responsesForSubmission.medical_insurance || '',
          fibroid_tests_hidden_5: responsesForSubmission.fibroid_tests || '',
          appointment_timing_hidden_6: responsesForSubmission.appointment_timing || '',
          enlarged_prostate_diagnosed_hidden_7: responsesForSubmission.enlarged_prostate_diagnosed || '',
          frequent_urination_hidden_8: responsesForSubmission.frequent_urination || '',
          prostate_tests_hidden_9: responsesForSubmission.prostate_tests || '',
          osteoarthritis_diagnosed_hidden_10: responsesForSubmission.osteoarthritis_diagnosed || '',
          knee_reports_hidden_11: responsesForSubmission.knee_reports || '',
          swollen_neck_hidden_12: responsesForSubmission.swollen_neck || '',
          thyroid_nodule_diagnosed_hidden_13: responsesForSubmission.thyroid_nodule_diagnosed || '',
          thyroid_reports_hidden_14: responsesForSubmission.thyroid_reports || '',
          fix_appointment_hidden_15: responsesForSubmission.fix_appointment || '',
          bulging_veins_discoloration_hidden_16: responsesForSubmission.bulging_veins_discoloration || '',
          varicose_veins_diagnosed_hidden_17: responsesForSubmission.varicose_veins_diagnosed || '',
          varicose_vein_reports_hidden_18: responsesForSubmission.varicose_vein_reports || '',
          bulging_veins_scrotum_hidden_19: responsesForSubmission.bulging_veins_scrotum || '',
          varicocele_diagnosed_hidden_20: responsesForSubmission.varicocele_diagnosed || '',
          varicocele_reports_hidden_21: responsesForSubmission.varicocele_reports || '',
          fix_appointment_vce_hidden_22: responsesForSubmission.fix_appointment_vce || '',
          blocked_ft_diagnosed_hidden_23: responsesForSubmission.blocked_ft_diagnosed || '',
          hsg_report_available_hidden_24: responsesForSubmission.hsg_report_available || '',
          source: `Website - ${questionnaire.procedure} Chatbot Questionnaire`,
        },
      };
      
      console.log('TeleCRM Payload:', payload);
      
      const response = await fetch('https://api.telecrm.in/enterprise/658abddbf911ed2d692b0cf5/autoupdatelead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_TELECRM_API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // TeleCRM submission successful - no need to show confirmation to user
        
        setTimeout(() => {
          const thankYouMessage = {
            text: `🎉 Thank you for completing the ${questionnaire.procedure} assessment! \n\nBased on your responses, our medical team will review your case and contact you for a personalized consultation. Our experts will reach out to you according to your preferred timing. \n\nFor more information about ${questionnaire.procedure} treatment, you can visit our detailed treatment page.`,
            sender: 'bot',
            timestamp: new Date(),
            aiGenerated: true,
            recommendedTreatment: questionnaire.treatmentPage
          };
          setMessages(prev => [...prev, thankYouMessage]);
        }, 1000);
      } else {
        const errorText = await response.text();
        console.error('TeleCRM API Error:', response.status, errorText);
        throw new Error(`API submission failed: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Questionnaire submission error:', error);
      const errorMessage = {
        text: 'I apologize, but there was an issue submitting your assessment. Please try again or contact us directly at +91 9363656010.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsSubmittingQuestionnaire(false);
      setIsQuestionnaireActive(false);
      setQuestionnaireStep(0);
      setCurrentQuestionnaire(null);
    }
  }, []);

  // Function to submit booking data to TeleCRM
  const submitBookingToTeleCRM = useCallback(async (data) => {
    setIsSubmittingBooking(true);
    
    const submittingMessage = {
      text: 'Thank you for providing all the information. Let me book your appointment...',
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, submittingMessage]);

    try {
      const response = await fetch('https://api.telecrm.in/enterprise/658abddbf911ed2d692b0cf5/autoupdatelead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_TELECRM_API_KEY}`,
        },
        body: JSON.stringify({
          fields: {
            name: data.name,
            phone: data.phone,
            city: data.city,
            language: data.language,
            procedure: data.procedure,
            source: 'Website - Chatbot Appointment Booking',
          },
        }),
      });

      if (response.ok) {
        const successMessage = {
          text: 'Perfect! Your appointment request has been submitted successfully. Thank you for choosing MedAgg. Our expert team will be reaching you shortly to confirm your appointment details.',
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, successMessage]);
      } else {
        throw new Error('API submission failed');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      const errorMessage = {
        text: 'I apologize, but there was an issue submitting your appointment request. Please try again or contact us directly at +91 9363656010.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsSubmittingBooking(false);
      setIsBookingFlow(false);
      setBookingStep(0);
    }
  }, []);

  // Function to detect recommended treatment from AI response
  const detectRecommendedTreatment = useCallback((aiResponseText) => {
    const treatmentMap = {
      'GAE': '/gae',
      'Genicular Artery Embolization': '/gae',
      'knee pain': '/gae',
      'PAE': '/pae',
      'Prostatic Artery Embolization': '/pae',
      'prostate': '/pae',
      'BPH': '/pae',
      'Thyroid': '/thyroid',
      'thyroid nodule': '/thyroid',
      'Breast': '/breast-nodule-vae',
      'breast nodule': '/breast-nodule-vae',
      'VAE': '/breast-nodule-vae',
      'Endovascular Coiling': '/endovascular-coiling',
      'aneurysm': '/endovascular-coiling',
      'Radiofrequency Ablation': '/radiofrequency-ablation-for-avm',
      'AVM': '/radiofrequency-ablation-for-avm',
      'Cryoablation': '/breast-nodule-cryoablation',
      'CTO': '/cto',
      'Chronic Total Occlusion': '/cto',
      'Varicose': '/varicose-vein',
      'varicose vein': '/varicose-vein',
      'Varicocele': '/varicocele-embolization',
      'UFE': '/uae',
      'UAE': '/uae',
      'Uterine Fibroid': '/uae',
      'fibroid': '/uae',
      'PFE': '/pfe',
      'Plantar Fascial': '/pfe',
      'heel pain': '/pfe',
      'Fallopian': '/fte',
      'FTE': '/fte',
      'TAVI': '/transcatheter-aortic-valve-replacement',
      'Aortic Valve': '/transcatheter-aortic-valve-replacement',
      'RFA': '/rfa'
    };

    const responseText = aiResponseText.toLowerCase();
    
    for (const [keyword, route] of Object.entries(treatmentMap)) {
      if (responseText.includes(keyword.toLowerCase())) {
        return route;
      }
    }
    
    return '/#services'; // Default fallback to home page services section
  }, []);

  // AI-powered response generation
  const generateResponse = useCallback(async (userInput) => {
    // Check if we're in questionnaire flow
    if (isQuestionnaireActive) {
      // This should not happen as questionnaire uses option buttons
      return;
    }

    // Check if we're in booking flow
    if (isBookingFlow) {
      handleBookingResponse(userInput);
      return;
    }

    // Check for emergency first
    if (detectEmergency(userInput)) {
      const emergencyResponse = getEmergencyResponse();
      const botMessage = {
        text: emergencyResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        isEmergency: true
      };
      setMessages(prev => [...prev, botMessage]);
      return;
    }

    // Check if user wants contact information
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email') || 
        lowerInput.includes('address') || lowerInput.includes('office') || lowerInput.includes('location') ||
        lowerInput.includes('reach') || lowerInput.includes('call')) {
      const contactResponse = {
        text: `Here's our contact information:\n\n📞 **Phone:** +91 9363656010\n📧 **Email:** contact@medagg.com\n📍 **Location:** Perungudi, Chennai\n\nOur team is available to assist you with any questions or to schedule your consultation. Feel free to reach out to us anytime!`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, contactResponse]);
      return;
    }

    // Enhanced symptom detection for automatic questionnaire triggering
    const detectedProcedure = detectProcedureFromSymptoms(lowerInput);
    
    if (detectedProcedure) {
      console.log('Detected procedure:', detectedProcedure); // Debug log
      
      // Provide brief information first, then start questionnaire
      const procedureInfo = getProcedureInfo(detectedProcedure);
      
      const infoMessage = {
        text: procedureInfo.message,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, infoMessage]);
      
      // Start questionnaire after brief delay
      setTimeout(() => {
        console.log('Starting questionnaire for:', detectedProcedure); // Debug log
        startQuestionnaire(detectedProcedure);
      }, 1500);
      return;
    }

    setIsTyping(true);

    try {
      // Get AI response
      const aiResponse = await callOpenAI(userInput, conversationHistory);
      
      // Detect recommended treatment from AI response
      const recommendedTreatmentRoute = detectRecommendedTreatment(aiResponse.text);
      
      // Update conversation history
      setConversationHistory(prev => [
        ...prev,
        { role: 'user', content: userInput },
        { role: 'assistant', content: aiResponse.text }
      ].slice(-10)); // Keep last 10 messages for context

      // Update medical context
      updateMedicalContext(userInput, aiResponse.text);

      const botMessage = {
        text: aiResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        aiGenerated: true,
        recommendedTreatment: recommendedTreatmentRoute
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage = {
        text: "I apologize for the technical difficulty. Please try again or contact us directly at +91 9363656010 for immediate assistance.",
        sender: 'bot',
        timestamp: new Date(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [detectEmergency, getEmergencyResponse, isQuestionnaireActive, isBookingFlow, handleBookingResponse, startBookingFlow, startQuestionnaire, callOpenAI, conversationHistory, updateMedicalContext, detectRecommendedTreatment]);

  const handleQuickResponse = (response) => {
    const userMessage = {
      text: response,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    // Auto-close the Quick Responses panel after a selection
    setIsQuickResponsesOpen(false);
    
    // Check if it's a booking request
    if (response.toLowerCase().includes('book') && response.toLowerCase().includes('consultation')) {
      startBookingFlow();
    } else {
      // Use AI-powered response for all quick responses
      generateResponse(response);
    }
  };

  // Handle option button clicks for questionnaire
  const handleOptionClick = (option) => {
    const userMessage = {
      text: option,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    handleQuestionnaireResponse(option);
  };

  const handleMultiSelectChange = (option) => {
    setTempMultiSelect(prev => {
      if (prev.includes(option)) {
        return prev.filter(item => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const handleMultiSelectContinue = () => {
    const userMessage = {
      text: tempMultiSelect.join(', '),
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    handleQuestionnaireResponse(tempMultiSelect);
    setTempMultiSelect([]);
  };

  // Handle text input for questionnaire
  const handleQuestionnaireInput = (value) => {
    const userMessage = {
      text: value,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    handleQuestionnaireResponse(value);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = {
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    generateResponse(userMessage.text);
  };

  return (
    <>
      {/* Chatbot toggle button */}
      {!isOpen && (
        <div 
          className='fixed z-40 bottom-4 right-4 sm:bottom-8 sm:right-8 no-pointer'
        >
          <div
            onClick={toggleChat}
            className='clickable w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-56 xl:h-56 cursor-pointer transition-all duration-300 transform hover:scale-110'
            aria-label='Open chat'
          >
            <img
              src='/new_animated.gif'
              alt='Chat with Dr. Medagg'
              className='w-full h-full object-contain'
            />
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className='fixed z-50 inset-0 sm:inset-auto sm:bottom-8 sm:right-8 clickable w-full h-full sm:w-[380px] sm:h-[600px] sm:max-h-[80vh] bg-white sm:rounded-2xl shadow-2xl flex flex-col border border-gray-100 transform transition-all duration-300'>
          {/* Header */}
          <div className='bg-gradient-to-r from-pink-500 to-pink-400 p-3 sm:p-4 text-white flex items-center shadow-md sm:rounded-t-2xl'>
            <div className='flex items-center flex-1'>
              <div className='w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full p-1 mr-2 sm:mr-3 flex items-center justify-center border-2 border-white/30'>
                <svg className='h-6 w-6 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <div>
                <h3 className='font-bold text-base sm:text-lg'>Ira</h3>
                <p className='text-xs text-pink-100 font-medium'>Virtual Health Assistant</p>
              </div>
            </div>
            <div className='flex items-center space-x-1 sm:space-x-2'>
              <button
                onClick={() => setIsOpen(false)}
                className='p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors'
                aria-label='Close chat'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 sm:h-6 sm:w-6'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
          </div>


          {/* Messages */}
          <div
            ref={chatContainerRef}
            className='flex-1 p-4 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thumb-rounded-full'
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 transition-all duration-200 ${message.sender === 'user' ? 'text-right' : ''}`}
              >
                {message.sender === 'bot' && (
                  <div className='flex items-start group'>
                    <div className='w-11 h-11 bg-pink-100 rounded-full mr-4 flex-shrink-0 flex items-center justify-center shadow-inner border border-pink-200'>
                      <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-pink-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                    </div>
                    <div className='max-w-[90%]'>
                      <div className='inline-block px-5 py-4 text-base rounded-2xl bg-white text-gray-800 rounded-tl-none shadow-sm border border-gray-100 group-hover:shadow-md transition-all relative'>
                        <div className='prose prose-sm max-w-none text-gray-700'>
                          {message.text.split('\n').map((paragraph, i) => (
                            <p key={i} className='mb-2 last:mb-0'>{paragraph}</p>
                          ))}
                        </div>
                        {message.isQuestionnaireQuestion && message.options && !message.multiSelect && (
                          <div className='mt-4 space-y-2'>
                            {message.options.map((option, optionIndex) => (
                              <button
                                key={optionIndex}
                                onClick={() => handleOptionClick(option)}
                                className='block w-full text-left px-4 py-3 bg-gradient-to-r from-pink-50 to-pink-100 text-pink-700 rounded-lg hover:from-pink-100 hover:to-pink-200 transition-all shadow-sm hover:shadow-md border border-pink-200'
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                        {message.isQuestionnaireQuestion && message.multiSelect && (
                          <div className='mt-4 space-y-2'>
                            {message.options.map((option, i) => (
                              <div key={i} className='flex items-center'>
                                <input
                                  type='checkbox'
                                  id={`checkbox-${i}`}
                                  value={option}
                                  onChange={() => handleMultiSelectChange(option)}
                                  className='h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500'
                                />
                                <label htmlFor={`checkbox-${i}`} className='ml-3 text-sm text-gray-700'>
                                  {option}
                                </label>
                              </div>
                            ))}
                            <button
                              onClick={handleMultiSelectContinue}
                              className='mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all shadow-sm'
                            >
                              Continue
                            </button>
                          </div>
                        )}
                        {message.isQuestionnaireQuestion && message.isInput && (
                          <div className='mt-2'>
                            <input
                              type='text'
                              placeholder={message.placeholder}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleQuestionnaireInput(e.target.value);
                                  e.target.value = '';
                                }
                              }}
                              className='w-full px-3 py-2 border rounded-lg text-gray-800'
                            />
                          </div>
                        )}
                        {message.aiGenerated && (
                          <div className='mt-3 space-y-2'>
                            <Link
                              to={message.recommendedTreatment || '/treatments'}
                              className='inline-flex items-center text-sm px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-lg hover:from-pink-600 hover:to-pink-500 transition-all shadow-sm hover:shadow-md'
                            >
                              View Treatment Options
                              <svg className='ml-1.5 w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' />
                              </svg>
                            </Link>
                            {message.youtubeVideo && (
                              <a
                                href={message.youtubeVideo}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='inline-flex items-center text-sm px-4 py-2 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-lg hover:from-red-600 hover:to-red-500 transition-all shadow-sm hover:shadow-md ml-2'
                              >
                                Watch Video
                                <svg className='ml-1.5 w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                                  <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'/>
                              </svg>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                      <div className='text-xs text-gray-400 mt-1 ml-2'>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                )}

                {message.sender === 'user' && (
                  <div className='flex items-end justify-end group'>
                    <div className='max-w-[90%]'>
                      <div className='inline-block px-5 py-4 text-base rounded-2xl bg-gradient-to-r from-pink-500 to-pink-400 text-white shadow-sm hover:shadow-md transition-all'>
                        <div className='prose prose-sm max-w-none text-white'>
                          {message.text}
                        </div>
                      </div>
                      <div className='text-xs text-gray-400 mt-1 mr-2 text-right'>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <div className='w-11 h-11 bg-white rounded-full ml-4 flex-shrink-0 flex items-center justify-center shadow-inner border border-pink-100'>
                      <svg className='h-5 w-5 text-pink-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zm0 0v-8' />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {(isTyping || isAIProcessing) && (
              <div className='mb-4 flex items-start'>
                <div className='w-9 h-9 bg-pink-100 rounded-full mr-3 flex-shrink-0 flex items-center justify-center shadow-inner border border-pink-200'>
                  <svg className='h-5 w-5 text-pink-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </div>
                <div className='inline-block px-4 py-3 rounded-2xl bg-white text-gray-800 rounded-tl-none shadow-sm border border-gray-100'>
                  <div className='flex items-center space-x-2'>
                    <div className='flex space-x-1.5'>
                      <div className='w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce' style={{ animationDelay: '0ms' }}></div>
                      <div className='w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce' style={{ animationDelay: '150ms' }}></div>
                      <div className='w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce' style={{ animationDelay: '300ms' }}></div>
                    </div>
                    {isAIProcessing && (
                      <span className='text-xs text-gray-500 ml-2'>AI thinking...</span>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className='h-4' />
          </div>

          {/* Quick responses */}
          <div className='px-4 py-3 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100'>
            <button 
              onClick={() => setIsQuickResponsesOpen(!isQuickResponsesOpen)}
              className='flex justify-between items-center w-full text-left text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors mb-2'>
              <span>Quick Responses</span>
              <svg xmlns='http://www.w3.org/2000/svg' className={`h-5 w-5 transform transition-transform ${isQuickResponsesOpen ? 'rotate-180' : ''}`} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </button>
            {isQuickResponsesOpen && (
              <div className='flex flex-wrap gap-2 overflow-x-auto pb-1 scrollbar-hide'>
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickResponse(response)}
                    className={`text-xs font-medium px-3.5 py-2 rounded-full transition-all whitespace-nowrap
                      ${
                        response === 'Schedule Your Appointment'
                          ? 'bg-gradient-to-r from-pink-500 to-pink-400 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.03] border border-white/30 hover:border-white/50'
                          : 'bg-white hover:bg-pink-50 text-pink-600 border border-pink-200 hover:border-pink-300 shadow-sm hover:shadow'
                      }`}
                  >
                    {response === 'Schedule Your Appointment' ? (
                      <div className='flex items-center space-x-1.5'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-white/90' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                        </svg>
                        <span className='font-semibold'>Schedule Appointment</span>
                      </div>
                    ) : (
                      response
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className='p-4 bg-white border-t border-gray-100'>
            {isBookingFlow && bookingStep < bookingQuestions.length && (
              <div className='mb-3 px-2'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm font-medium text-gray-600'>
                    Step {bookingStep + 1} of {bookingQuestions.length}
                  </span>
                  <div className='flex space-x-1'>
                    {bookingQuestions.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index <= bookingStep ? 'bg-pink-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className='flex items-center px-5 py-3 bg-white rounded-xl border-2 border-pink-100 focus-within:border-pink-300 focus-within:ring-2 focus-within:ring-pink-100 transition-all duration-200 shadow-sm'>
              <input
                type='text'
                value={inputValue}
                onChange={handleInputChange}
                placeholder={
                  isBookingFlow && bookingStep < bookingQuestions.length
                    ? bookingQuestions[bookingStep].placeholder
                    : 'Enter your health query...'
                }
                className='flex-1 p-2 focus:outline-none text-gray-800 placeholder-gray-500 text-base font-medium'
                aria-label='Type your message'
                disabled={isSubmittingBooking || isSubmittingQuestionnaire}
              />
              <button
                type='submit'
                disabled={!inputValue.trim() || isSubmittingBooking || isSubmittingQuestionnaire || isAIProcessing}
                className={`ml-1 p-2 rounded-full transition-colors ${
                  !inputValue.trim() || isSubmittingBooking || isSubmittingQuestionnaire || isAIProcessing ? 'text-gray-300' : 'text-pink-500 hover:text-pink-600'
                }`}
                aria-label='Send message'
              >
                <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>

  );
};

export default Chatbot;
