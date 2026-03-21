import React, { useState, useRef, useEffect, useCallback } from 'react';
import { treatments } from '../../data/treatments';
import { Link, useNavigate } from 'react-router-dom';
import { detectTreatment } from '../../utils/keywordMatcher';
import { detectTreatmentFuzzyGate } from '../../utils/keywordMatcherGate';

// Medical AI System Configuration
const MEDICAL_SYSTEM_PROMPT = `You are IRa, an Interventional Radiology Assistant for Medagg Healthcare, specializing in Interventional Radiology and non-surgical treatments.

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
- PAGE LINK: /genicular-artery-embolization-gae

🫁 PAE (Prostatic Artery Embolization):
- PRIMARY: Enlarged prostate, BPH symptoms
- SYMPTOMS: Frequent urination, weak urine stream, difficulty starting urination, nighttime urination
- KEYWORDS: prostate, urination, BPH, frequent bathroom visits, weak stream
- PAGE LINK: /prostate-artery-embolization-pae

🦋 Thyroid Nodule Ablation:
- PRIMARY: Thyroid nodules, thyroid lumps
- SYMPTOMS: Neck swelling, difficulty swallowing, voice changes, neck discomfort
- KEYWORDS: tna, thyroid, neck lump, swollen neck, swallowing difficulty, voice hoarse
- PAGE LINK: /thyroid-nodule-ablation

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
- PAGE LINK: /uterine-artery-embolization-uae

🦶 Plantar Fascial Embolization (PFE):
- PRIMARY: Chronic plantar fasciitis, heel pain
- SYMPTOMS: Heel pain, foot pain, morning stiffness, difficulty walking
- KEYWORDS: plantar fasciitis, heel pain, foot pain, walking difficulty
- PAGE LINK: /pfe-treatment

🌺 Fallopian Tube Recanalization:
- PRIMARY: Blocked fallopian tubes, fertility issues
- SYMPTOMS: Infertility, difficulty conceiving, blocked tubes
- KEYWORDS: ftr, fte, fallopian tube recanalization, blocked tubes, infertility
- PAGE LINK: /fallopian-tube-recanalization-ftr

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
  'anaphylaxis', 'severe head injury', 'broken bone', 'severe burn',
];

// Medical context tracking
const createMedicalContext = () => ({
  symptoms: [],
  concerns: [],
  previousTreatments: [],
  currentIntent: null, // 'inquiry', 'booking', 'emergency'
  suggestedTreatments: [],
  conversationSummary: '',
  riskLevel: 'low',
});

const initialMessages = [
  {
    text: 'Hi, I’m IRa 👋I help people understand treatment options — especially non-surgical ones — and guide them to the right care. How can I help you today?',
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
    field: 'user_intent',
  },
  {
    id: 'age_group',
    question: 'Do you fall in any of these age groups?',
    options: ['Below 25', '25 to 35', '35 to 45', 'Above 45'],
    field: 'age_group',
    condition: { field: 'user_intent', value: 'Seeking Treatment' },
  },
  {
    id: 'symptoms_duration',
    question: 'How long have you been experiencing these symptoms?',
    options: ['Less than 6 months', '6 months to 1 year', '1-2 years', 'More than 2 years'],
    field: 'symptoms_duration',
    condition: { field: 'user_intent', value: 'Seeking Treatment' },
  },
  {
    id: 'non_surgical_preference',
    question: 'Are you looking for a non-surgical solution?',
    options: ['Yes', 'No'],
    field: 'non_surgical_preference',
    condition: { field: 'user_intent', value: 'Seeking Treatment' },
  },
  {
    id: 'medical_insurance',
    question: 'Do you hold any medical insurance?',
    options: ['Yes', 'No'],
    field: 'medical_insurance',
    condition: { field: 'user_intent', value: 'Seeking Treatment' },
  },
  {
    id: 'name',
    question: 'What is your full name?',
    options: [],
    field: 'name',
    isInput: true,
    placeholder: 'Enter your full name',
    condition: { field: 'user_intent', value: 'Seeking Treatment' },
  },
  {
    id: 'phone',
    question: 'What is your phone number?',
    options: [],
    field: 'phone',
    isInput: true,
    placeholder: 'Enter your phone number',
    condition: { field: 'user_intent', value: 'Seeking Treatment' },
  },
  {
    id: 'city',
    question: 'Which city are you located in?',
    options: [],
    field: 'city',
    isInput: true,
    placeholder: 'Enter your city',
    condition: { field: 'user_intent', value: 'Seeking Treatment' },
  },
  {
    id: 'preferred_language',
    question: 'What is your preferred language for consultation?',
    options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
    field: 'preferred_language',
    condition: { field: 'user_intent', value: 'Seeking Treatment' },
  },
  {
    id: 'appointment_timing',
    question: 'When can we call you to fix your appointment slot?',
    options: ['Today', 'over the next 2 days', 'next week'],
    field: 'appointment_timing',
    condition: { field: 'user_intent', value: 'Seeking Treatment' },
  },
];

const questionnaires = {
  MAIN_MENU: {
    procedure: 'MAIN_MENU',
    useCoreQuestions: false,
    welcomeMessage:
      'Hello 👋\nI’m IRa, your Interventional Radiology Assistant from Medagg Healthcare.\nI’m here to help you understand modern, non‑surgical treatment options and guide you step by step.\nWhich Condition would you like to know more about?',
    treatmentPage: '/#services',
    youtubeVideo: null,
    specificQuestions: [
      {
        id: 'menu_choice',
        question: 'Please choose one option:',
        options: [
          '1- Varicose Vein',
          '2- Fallopian Tube Recanalization',
          '3- Genicular Artery Embolization',
          '4- Thyroid Nodule',
          '5- Uterine Fibroids',
          '6- Breast Nodule',
        ],
        field: 'menu_choice',
      },
    ],
  },
  UFE: {
    procedure: 'UFE',
    useCoreQuestions: false,
    welcomeMessage:
      'Hello 👋\n\nYou\'ve reached out regarding Uterine Fibroids, which are growths that develop in or around the uterus and may cause heavy periods, pain, bloating, or pressure symptoms.',
    treatmentPage: '/uterine-artery-embolization-uae',
    youtubeVideo: 'https://www.youtube.com/shorts/iw5G9U2LMNI',
    specificQuestions: [
      {
        id: 'ufe_path_choice',
        question: 'How would you like to proceed?',
        options: ['Let\'s Chat', 'Book Consultation'],
        field: 'ufe_path_choice',
      },
      {
        id: 'ufe_symptom_gate',
        question:
          'Are you currently experiencing any of the following symptoms?\n• Heavy or prolonged menstrual bleeding\n• Pelvic pain or pressure / during periods\n• Abdominal bloating or fullness',
        options: ['Yes', 'No'],
        field: 'ufe_symptom_gate',
        condition: { field: 'ufe_path_choice', value: "Let's Chat" },
      },
      {
        id: 'ufe_age_group_gate',
        question: 'May I know your age group?',
        options: ['Above 45 years', 'Below 45 years'],
        field: 'age_group',
        condition: { field: 'ufe_symptom_gate', value: 'Yes' },
      },
      {
        id: 'ufe_atypical_choice',
        question:
          'Thank you for sharing that.\nYour symptoms may not be typical of uterine fibroids and could be related to another condition.\n\nWould you like our care team to guide you further?',
        options: ['Request Call Back', 'Close Request'],
        field: 'ufe_atypical_choice',
        condition: { field: 'age_group', value: 'Below 45 years' },
      },
      {
        id: 'ufe_typical_ack',
        question:
          'Thank you for sharing that.\nThe symptoms you\'re experiencing are commonly seen with Uterine Fibroids.',
        options: ['Continue'],
        field: 'ufe_typical_ack',
        condition: { field: 'age_group', value: 'Above 45 years' },
      },
      {
        id: 'ufe_consulted_doctor',
        question: 'Have you already consulted a doctor for this condition?',
        options: ['Yes', 'No'],
        field: 'ufe_consulted_doctor',
        condition: { field: 'age_group', value: 'Above 45 years' },
      },
      {
        id: 'ufe_surgery_advised',
        question: 'Has any doctor advised surgery (myomectomy or hysterectomy) for your fibroids?',
        options: ['Yes', 'No'],
        field: 'ufe_surgery_advised',
        condition: { field: 'age_group', value: 'Above 45 years' },
      },
      {
        id: 'ufe_reports',
        question: 'Do you have an ultrasound or MRI scan report of your uterus?',
        options: ['Yes, I have', 'No, not yet'],
        field: 'fibroid_tests',
        condition: { field: 'age_group', value: 'Above 45 years' },
      },
      {
        id: 'ufe_specialist_choice',
        question:
          'Not all uterine fibroids require surgery.\n\nMany women choose a non-surgical option called Uterine Fibroid Embolization (UFE/UAE), where fibroids are treated from inside and gradually shrink. It\'s a short day-care procedure with minimal discomfort, faster recovery, and helps preserve the uterus.\n\nWould you like to speak with a specialist to understand which option is suitable for you?',
        options: ['Book consultation', 'Not right now'],
        field: 'ufe_specialist_choice',
        condition: { field: 'age_group', value: 'Above 45 years' },
      },
      {
        id: 'ufe_callback_day',
        question:
          'When would it be convenient for our care team to contact you?\n(Office hours: Monday - Saturday 10.00AM - 6.00PM)',
        options: ['Today', 'Tomorrow'],
        field: 'appointment_timing',
        condition: { field: 'ufe_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'ufe_callback_time',
        question: 'What time usually works best for you?',
        options: ['Morning', 'Afternoon', 'Evening'],
        field: 'ufe_callback_time',
        condition: { field: 'ufe_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'ufe_name_consult',
        question: 'May I know your full name?',
        options: [],
        field: 'name',
        isInput: true,
        placeholder: 'Enter your full name',
        condition: { field: 'ufe_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'ufe_city_consult',
        question: 'Which city are you currently located in?',
        options: [],
        field: 'city',
        isInput: true,
        placeholder: 'Enter your city',
        condition: { field: 'ufe_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'ufe_language_consult',
        question: 'Which language would you be most comfortable speaking in during the consultation?',
        options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
        field: 'preferred_language',
        condition: { field: 'ufe_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'ufe_phone_consult',
        question: 'What is the best number to reach you on for the consultation?',
        options: [],
        field: 'phone',
        isInput: true,
        placeholder: 'Enter your phone number',
        condition: { field: 'ufe_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'ufe_age_group_book',
        question: 'May I know your age group?',
        options: ['Above 45 years', 'Below 45 years'],
        field: 'age_group',
        condition: { field: 'ufe_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'ufe_name_book',
        question: 'May I know your full name?',
        options: [],
        field: 'name',
        isInput: true,
        placeholder: 'Enter your full name',
        condition: { field: 'ufe_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'ufe_city_book',
        question: 'Which city are you currently located in?',
        options: [],
        field: 'city',
        isInput: true,
        placeholder: 'Enter your city',
        condition: { field: 'ufe_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'ufe_language_book',
        question: 'Which language would you be most comfortable speaking in during the consultation?',
        options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
        field: 'preferred_language',
        condition: { field: 'ufe_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'ufe_phone_book',
        question: 'What is the best number to reach you on for the consultation?',
        options: [],
        field: 'phone',
        isInput: true,
        placeholder: 'Enter your phone number',
        condition: { field: 'ufe_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'ufe_callback_day_book',
        question:
          'When would it be convenient for our care team to contact you?\n(Office hours: Monday - Saturday 10.00AM - 6.00PM)',
        options: ['Today', 'Tomorrow'],
        field: 'appointment_timing',
        condition: { field: 'ufe_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'ufe_callback_time_book',
        question: 'What time usually works best for you?',
        options: ['Morning', 'Afternoon', 'Evening'],
        field: 'ufe_callback_time',
        condition: { field: 'ufe_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'ufe_name_callback',
        question: 'May I know your full name?',
        options: [],
        field: 'name',
        isInput: true,
        placeholder: 'Enter your full name',
        condition: { field: 'ufe_atypical_choice', value: 'Request Call Back' },
      },
      {
        id: 'ufe_city_callback',
        question: 'Which city are you currently located in?',
        options: [],
        field: 'city',
        isInput: true,
        placeholder: 'Enter your city',
        condition: { field: 'ufe_atypical_choice', value: 'Request Call Back' },
      },
      {
        id: 'ufe_language_callback',
        question: 'Which language would you be most comfortable speaking in during the consultation?',
        options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
        field: 'preferred_language',
        condition: { field: 'ufe_atypical_choice', value: 'Request Call Back' },
      },
      {
        id: 'ufe_phone_callback',
        question: 'What is the best number to reach you on for the consultation?',
        options: [],
        field: 'phone',
        isInput: true,
        placeholder: 'Enter your phone number',
        condition: { field: 'ufe_atypical_choice', value: 'Request Call Back' },
      },
    ],
  },
  PAE: {
    procedure: 'PAE',
    welcomeMessage: 'Let’s begin a short prostate symptom check.',
    treatmentPage: '/prostate-artery-embolization-pae',
    youtubeVideo: 'https://www.youtube.com/shorts/c5DucffDYec',
    specificQuestions: [
      {
        id: 'pae_diagnosis',
        question: 'Have you been diagnosed of Enlarged Prostate?',
        options: ['Yes', 'No'],
        field: 'enlarged_prostate_diagnosed',
        condition: { field: 'user_intent', value: 'Seeking Treatment' },
      },
      {
        id: 'pae_symptoms',
        question: 'Do you have Frequent urination?',
        options: ['Yes', 'No'],
        field: 'frequent_urination',
        condition: { field: 'user_intent', value: 'Seeking Treatment' },
      },
      {
        id: 'pae_reports',
        question: 'Do you have any of these reports available?',
        options: ['PSA Test', 'USG Pelvic', 'Uroflowmetry', 'No Report'],
        field: 'prostate_tests',
        multiSelect: true,
        condition: { field: 'enlarged_prostate_diagnosed', value: 'Yes' },
      },
    ],
  },
  GAE: {
    procedure: 'GAE',
    useCoreQuestions: false,
    welcomeMessage:
      'Hello 👋\n\nYou\'ve reached out regarding Knee Pain / Osteoarthritis, a condition where the cartilage in the knee joint gradually wears down, causing pain, stiffness, and reduced mobility.',
    treatmentPage: '/genicular-artery-embolization-gae',
    youtubeVideo: 'https://www.youtube.com/shorts/vM5o0rX3lag',
    specificQuestions: [
      {
        id: 'gae_path_choice',
        question: 'How would you like to proceed?',
        options: ['Let\'s Chat', 'Book Consultation'],
        field: 'gae_path_choice',
      },
      {
        id: 'gae_symptom_gate',
        question:
          'Are you currently experiencing any of the following symptoms?\n• Persistent knee pain, especially during movement\n• Stiffness or reduced range of motion\n• Swelling or tenderness around the knee\n• Difficulty walking, climbing stairs, or standing for long',
        options: ['Yes', 'No'],
        field: 'gae_symptom_gate',
        condition: { field: 'gae_path_choice', value: "Let's Chat" },
      },
      {
        id: 'gae_age_group_gate',
        question: 'May I know your age group?',
        options: ['Above 45 years', 'Below 45 years'],
        field: 'age_group',
        condition: { field: 'gae_symptom_gate', value: 'Yes' },
      },
      {
        id: 'gae_atypical_choice',
        question:
          'Thank you for sharing that.\nYour symptoms may not be typical of knee pain / osteoarthritis and could be related to another condition.\n\nWould you like our care team to guide you further?',
        options: ['Request Call Back', 'Close Request'],
        field: 'gae_atypical_choice',
        condition: { field: 'age_group', value: 'Below 45 years' },
      },
      {
        id: 'gae_consulted_doctor',
        question: 'Have you already consulted a doctor for this condition?',
        options: ['Yes', 'No'],
        field: 'gae_consulted_doctor',
        condition: { field: 'age_group', value: 'Above 45 years' },
      },
      {
        id: 'gae_surgery_advised',
        question: 'Has any doctor advised knee replacement surgery for your condition?',
        options: ['Yes', 'No'],
        field: 'gae_surgery_advised',
        condition: { field: 'age_group', value: 'Above 45 years' },
      },
      {
        id: 'gae_reports',
        question: 'Do you have an X-ray or MRI report of your knee?',
        options: ['Yes, I have', 'No, not yet'],
        field: 'knee_reports',
        condition: { field: 'age_group', value: 'Above 45 years' },
      },
      {
        id: 'gae_specialist_choice',
        question:
          'I’d like you to know — not all knee pain / osteoarthritis needs surgery.\nMany patients can be treated with minimally invasive, non-surgical options like Genicular Artery Embolization (GAE), which can help reduce pain and improve mobility.\n\nWould you like to speak with a specialist to understand which option is suitable for you?',
        options: ['Book consultation', 'Not right now'],
        field: 'gae_specialist_choice',
        condition: { field: 'age_group', value: 'Above 45 years' },
      },
      {
        id: 'gae_callback_day',
        question:
          'When would it be convenient for our care team to contact you?\n(Office hours: Monday - Saturday 10.00AM - 6.00PM)',
        options: ['Today', 'Tomorrow'],
        field: 'appointment_timing',
        condition: { field: 'gae_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'gae_callback_time',
        question: 'What time usually works best for you?',
        options: ['Morning', 'Afternoon', 'Evening'],
        field: 'gae_callback_time',
        condition: { field: 'gae_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'gae_name',
        question: 'May I know your full name?',
        options: [],
        field: 'name',
        isInput: true,
        placeholder: 'Enter your full name',
        condition: { field: 'gae_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'gae_city',
        question: 'Which city are you currently located in?',
        options: [],
        field: 'city',
        isInput: true,
        placeholder: 'Enter your city',
        condition: { field: 'gae_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'gae_language',
        question: 'Which language would you be most comfortable speaking in during the consultation?',
        options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
        field: 'preferred_language',
        condition: { field: 'gae_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'gae_phone',
        question: 'What is the best number to reach you on for the consultation?',
        options: [],
        field: 'phone',
        isInput: true,
        placeholder: 'Enter your phone number',
        condition: { field: 'gae_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'gae_age_group_book',
        question: 'May I know your age group?',
        options: ['Above 45 years', 'Below 45 years'],
        field: 'age_group',
        condition: { field: 'gae_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'gae_name_book',
        question: 'May I know your full name?',
        options: [],
        field: 'name',
        isInput: true,
        placeholder: 'Enter your full name',
        condition: { field: 'gae_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'gae_city_book',
        question: 'Which city are you currently located in?',
        options: [],
        field: 'city',
        isInput: true,
        placeholder: 'Enter your city',
        condition: { field: 'gae_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'gae_language_book',
        question: 'Which language would you be most comfortable speaking in during the consultation?',
        options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
        field: 'preferred_language',
        condition: { field: 'gae_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'gae_phone_book',
        question: 'What is the best number to reach you on for the consultation?',
        options: [],
        field: 'phone',
        isInput: true,
        placeholder: 'Enter your phone number',
        condition: { field: 'gae_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'gae_callback_day_book',
        question:
          'When would it be convenient for our care team to contact you?\n(Office hours: Monday - Saturday 10.00AM - 6.00PM)',
        options: ['Today', 'Tomorrow'],
        field: 'appointment_timing',
        condition: { field: 'gae_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'gae_callback_time_book',
        question: 'What time usually works best for you?',
        options: ['Morning', 'Afternoon', 'Evening'],
        field: 'gae_callback_time',
        condition: { field: 'gae_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'gae_name_callback',
        question: 'May I know your full name?',
        options: [],
        field: 'name',
        isInput: true,
        placeholder: 'Enter your full name',
        condition: { field: 'gae_atypical_choice', value: 'Request Call Back' },
      },
      {
        id: 'gae_city_callback',
        question: 'Which city are you currently located in?',
        options: [],
        field: 'city',
        isInput: true,
        placeholder: 'Enter your city',
        condition: { field: 'gae_atypical_choice', value: 'Request Call Back' },
      },
      {
        id: 'gae_language_callback',
        question: 'Which language would you be most comfortable speaking in during the consultation?',
        options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
        field: 'preferred_language',
        condition: { field: 'gae_atypical_choice', value: 'Request Call Back' },
      },
      {
        id: 'gae_phone_callback',
        question: 'What is the best number to reach you on for the consultation?',
        options: [],
        field: 'phone',
        isInput: true,
        placeholder: 'Enter your phone number',
        condition: { field: 'gae_atypical_choice', value: 'Request Call Back' },
      },
    ],
  },
  TNA: {
    procedure: 'TNA',
    useCoreQuestions: false,
    welcomeMessage:
      'Hello 👋\n\nYou\'ve reached out regarding Thyroid Nodules (thyroid lumps).',
    treatmentPage: '/thyroid-nodule-ablation',
    youtubeVideo: 'https://www.youtube.com/shorts/HqoeDQTqAXc',
    specificQuestions: [
      {
        id: 'tna_path_choice',
        question: 'How would you like to proceed?',
        options: ['Let\'s Chat', 'Book Consultation'],
        field: 'tna_path_choice',
      },
      {
        id: 'tna_symptom_gate',
        question:
          'Are you currently experiencing any of the following symptoms?\n• Neck swelling / neck lump\n• Difficulty swallowing\n• Voice changes / hoarseness\n• Neck discomfort',
        options: ['Yes', 'No'],
        field: 'tna_symptom_gate',
        condition: { field: 'tna_path_choice', value: "Let's Chat" },
      },
      {
        id: 'tna_atypical_choice',
        question:
          'Thank you for sharing that.\nYour symptoms may not be typical of thyroid nodules and could be related to another condition.\n\nWould you like our care team to guide you further?',
        options: ['Request Call Back', 'Close Request'],
        field: 'tna_atypical_choice',
        condition: { field: 'tna_symptom_gate', value: 'No' },
      },
      {
        id: 'tna_swollen_neck',
        question: 'Do you have a visible neck swelling / lump?',
        options: ['Yes', 'No'],
        field: 'swollen_neck',
        condition: { field: 'tna_symptom_gate', value: 'Yes' },
      },
      {
        id: 'tna_diagnosis',
        question: 'Have you been diagnosed with a thyroid nodule?',
        options: ['Yes', 'No'],
        field: 'thyroid_nodule_diagnosed',
        condition: { field: 'tna_symptom_gate', value: 'Yes' },
      },
      {
        id: 'tna_reports',
        question: 'Do you have any of these reports available?',
        options: ['USG Neck', 'FNAC', 'No Report'],
        field: 'thyroid_reports',
        multiSelect: true,
        condition: { field: 'tna_symptom_gate', value: 'Yes' },
      },
      {
        id: 'tna_specialist_choice',
        question:
          'I’d like you to know — not all thyroid nodules need surgery.\nMany patients can be treated with minimally invasive, non-surgical options like Thyroid Nodule Ablation.\n\nWould you like to speak with a specialist to understand which option is suitable for you?',
        options: ['Book consultation', 'Not right now'],
        field: 'tna_specialist_choice',
        condition: { field: 'tna_symptom_gate', value: 'Yes' },
      },
      {
        id: 'tna_callback_day',
        question:
          'When would it be convenient for our care team to contact you?\n(Office hours: Monday - Saturday 10.00AM - 6.00PM)',
        options: ['Today', 'Tomorrow'],
        field: 'appointment_timing',
        condition: { field: 'tna_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'tna_callback_time',
        question: 'What time usually works best for you?',
        options: ['Morning', 'Afternoon', 'Evening'],
        field: 'tna_callback_time',
        condition: { field: 'tna_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'tna_age_consult',
        question: 'May I know your age?',
        options: [],
        field: 'age_group',
        isInput: true,
        placeholder: 'Enter your age',
        condition: { field: 'tna_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'tna_name_consult',
        question: 'May I know your full name?',
        options: [],
        field: 'name',
        isInput: true,
        placeholder: 'Enter your full name',
        condition: { field: 'tna_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'tna_city_consult',
        question: 'Which city are you currently located in?',
        options: [],
        field: 'city',
        isInput: true,
        placeholder: 'Enter your city',
        condition: { field: 'tna_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'tna_language_consult',
        question: 'Which language would you be most comfortable speaking in during the consultation?',
        options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
        field: 'preferred_language',
        condition: { field: 'tna_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'tna_phone_consult',
        question: 'What is the best number to reach you on for the consultation?',
        options: [],
        field: 'phone',
        isInput: true,
        placeholder: 'Enter your phone number',
        condition: { field: 'tna_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'tna_age_book',
        question: 'May I know your age?',
        options: [],
        field: 'age_group',
        isInput: true,
        placeholder: 'Enter your age',
        condition: { field: 'tna_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'tna_name_book',
        question: 'May I know your full name?',
        options: [],
        field: 'name',
        isInput: true,
        placeholder: 'Enter your full name',
        condition: { field: 'tna_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'tna_city_book',
        question: 'Which city are you currently located in?',
        options: [],
        field: 'city',
        isInput: true,
        placeholder: 'Enter your city',
        condition: { field: 'tna_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'tna_language_book',
        question: 'Which language would you be most comfortable speaking in during the consultation?',
        options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
        field: 'preferred_language',
        condition: { field: 'tna_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'tna_phone_book',
        question: 'What is the best number to reach you on for the consultation?',
        options: [],
        field: 'phone',
        isInput: true,
        placeholder: 'Enter your phone number',
        condition: { field: 'tna_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'tna_callback_day_book',
        question:
          'When would it be convenient for our care team to contact you?\n(Office hours: Monday - Saturday 10.00AM - 6.00PM)',
        options: ['Today', 'Tomorrow'],
        field: 'appointment_timing',
        condition: { field: 'tna_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'tna_callback_time_book',
        question: 'What time usually works best for you?',
        options: ['Morning', 'Afternoon', 'Evening'],
        field: 'tna_callback_time',
        condition: { field: 'tna_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'tna_age_callback',
        question: 'May I know your age?',
        options: [],
        field: 'age_group',
        isInput: true,
        placeholder: 'Enter your age',
        condition: { field: 'tna_atypical_choice', value: 'Request Call Back' },
      },
      {
        id: 'tna_name_callback',
        question: 'May I know your full name?',
        options: [],
        field: 'name',
        isInput: true,
        placeholder: 'Enter your full name',
        condition: { field: 'tna_atypical_choice', value: 'Request Call Back' },
      },
      {
        id: 'tna_city_callback',
        question: 'Which city are you currently located in?',
        options: [],
        field: 'city',
        isInput: true,
        placeholder: 'Enter your city',
        condition: { field: 'tna_atypical_choice', value: 'Request Call Back' },
      },
      {
        id: 'tna_language_callback',
        question: 'Which language would you be most comfortable speaking in during the consultation?',
        options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
        field: 'preferred_language',
        condition: { field: 'tna_atypical_choice', value: 'Request Call Back' },
      },
      {
        id: 'tna_phone_callback',
        question: 'What is the best number to reach you on for the consultation?',
        options: [],
        field: 'phone',
        isInput: true,
        placeholder: 'Enter your phone number',
        condition: { field: 'tna_atypical_choice', value: 'Request Call Back' },
      },
    ],
  },
  VAE: {
    procedure: 'VAE',
    useCoreQuestions: false,
    welcomeMessage:
      'Hello 👋\n\nYou\'ve reached out regarding Breast Nodules, which are lumps or masses in the breast tissue.\nMost breast nodules are benign (non-cancerous), but they may cause discomfort, cosmetic concerns, or anxiety.',
    treatmentPage: '/breast-nodule-vae',
    youtubeVideo: null,
    specificQuestions: [
      {
        id: 'vae_path_choice',
        question: 'How would you like to proceed?',
        options: ['Let\'s Chat', 'Book Consultation'],
        field: 'vae_path_choice',
      },
      {
        id: 'vae_symptom_gate',
        question:
          'Are you currently experiencing any of the following symptoms?\n• Palpable lump or mass in the breast\n• Breast discomfort or tenderness\n• Cosmetic concerns or asymmetry\n• Anxiety about the lump',
        options: ['Yes', 'No'],
        field: 'vae_symptom_gate',
        condition: { field: 'vae_path_choice', value: "Let's Chat" },
      },
      {
        id: 'vae_atypical_choice',
        question:
          'Thank you for sharing that.\nYour symptoms may not be typical of breast nodules and could be related to another condition.\n\nWould you like our care team to guide you further?',
        options: ['Request Call Back', 'Close Request'],
        field: 'vae_atypical_choice',
        condition: { field: 'vae_symptom_gate', value: 'No' },
      },
      {
        id: 'vae_typical_ack',
        question:
          'Thank you for sharing that.\nThe symptoms you\'re experiencing are commonly seen with Breast Nodules.',
        options: ['Continue'],
        field: 'vae_typical_ack',
        condition: { field: 'vae_symptom_gate', value: 'Yes' },
      },
      {
        id: 'vae_consulted_doctor',
        question: 'Have you already consulted a doctor for this condition?',
        options: ['Yes', 'No'],
        field: 'vae_consulted_doctor',
        condition: { field: 'vae_symptom_gate', value: 'Yes' },
      },
      {
        id: 'vae_surgery_advised',
        question: 'Has any doctor advised surgical removal of the breast nodule?',
        options: ['Yes', 'No'],
        field: 'vae_surgery_advised',
        condition: { field: 'vae_symptom_gate', value: 'Yes' },
      },
      {
        id: 'vae_reports',
        question: 'Do you have a mammogram, ultrasound, or biopsy report?',
        options: ['Yes, I have', 'No, not yet'],
        field: 'breast_reports',
        condition: { field: 'vae_symptom_gate', value: 'Yes' },
      },
      {
        id: 'vae_specialist_choice',
        question:
          'Not all breast nodules require open surgery.\n\nMany patients can be treated with minimally invasive options like Vacuum-Assisted Excision, Cryoablation, or Radiofrequency Ablation — performed under imaging guidance. These are day-care procedures with minimal scarring, less discomfort, and faster recovery.\n\nWould you like to speak with a specialist to understand which option is suitable for you?',
        options: ['Book consultation', 'Not right now'],
        field: 'vae_specialist_choice',
        condition: { field: 'vae_symptom_gate', value: 'Yes' },
      },
      {
        id: 'vae_callback_day',
        question:
          'When would it be convenient for our care team to contact you?\n(Office hours: Monday - Saturday 10.00AM - 6.00PM)',
        options: ['Today', 'Tomorrow'],
        field: 'appointment_timing',
        condition: { field: 'vae_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'vae_callback_time',
        question: 'What time usually works best for you?',
        options: ['Morning', 'Afternoon', 'Evening'],
        field: 'vae_callback_time',
        condition: { field: 'vae_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'vae_name',
        question: 'May I know your full name?',
        options: [],
        field: 'name',
        isInput: true,
        placeholder: 'Enter your full name',
        condition: { field: 'vae_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'vae_city',
        question: 'Which city are you currently located in?',
        options: [],
        field: 'city',
        isInput: true,
        placeholder: 'Enter your city',
        condition: { field: 'vae_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'vae_language',
        question: 'Which language would you be most comfortable speaking in during the consultation?',
        options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
        field: 'preferred_language',
        condition: { field: 'vae_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'vae_phone',
        question: 'What is the best number to reach you on for the consultation?',
        options: [],
        field: 'phone',
        isInput: true,
        placeholder: 'Enter your phone number',
        condition: { field: 'vae_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'vae_name_book',
        question: 'May I know your full name?',
        options: [],
        field: 'name',
        isInput: true,
        placeholder: 'Enter your full name',
        condition: { field: 'vae_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'vae_city_book',
        question: 'Which city are you currently located in?',
        options: [],
        field: 'city',
        isInput: true,
        placeholder: 'Enter your city',
        condition: { field: 'vae_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'vae_language_book',
        question: 'Which language would you be most comfortable speaking in during the consultation?',
        options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
        field: 'preferred_language',
        condition: { field: 'vae_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'vae_phone_book',
        question: 'What is the best number to reach you on for the consultation?',
        options: [],
        field: 'phone',
        isInput: true,
        placeholder: 'Enter your phone number',
        condition: { field: 'vae_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'vae_callback_day_book',
        question:
          'When would it be convenient for our care team to contact you?\n(Office hours: Monday - Saturday 10.00AM - 6.00PM)',
        options: ['Today', 'Tomorrow'],
        field: 'appointment_timing',
        condition: { field: 'vae_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'vae_callback_time_book',
        question: 'What time usually works best for you?',
        options: ['Morning', 'Afternoon', 'Evening'],
        field: 'vae_callback_time',
        condition: { field: 'vae_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'vae_name_callback',
        question: 'May I know your full name?',
        options: [],
        field: 'name',
        isInput: true,
        placeholder: 'Enter your full name',
        condition: { field: 'vae_atypical_choice', value: 'Request Call Back' },
      },
      {
        id: 'vae_city_callback',
        question: 'Which city are you currently located in?',
        options: [],
        field: 'city',
        isInput: true,
        placeholder: 'Enter your city',
        condition: { field: 'vae_atypical_choice', value: 'Request Call Back' },
      },
      {
        id: 'vae_language_callback',
        question: 'Which language would you be most comfortable speaking in during the consultation?',
        options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
        field: 'preferred_language',
        condition: { field: 'vae_atypical_choice', value: 'Request Call Back' },
      },
      {
        id: 'vae_phone_callback',
        question: 'What is the best number to reach you on for the consultation?',
        options: [],
        field: 'phone',
        isInput: true,
        placeholder: 'Enter your phone number',
        condition: { field: 'vae_atypical_choice', value: 'Request Call Back' },
      },
    ],
  },
  VV: {
    procedure: 'VV',
    useCoreQuestions: false,
    welcomeMessage: 'To understand your situation better, I’ll ask a few simple questions.',
    treatmentPage: '/varicose-vein',
    youtubeVideo: 'https://www.youtube.com/shorts/vyanUzoXLg0',
    specificQuestions: [
      {
        id: 'vv_path_choice',
        question: 'What would you like to do?',
        options: ['Let\'s Chat', 'Book Consultation'],
        field: 'vv_path_choice',
      },
      {
        id: 'vv_symptom_gate',
        question:
          'Are you currently experiencing any of the following symptoms?\n• Leg pain / swelling\n• Visible or bulging veins\n• Itching or skin discoloration around veins\n• Discomfort after standing for long hours',
        options: ['Yes', 'No'],
        field: 'vv_symptom_gate',
        condition: { field: 'vv_path_choice', value: "Let's Chat" },
      },
      {
        id: 'vv_atypical_choice',
        question:
          'Thank you for sharing that.\nYour symptoms may not be typical of varicose veins and could be related to another condition.\nTo understand better and guide you correctly, please choose one option below.',
        options: ['Request Call Back', 'Close Request'],
        field: 'vv_atypical_choice',
        condition: { field: 'vv_symptom_gate', value: 'No' },
      },
      {
        id: 'vv_consulted_doctor',
        question: 'Have you already consulted a doctor for this condition?',
        options: ['Yes', 'No'],
        field: 'vv_consulted_doctor',
        condition: { field: 'vv_symptom_gate', value: 'Yes' },
      },
      {
        id: 'vv_surgery_advised',
        question: 'Has any doctor advised surgery for your varicose veins?',
        options: ['Yes', 'No'],
        field: 'vv_surgery_advised',
        condition: { field: 'vv_symptom_gate', value: 'Yes' },
      },
      {
        id: 'vv_doppler_report',
        question: 'Do you have a Doppler scan report of your leg veins?',
        options: ['Yes, I have the report', 'No, not yet'],
        field: 'varicose_vein_reports',
        condition: { field: 'vv_symptom_gate', value: 'Yes' },
      },
      {
        id: 'vv_consult_specialist',
        question:
          'I’d like you to know —\nNot all varicose veins need surgery. Many patients can be treated with minimally invasive, non-surgical options like Radiofrequency/Laser therapy.\n\nTo understand which option may be suitable for you, would you like to speak with a specialist?',
        options: ['Yes, arrange a consultation', 'Not right now'],
        field: 'vv_consult_specialist',
        condition: { field: 'vv_symptom_gate', value: 'Yes' },
      },
      {
        id: 'vv_callback_day',
        question:
          'When would it be convenient for our care team to contact you?\n(Office hours: Monday - Saturday 10.00AM - 6.00PM)',
        options: ['Today', 'Tomorrow'],
        field: 'appointment_timing',
        condition: { field: 'vv_consult_specialist', value: 'Yes, arrange a consultation' },
      },
      {
        id: 'vv_callback_time',
        question: 'What time usually works best for you?',
        options: ['Morning', 'Afternoon', 'Evening'],
        field: 'vv_callback_time',
        condition: { field: 'vv_consult_specialist', value: 'Yes, arrange a consultation' },
      },
      {
        id: 'vv_age_group_consult',
        question: 'May I know your age?',
        options: [],
        field: 'age_group',
        isInput: true,
        placeholder: 'Enter your age',
        condition: { field: 'vv_consult_specialist', value: 'Yes, arrange a consultation' },
      },
      {
        id: 'vv_name_consult',
        question: 'May I know your full name?',
        options: [],
        field: 'name',
        isInput: true,
        placeholder: 'Enter your full name',
        condition: { field: 'vv_consult_specialist', value: 'Yes, arrange a consultation' },
      },
      {
        id: 'vv_city_consult',
        question: 'Which city are you currently located in?',
        options: [],
        field: 'city',
        isInput: true,
        placeholder: 'Enter your city',
        condition: { field: 'vv_consult_specialist', value: 'Yes, arrange a consultation' },
      },
      {
        id: 'vv_language_consult',
        question: 'Which language would you be most comfortable speaking in during the consultation?',
        options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
        field: 'preferred_language',
        condition: { field: 'vv_consult_specialist', value: 'Yes, arrange a consultation' },
      },
      {
        id: 'vv_phone_consult',
        question: 'What is the best number to reach you on for the consultation?',
        options: [],
        field: 'phone',
        isInput: true,
        placeholder: 'Enter your phone number',
        condition: { field: 'vv_consult_specialist', value: 'Yes, arrange a consultation' },
      },
      {
        id: 'vv_age_group',
        question: 'May I know your age?',
        options: [],
        field: 'age_group',
        isInput: true,
        placeholder: 'Enter your age',
        condition: { field: 'vv_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'vv_name',
        question: 'May I know your full name?',
        options: [],
        field: 'name',
        isInput: true,
        placeholder: 'Enter your full name',
        condition: { field: 'vv_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'vv_city',
        question: 'Which city are you currently located in?',
        options: [],
        field: 'city',
        isInput: true,
        placeholder: 'Enter your city',
        condition: { field: 'vv_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'vv_language',
        question: 'Which language would you be most comfortable speaking in during the consultation?',
        options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
        field: 'preferred_language',
        condition: { field: 'vv_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'vv_phone',
        question: 'What is the best number to reach you on for the consultation?',
        options: [],
        field: 'phone',
        isInput: true,
        placeholder: 'Enter your phone number',
        condition: { field: 'vv_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'vv_callback_day_book',
        question:
          'When would it be convenient for our care team to contact you?\n(Office hours: Monday - Saturday 10.00AM - 6.00PM)',
        options: ['Today', 'Tomorrow'],
        field: 'appointment_timing',
        condition: { field: 'vv_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'vv_callback_time_book',
        question: 'What time usually works best for you?',
        options: ['Morning', 'Afternoon', 'Evening'],
        field: 'vv_callback_time',
        condition: { field: 'vv_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'vv_age_group_callback',
        question: 'May I know your age?',
        options: [],
        field: 'age_group',
        isInput: true,
        placeholder: 'Enter your age',
        condition: { field: 'vv_atypical_choice', value: 'Request Call Back' },
      },
      {
        id: 'vv_name_callback',
        question: 'May I know your full name?',
        options: [],
        field: 'name',
        isInput: true,
        placeholder: 'Enter your full name',
        condition: { field: 'vv_atypical_choice', value: 'Request Call Back' },
      },
      {
        id: 'vv_city_callback',
        question: 'Which city are you currently located in?',
        options: [],
        field: 'city',
        isInput: true,
        placeholder: 'Enter your city',
        condition: { field: 'vv_atypical_choice', value: 'Request Call Back' },
      },
      {
        id: 'vv_language_callback',
        question: 'Which language would you be most comfortable speaking in during the consultation?',
        options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
        field: 'preferred_language',
        condition: { field: 'vv_atypical_choice', value: 'Request Call Back' },
      },
      {
        id: 'vv_phone_callback',
        question: 'What is the best number to reach you on for the consultation?',
        options: [],
        field: 'phone',
        isInput: true,
        placeholder: 'Enter your phone number',
        condition: { field: 'vv_atypical_choice', value: 'Request Call Back' },
      },
    ],
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
        condition: { field: 'user_intent', value: 'Seeking Treatment' },
      },
      {
        id: 'vce_diagnosis',
        question: 'Have you been diagnosed of Varicocele?',
        options: ['Yes', 'No'],
        field: 'varicocele_diagnosed',
        condition: { field: 'user_intent', value: 'Seeking Treatment' },
      },
      {
        id: 'vce_reports',
        question: 'Do you have any of these reports available?',
        options: ['Doppler Scan', 'No Report'],
        field: 'varicocele_reports',
        condition: { field: 'varicocele_diagnosed', value: 'Yes' },
      },
      {
        id: 'vce_appointment',
        question: 'Can we fix up an appointment for you?',
        options: ['Yes', 'No'],
        field: 'fix_appointment_vce',
        condition: { field: 'non_surgical_preference', value: 'Yes' },
      },
    ],
  },
  FTR: {
    procedure: 'FTR',
    useCoreQuestions: false,
    welcomeMessage:
      'Hello 👋\n\nYou\'ve reached out regarding Fallopian Tube Block, where one or both fallopian tubes are blocked, which may prevent the egg and sperm from meeting and can affect fertility.',
    treatmentPage: '/fallopian-tube-recanalization-ftr',
    youtubeVideo: 'https://www.youtube.com/shorts/FstX8x8hkOE',
    specificQuestions: [
      {
        id: 'ftr_path_choice',
        question: 'How would you like to proceed?',
        options: ['Let\'s Chat', 'Book Consultation'],
        field: 'ftr_path_choice',
      },
      {
        id: 'ftr_symptom_gate',
        question:
          'Are you currently experiencing any of the following symptoms?\n• Difficulty conceiving despite trying\n• History of pelvic infection or surgery\n• Diagnosed tube block via HSG or laparoscopy',
        options: ['Yes', 'No'],
        field: 'ftr_symptom_gate',
        condition: { field: 'ftr_path_choice', value: "Let's Chat" },
      },
      {
        id: 'ftr_consulted_doctor',
        question: 'Have you already consulted a doctor for this condition?',
        options: ['Yes', 'No'],
        field: 'ftr_consulted_doctor',
        condition: { field: 'ftr_symptom_gate', value: 'Yes' },
      },
      {
        id: 'ftr_ivf_surgery_advised',
        question: 'Has any doctor advised IVF or laparoscopic surgery for your blocked tubes?',
        options: ['Yes', 'No'],
        field: 'ftr_ivf_surgery_advised',
        condition: { field: 'ftr_symptom_gate', value: 'Yes' },
      },
      {
        id: 'ftr_hsg_report',
        question: 'Do you have an HSG (Hysterosalpingography) report or any fertility test reports?',
        options: ['Yes, I have', 'No, not yet'],
        field: 'hsg_report_available',
        condition: { field: 'ftr_symptom_gate', value: 'Yes' },
      },
      {
        id: 'ftr_specialist_choice',
        question:
          'Not all fallopian tube blocks require surgery or IVF. Many women can be treated with Fallopian Tube Recanalization (FTR) — a minimally invasive, non-surgical procedure performed under imaging guidance.\nIt\'s a short outpatient procedure with minimal discomfort and faster recovery.\n\nWould you like to speak with a specialist to understand which option is suitable for you?',
        options: ['Book consultation', 'Not right now'],
        field: 'ftr_specialist_choice',
        condition: { field: 'ftr_symptom_gate', value: 'Yes' },
      },
      {
        id: 'ftr_callback_day',
        question:
          'When would it be convenient for our care team to contact you?\n(Office hours: Monday - Saturday 10.00AM - 6.00PM)',
        options: ['Today', 'Tomorrow'],
        field: 'appointment_timing',
        condition: { field: 'ftr_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'ftr_callback_time',
        question: 'What time usually works best for you?',
        options: ['Morning', 'Afternoon', 'Evening'],
        field: 'ftr_callback_time',
        condition: { field: 'ftr_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'ftr_age',
        question: 'May I know your age?',
        options: [],
        field: 'age_group',
        isInput: true,
        placeholder: 'Enter your age',
        condition: { field: 'ftr_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'ftr_name',
        question: 'May I know your full name?',
        options: [],
        field: 'name',
        isInput: true,
        placeholder: 'Enter your full name',
        condition: { field: 'ftr_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'ftr_city',
        question: 'Which city are you currently located in?',
        options: [],
        field: 'city',
        isInput: true,
        placeholder: 'Enter your city',
        condition: { field: 'ftr_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'ftr_language',
        question: 'Which language would you be most comfortable speaking in during the consultation?',
        options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
        field: 'preferred_language',
        condition: { field: 'ftr_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'ftr_phone',
        question: 'What is the best number to reach you on for the consultation?',
        options: [],
        field: 'phone',
        isInput: true,
        placeholder: 'Enter your phone number',
        condition: { field: 'ftr_specialist_choice', value: 'Book consultation' },
      },
      {
        id: 'ftr_callback_day_book',
        question:
          'When would it be convenient for our care team to contact you?\n(Office hours: Monday - Saturday 10.00AM - 6.00PM)',
        options: ['Today', 'Tomorrow'],
        field: 'appointment_timing',
        condition: { field: 'ftr_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'ftr_callback_time_book',
        question: 'What time usually works best for you?',
        options: ['Morning', 'Afternoon', 'Evening'],
        field: 'ftr_callback_time',
        condition: { field: 'ftr_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'ftr_age_book',
        question: 'May I know your age?',
        options: [],
        field: 'age_group',
        isInput: true,
        placeholder: 'Enter your age',
        condition: { field: 'ftr_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'ftr_name_book',
        question: 'May I know your full name?',
        options: [],
        field: 'name',
        isInput: true,
        placeholder: 'Enter your full name',
        condition: { field: 'ftr_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'ftr_city_book',
        question: 'Which city are you currently located in?',
        options: [],
        field: 'city',
        isInput: true,
        placeholder: 'Enter your city',
        condition: { field: 'ftr_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'ftr_language_book',
        question: 'Which language would you be most comfortable speaking in during the consultation?',
        options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
        field: 'preferred_language',
        condition: { field: 'ftr_path_choice', value: 'Book Consultation' },
      },
      {
        id: 'ftr_phone_book',
        question: 'What is the best number to reach you on for the consultation?',
        options: [],
        field: 'phone',
        isInput: true,
        placeholder: 'Enter your phone number',
        condition: { field: 'ftr_path_choice', value: 'Book Consultation' },
      },
    ],
  },
};

// Function to get the full questionnaire for a procedure
const getQuestionnaire = (procedure) => {
  const procedureData = questionnaires[procedure];
  if (!procedureData) return null;

  // Allow certain procedures to fully override the core question set
  if (procedureData.useCoreQuestions === false) {
    return {
      ...procedureData,
      questions: [...(procedureData.specificQuestions || [])],
    };
  }

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
    const conditionOriginIndex = combinedQuestions.findIndex(q => q.field === (sq.condition && sq.condition.field));
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
    questions: combinedQuestions,
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

      const actualRaw = responses ? responses[conditionField] : undefined;
      const actual =
        typeof actualRaw === 'string'
          ? actualRaw.trim()
          : actualRaw == null
              ? actualRaw
              : String(actualRaw).trim();
      const expected =
        typeof conditionValue === 'string' ? conditionValue.trim() : String(conditionValue).trim();

      // Skip question if condition is not met
      if (actual !== expected) {
        continue;
      }
    }

    return { question, index: i };
  }

  return null; // No more questions
};

// Enhanced symptom detection function powered by treatment_keywords.json
const detectProcedureFromSymptoms = (input) => {
  try {
    const raw = (input || '').toString();
    const lower = raw.toLowerCase();

    // Explicit VV triggers to avoid missed matches from keyword files
    // Handles: "vv", "varicose vein(s)", and common misspelling "varicoce vein(s)"
    if (
      /\bvv\b/i.test(lower) ||
      lower.includes('varicose vein') ||
      lower.includes('varicose veins') ||
      lower.includes('varicoce vein') ||
      lower.includes('varicoce veins')
    ) {
      return {
        procedure: 'VV',
        displayName: 'Varicose Veins',
        route: '/varicose-vein',
      };
    }

    const tryMap = (res) => {
      if (!res) return null;
      // Fallback: derive procedure code from known routes if not mapped by name
      const routeToProcedure = {
        '/pae': 'PAE',
        '/gae': 'GAE',
        '/prostate-artery-embolization-pae': 'PAE',
        '/genicular-artery-embolization-gae': 'GAE',
        '/fallopian-tube-recanalization-ftr': 'FTR',
        '/uterine-artery-embolization-uae': 'UFE',
        '/thyroid-nodule-ablation': 'TNA',
        '/thyroid': 'TNA',
        '/varicose-vein': 'VV',
        '/varicocele-embolization': 'VCE',
        '/fte': 'FTR',
        '/uae': 'UFE',
        '/plantar-fascial-embolization': 'PFE',
        '/pfe': 'PFE',
        '/breast-nodule-vae': 'VAE',
      };
      const inferred = res.procedureCode || routeToProcedure[res.path] || null;
      return {
        procedure: inferred,
        displayName: res.displayName || res.name,
        route: res.path,
      };
    };

    // First attempt exact detection
    const exact = detectTreatment(raw);
    if (exact) {
      console.log('Detected treatment from keywords (exact):', exact);
      return tryMap(exact);
    }

    // Fallback to fuzzy gate (question-start only)
    const fuzzy = detectTreatmentFuzzyGate(raw);
    if (fuzzy) {
      console.log('Detected treatment from keywords (fuzzy gate):', fuzzy);
      return tryMap(fuzzy);
    }
  } catch (e) {
    console.warn('Keyword detection failed, falling back to null', e);
  }
  console.log('No procedure detected for input:', input);
  return null;
};

// Get procedure information for user
const getProcedureInfo = (procedure) => {
  const procedureInfoMap = {
    UFE: {
      message: 'You\'ve reached out regarding Uterine Fibroids, which are growths that develop in or around the uterus and may cause heavy periods, pain, bloating, or pressure symptoms.',
    },
    PAE: {
      message: 'Thanks for sharing that.\nBased on what you’ve mentioned, it looks like you may be looking for help related to Enlarged Prostate.',
    },
    GAE: {
      message: 'You\'ve reached out regarding Knee Pain / Osteoarthritis, a condition where the cartilage in the knee joint gradually wears down, causing pain, stiffness, and reduced mobility.',
    },
    TNA: {
      message: 'Thanks for sharing that.\nBased on what you’ve mentioned, it looks like you may be looking for help related to Thyroid Nodules.',
    },
    VAE: {
      message: 'You\'ve reached out regarding Breast Nodules, which are lumps or masses in the breast tissue. Most breast nodules are benign (non-cancerous).',
    },
    VV: {
      message: 'You’ve reached out regarding Varicose Veins, which are enlarged, twisted, blue or purple veins usually appearing in the legs due to damaged, one-way valves that allow blood to pool.',
    },
    VCE: {
      message: 'Thanks for sharing that.\nBased on what you’ve mentioned, it looks like you may be looking for help related to Varicocele.',
    },
    FTR: {
      message: 'You’ve reached out regarding Fallopian Tube Block, where one or both fallopian tubes are blocked, which may prevent the egg and sperm from meeting and can affect fertility.',
    },
  };


  return procedureInfoMap[procedure] || { message: 'Let me help you with your medical concern.' };
};

// Quick response buttons for AI-powered interactions
const quickResponses = [
  'Book a consultation',
  'What treatments do you offer?',
 // 'I have knee pain, can you help?',
  'Tell me about non-surgical options',
 // 'Insurance & billing questions'
];

const Chatbot = () => {
  const navigate = useNavigate();
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
    procedure: '',
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

  // --- Persistence: Load state on mount ---
  useEffect(() => {
    try {
      // Helpers to normalize persisted data safely across environments
      const normalizeTimestamp = (ts) => {
        if (!ts) return new Date().toISOString();
        if (ts instanceof Date) return ts.toISOString();
        const d = new Date(ts);
        return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
      };
      const reviveMessages = (arr) => {
        if (!Array.isArray(arr) || arr.length === 0) return arr;
        return arr.map((m) => ({
          ...m,
          // store as ISO; rendering uses formatTime() that accepts both Date or string
          timestamp: normalizeTimestamp(m.timestamp),
        }));
      };

      const raw = localStorage.getItem('medagg_chatbot_state');
      if (raw) {
        const saved = JSON.parse(raw);
        // Messages are intentionally not loaded to reset chat on refresh
        if (typeof saved.isOpen === 'boolean') setIsOpen(saved.isOpen);
        if (typeof saved.inputValue === 'string') setInputValue(saved.inputValue);
        // Other states can be persisted if needed, but messages/history are reset.
      }
    } catch (e) {
      console.warn('Failed to load chatbot state', e);
    }
  }, []);

  // --- Persistence: Save key state whenever it changes ---
  useEffect(() => {
    try {
      const messagesForSave = Array.isArray(messages)
        ? messages.map((m) => ({
            ...m,
            timestamp:
              m && typeof m.timestamp === 'string'
                ? m.timestamp
                : new Date(m.timestamp || Date.now()).toISOString(),
          }))
        : messages;

      const stateToSave = {
        isOpen,
        messages: messagesForSave,
        inputValue,
        medicalContext,
        conversationHistory,
        isQuestionnaireActive,
        questionnaireStep,
        questionnaireResponses,
        currentQuestionnaire,
        isBookingFlow,
        bookingStep,
        bookingData,
      };
      localStorage.setItem('medagg_chatbot_state', JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Failed to save chatbot state', e);
    }
  }, [
    isOpen,
    messages,
    inputValue,
    medicalContext,
    conversationHistory,
    isQuestionnaireActive,
    questionnaireStep,
    questionnaireResponses,
    currentQuestionnaire,
    isBookingFlow,
    bookingStep,
    bookingData,
  ]);

  // When user chooses to view treatment, close chatbot and navigate
  const handleViewTreatment = useCallback((path) => {
    const target = path || '/treatments';
    try {
      setIsOpen(false); // always close the chatbot before navigating
    } catch (_) {}
    navigate(target);
  }, [navigate]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Safely format timestamps that may be Date objects or ISO strings from localStorage
  const formatTime = useCallback((ts) => {
    try {
      const d = ts instanceof Date ? ts : new Date(ts);
      if (Number.isNaN(d.getTime())) return '';
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (_) {
      return '';
    }
  }, []);

  // Emergency detection function
  const detectEmergency = useCallback((userInput) => {
    const lowercaseInput = userInput.toLowerCase();
    return EMERGENCY_KEYWORDS.some(keyword => lowercaseInput.includes(keyword));
  }, []);

  // Emergency response function
  const getEmergencyResponse = useCallback(() => {
    return {
      text: '🚨 This sounds like a medical emergency. Please call emergency services immediately (108 in India or your local emergency number) or go to the nearest emergency room. If you\'re experiencing chest pain, difficulty breathing, or any life-threatening symptoms, seek immediate medical attention. I\'m here to help with non-emergency medical questions after you\'ve received proper emergency care.',
      isEmergency: true,
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
        { role: 'user', content: userInput },
      ];

      const requestPayload = {
        model: 'llama-3.1-8b-instant',
        messages: messages,
        max_tokens: 150,
        temperature: 0.3,
      };

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        text: data.choices[0].message.content,
        usage: data.usage,
      };
    } catch (error) {
      console.error('API Error:', error);
      // Fallback to helpful guidance (no apologies)
      return {
        text: 'I understand your query. To make sure you get the most accurate and relevant guidance, our care team is available to assist you directly. Connect with our care team at +91 93636 56010 or +91 89259 28840 for clear, step-by-step guidance on how to proceed.',
        error: true,
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

    console.log('[Questionnaire] Starting for procedure:', procedure, questionnaire);
    setIsQuestionnaireActive(true);
    setQuestionnaireStep(0);
    setQuestionnaireResponses({ procedure });
    setCurrentQuestionnaire(questionnaire);

    if (questionnaire.welcomeMessage) {
      const welcome = {
        text: questionnaire.welcomeMessage,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, welcome]);
    }

    // Ask first question after a short delay
    setTimeout(() => {
      if (!questionnaire || !questionnaire.questions || !questionnaire.questions.length) {
        console.warn('[Questionnaire] No questions available for', procedure);
        return;
      }
      const q0 = questionnaire.questions[0];
      const firstQuestion = {
        text: q0.question,
        sender: 'bot',
        timestamp: new Date(),
        isQuestionnaireQuestion: true,
        questionId: q0.id,
        options: q0.options,
        isInput: q0.isInput,
        field: q0.field,
        placeholder: q0.placeholder,
        multiSelect: !!q0.multiSelect,
      };
      console.log('[Questionnaire] First question rendered:', firstQuestion);
      setMessages(prev => [...prev, firstQuestion]);
    }, 1000);
  }, []);

  // Booking flow questions
  const bookingQuestions = [
    { field: 'name', question: 'What is your full name?', placeholder: 'Enter your full name' },
    { field: 'city', question: 'Which city are you located in?', placeholder: 'Enter your city' },
    { field: 'phone', question: 'What is your phone number?', placeholder: 'Enter your phone number' },
    { field: 'language', question: 'What is your preferred language for consultation?', placeholder: 'e.g., English, Hindi, Tamil' },
    { field: 'procedure', question: 'Which procedure or treatment are you interested in?', placeholder: 'e.g., PAE, GAE, Thyroid treatment' },
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
    // Guard: if questionnaire context is missing or out-of-bounds, ignore safely
    if (!currentQuestionnaire || !currentQuestionnaire.questions || questionnaireStep == null) {
      return;
    }
    if (questionnaireStep < 0 || questionnaireStep >= currentQuestionnaire.questions.length) {
      return;
    }
    const currentQuestion = currentQuestionnaire.questions[questionnaireStep];
    const selectedOption = Array.isArray(response) ? response.join(', ') : response;
    const updatedResponses = { ...questionnaireResponses, [currentQuestion.field]: selectedOption };
    setQuestionnaireResponses(updatedResponses);

    // FTR: Not right now should end the chat with resources
    if (updatedResponses.procedure === 'FTR' && currentQuestion.field === 'ftr_specialist_choice' && selectedOption === 'Not right now') {
      const closeMsg = {
        text: 'No worries at all. Here are some useful resources you can check out anytime. If you’d like to speak with a specialist later, just message me “Hi” — I’ll be happy to arrange it for you. Take care.',
        sender: 'bot',
        timestamp: new Date(),
        aiGenerated: true,
        recommendedTreatment: currentQuestionnaire.treatmentPage,
        youtubeVideo: currentQuestionnaire.youtubeVideo,
      };
      setMessages(prev => [...prev, closeMsg]);
      setIsQuestionnaireActive(false);
      setQuestionnaireStep(0);
      setQuestionnaireResponses({});
      setCurrentQuestionnaire(null);
      return;
    }

    // MAIN_MENU: route to the selected questionnaire and end menu flow
    if (updatedResponses.procedure === 'MAIN_MENU' && currentQuestion.id === 'menu_choice') {
      const norm = (selectedOption || '').toString().trim().toLowerCase();
      let nextProcedure = null;
      if (norm === '1' || norm.startsWith('1-') || norm.includes('varicose')) nextProcedure = 'VV';
      else if (norm === '2' || norm.startsWith('2-') || norm.includes('fallopian') || norm.includes('ftr') || norm.includes('fte')) nextProcedure = 'FTR';
      else if (norm === '3' || norm.startsWith('3-') || norm.includes('genicular') || norm.includes('gae')) nextProcedure = 'GAE';
      else if (norm === '4' || norm.startsWith('4-') || norm.includes('thyroid') || norm.includes('tna')) nextProcedure = 'TNA';
      else if (norm === '5' || norm.startsWith('5-') || norm.includes('uterine') || norm.includes('fibroid') || norm.includes('ufe') || norm.includes('uae')) nextProcedure = 'UFE';
      else if (norm === '6' || norm.startsWith('6-') || norm.includes('breast') || norm.includes('vae')) nextProcedure = 'VAE';

      if (nextProcedure) {
        setIsQuestionnaireActive(false);
        setQuestionnaireStep(0);
        setQuestionnaireResponses({});
        setCurrentQuestionnaire(null);
        setTimeout(() => startQuestionnaire(nextProcedure), 300);
        return;
      }

      const retry = {
        text: 'Please reply with 1, 2, 3, 4, 5, or 6 to choose a condition.',
        sender: 'bot',
        timestamp: new Date(),
        isQuestionnaireQuestion: true,
        questionId: currentQuestion.id,
        options: currentQuestion.options,
        field: currentQuestion.field,
      };
      setMessages(prev => [...prev, retry]);
      return;
    }

    // VV: After selecting callback time
    // - Consult path: proceed to details collection (age/name/city/...) if not already collected.
    // - Book Consultation path: details are collected earlier, so mark complete and submit.
    if (updatedResponses.procedure === 'VV' && (currentQuestion.id === 'vv_callback_time' || currentQuestion.id === 'vv_callback_time_book')) {
      const isBookPath = (updatedResponses.vv_path_choice || '').toString().trim() === 'Book Consultation';
      if (isBookPath && currentQuestion.id === 'vv_callback_time_book') {
        setQuestionnaireStep(currentQuestionnaire.questions.length);
        return;
      }

      // Consult path: ask age if missing, otherwise continue from name.
      const alreadyHasAge = !!(updatedResponses.age_group && updatedResponses.age_group.toString().trim());
      const targetId = alreadyHasAge ? 'vv_name_consult' : 'vv_age_group_consult';
      const nextIndex = currentQuestionnaire.questions.findIndex((q) => q.id === targetId);
      if (nextIndex !== -1) {
        setQuestionnaireStep(nextIndex);
        setTimeout(() => {
          const nq = currentQuestionnaire.questions[nextIndex];
          const nextQuestion = {
            text: nq.question,
            sender: 'bot',
            timestamp: new Date(),
            isQuestionnaireQuestion: true,
            questionId: nq.id,
            options: nq.options,
            isInput: nq.isInput,
            field: nq.field,
            placeholder: nq.placeholder,
            multiSelect: !!nq.multiSelect,
          };
          console.log('[Questionnaire] Next question rendered:', nextQuestion);
          setMessages(prev => [...prev, nextQuestion]);
        }, 500);
        return;
      }
    }

    // VAE: After selecting callback time
    // - Consult path: proceed to details collection (name/city/language/phone)
    // - Book Consultation path: details are collected earlier, so mark complete and submit.
    if (updatedResponses.procedure === 'VAE' && (currentQuestion.id === 'vae_callback_time' || currentQuestion.id === 'vae_callback_time_book')) {
      const isBookPath = (updatedResponses.vae_path_choice || '').toString().trim() === 'Book Consultation';
      if (isBookPath && currentQuestion.id === 'vae_callback_time_book') {
        setQuestionnaireStep(currentQuestionnaire.questions.length);
        return;
      }

      const nextIndex = currentQuestionnaire.questions.findIndex((q) => q.id === 'vae_name');
      if (nextIndex !== -1) {
        setQuestionnaireStep(nextIndex);
        setTimeout(() => {
          const nq = currentQuestionnaire.questions[nextIndex];
          const nextQuestion = {
            text: nq.question,
            sender: 'bot',
            timestamp: new Date(),
            isQuestionnaireQuestion: true,
            questionId: nq.id,
            options: nq.options,
            isInput: nq.isInput,
            field: nq.field,
            placeholder: nq.placeholder,
            multiSelect: !!nq.multiSelect,
          };
          setMessages(prev => [...prev, nextQuestion]);
        }, 500);
        return;
      }
    }

    // UFE: After selecting callback time
    // - Consult path: proceed to details collection (name/city/language/phone)
    // - Book Consultation path: details are collected earlier, so mark complete and submit.
    if (updatedResponses.procedure === 'UFE' && (currentQuestion.id === 'ufe_callback_time' || currentQuestion.id === 'ufe_callback_time_book')) {
      const isBookPath = (updatedResponses.ufe_path_choice || '').toString().trim() === 'Book Consultation';
      if (isBookPath && currentQuestion.id === 'ufe_callback_time_book') {
        setQuestionnaireStep(currentQuestionnaire.questions.length);
        return;
      }

      const nextIndex = currentQuestionnaire.questions.findIndex((q) => q.id === 'ufe_name_consult');
      if (nextIndex !== -1) {
        setQuestionnaireStep(nextIndex);
        setTimeout(() => {
          const nq = currentQuestionnaire.questions[nextIndex];
          const nextQuestion = {
            text: nq.question,
            sender: 'bot',
            timestamp: new Date(),
            isQuestionnaireQuestion: true,
            questionId: nq.id,
            options: nq.options,
            isInput: nq.isInput,
            field: nq.field,
            placeholder: nq.placeholder,
            multiSelect: !!nq.multiSelect,
          };
          setMessages(prev => [...prev, nextQuestion]);
        }, 500);
        return;
      }
    }

    // TNA: After selecting callback time
    // - Consult path: proceed to details collection (age/name/city/language/phone)
    // - Book Consultation path: details are collected earlier, so mark complete and submit.
    if (updatedResponses.procedure === 'TNA' && (currentQuestion.id === 'tna_callback_time' || currentQuestion.id === 'tna_callback_time_book')) {
      const isBookPath = (updatedResponses.tna_path_choice || '').toString().trim() === 'Book Consultation';
      if (isBookPath && currentQuestion.id === 'tna_callback_time_book') {
        setQuestionnaireStep(currentQuestionnaire.questions.length);
        return;
      }

      const alreadyHasAge = !!(updatedResponses.age_group && updatedResponses.age_group.toString().trim());
      const targetId = alreadyHasAge ? 'tna_name_consult' : 'tna_age_consult';
      const nextIndex = currentQuestionnaire.questions.findIndex((q) => q.id === targetId);
      if (nextIndex !== -1) {
        setQuestionnaireStep(nextIndex);
        setTimeout(() => {
          const nq = currentQuestionnaire.questions[nextIndex];
          const nextQuestion = {
            text: nq.question,
            sender: 'bot',
            timestamp: new Date(),
            isQuestionnaireQuestion: true,
            questionId: nq.id,
            options: nq.options,
            isInput: nq.isInput,
            field: nq.field,
            placeholder: nq.placeholder,
            multiSelect: !!nq.multiSelect,
          };
          setMessages(prev => [...prev, nextQuestion]);
        }, 500);
        return;
      }
    }

    // FTR: After selecting callback time, continue to details collection
    if (updatedResponses.procedure === 'FTR' && (currentQuestion.id === 'ftr_callback_time' || currentQuestion.id === 'ftr_callback_time_book')) {
      const alreadyHasAge = !!(updatedResponses.age_group && updatedResponses.age_group.toString().trim());
      const isBookPath = (updatedResponses.ftr_path_choice || '').toString().trim() === 'Book Consultation';
      const targetId =
        currentQuestion.id === 'ftr_callback_time_book' || isBookPath
          ? (alreadyHasAge ? 'ftr_name_book' : 'ftr_age_book')
          : (alreadyHasAge ? 'ftr_name' : 'ftr_age');

      const nextIndex = currentQuestionnaire.questions.findIndex((q) => q.id === targetId);
      if (nextIndex !== -1) {
        setQuestionnaireStep(nextIndex);
        setTimeout(() => {
          const nq = currentQuestionnaire.questions[nextIndex];
          const nextQuestion = {
            text: nq.question,
            sender: 'bot',
            timestamp: new Date(),
            isQuestionnaireQuestion: true,
            questionId: nq.id,
            options: nq.options,
            isInput: nq.isInput,
            field: nq.field,
            placeholder: nq.placeholder,
            multiSelect: !!nq.multiSelect,
          };
          setMessages(prev => [...prev, nextQuestion]);
        }, 500);
        return;
      }
    }

    // GAE: After selecting callback time
    // - Consult path: proceed to details collection (name/city/language/phone)
    // - Book Consultation path: details are collected earlier, so mark complete and submit.
    if (updatedResponses.procedure === 'GAE' && (currentQuestion.id === 'gae_callback_time' || currentQuestion.id === 'gae_callback_time_book')) {
      const isBookPath = (updatedResponses.gae_path_choice || '').toString().trim() === 'Book Consultation';
      if (isBookPath && currentQuestion.id === 'gae_callback_time_book') {
        setQuestionnaireStep(currentQuestionnaire.questions.length);
        return;
      }

      const nextIndex = currentQuestionnaire.questions.findIndex((q) => q.id === 'gae_name');
      if (nextIndex !== -1) {
        setQuestionnaireStep(nextIndex);
        setTimeout(() => {
          const nq = currentQuestionnaire.questions[nextIndex];
          const nextQuestion = {
            text: nq.question,
            sender: 'bot',
            timestamp: new Date(),
            isQuestionnaireQuestion: true,
            questionId: nq.id,
            options: nq.options,
            isInput: nq.isInput,
            field: nq.field,
            placeholder: nq.placeholder,
            multiSelect: !!nq.multiSelect,
          };
          setMessages(prev => [...prev, nextQuestion]);
        }, 500);
        return;
      }
    }

    // GAE: Close Request should end the chat with resources
    if (updatedResponses.procedure === 'GAE' && currentQuestion.field === 'gae_atypical_choice' && selectedOption === 'Close Request') {
      const closeMsg = {
        text: 'No worries at all. Here are some useful resources you can check out anytime. If you’d like to speak with a specialist later, just message me “Hi” — I’ll be happy to arrange it for you. Take care.',
        sender: 'bot',
        timestamp: new Date(),
        aiGenerated: true,
        recommendedTreatment: currentQuestionnaire.treatmentPage,
        youtubeVideo: currentQuestionnaire.youtubeVideo,
      };
      setMessages(prev => [...prev, closeMsg]);
      setIsQuestionnaireActive(false);
      setQuestionnaireStep(0);
      setQuestionnaireResponses({});
      setCurrentQuestionnaire(null);
      return;
    }

    // GAE: Not right now should end the chat with resources
    if (updatedResponses.procedure === 'GAE' && currentQuestion.field === 'gae_specialist_choice' && selectedOption === 'Not right now') {
      const closeMsg = {
        text: 'No worries at all. Here are some useful resources you can check out anytime. If you’d like to speak with a specialist later, just message me “Hi” — I’ll be happy to arrange it for you. Take care.',
        sender: 'bot',
        timestamp: new Date(),
        aiGenerated: true,
        recommendedTreatment: currentQuestionnaire.treatmentPage,
        youtubeVideo: currentQuestionnaire.youtubeVideo,
      };
      setMessages(prev => [...prev, closeMsg]);
      setIsQuestionnaireActive(false);
      setQuestionnaireStep(0);
      setQuestionnaireResponses({});
      setCurrentQuestionnaire(null);
      return;
    }

    // TNA: Close Request should end the chat with resources
    if (updatedResponses.procedure === 'TNA' && currentQuestion.field === 'tna_atypical_choice' && selectedOption === 'Close Request') {
      const closeMsg = {
        text: 'No worries at all. Here are some useful resources you can check out anytime. If you’d like to speak with a specialist later, just message me “Hi” — I’ll be happy to arrange it for you. Take care.',
        sender: 'bot',
        timestamp: new Date(),
        aiGenerated: true,
        recommendedTreatment: currentQuestionnaire.treatmentPage,
        youtubeVideo: currentQuestionnaire.youtubeVideo,
      };
      setMessages(prev => [...prev, closeMsg]);
      setIsQuestionnaireActive(false);
      setQuestionnaireStep(0);
      setQuestionnaireResponses({});
      setCurrentQuestionnaire(null);
      return;
    }

    // TNA: Not right now should end the chat with resources
    if (updatedResponses.procedure === 'TNA' && currentQuestion.field === 'tna_specialist_choice' && selectedOption === 'Not right now') {
      const closeMsg = {
        text: 'No worries at all. Here are some useful resources you can check out anytime. If you’d like to speak with a specialist later, just message me “Hi” — I’ll be happy to arrange it for you. Take care.',
        sender: 'bot',
        timestamp: new Date(),
        aiGenerated: true,
        recommendedTreatment: currentQuestionnaire.treatmentPage,
        youtubeVideo: currentQuestionnaire.youtubeVideo,
      };
      setMessages(prev => [...prev, closeMsg]);
      setIsQuestionnaireActive(false);
      setQuestionnaireStep(0);
      setQuestionnaireResponses({});
      setCurrentQuestionnaire(null);
      return;
    }

    // UFE: Close Request should end the chat with resources
    if (updatedResponses.procedure === 'UFE' && currentQuestion.field === 'ufe_atypical_choice' && selectedOption === 'Close Request') {
      const closeMsg = {
        text: 'No worries at all. Here are some useful resources you can check out anytime. If you’d like to speak with a specialist later, just message me “Hi” — I’ll be happy to arrange it for you. Take care.',
        sender: 'bot',
        timestamp: new Date(),
        aiGenerated: true,
        recommendedTreatment: currentQuestionnaire.treatmentPage,
        youtubeVideo: currentQuestionnaire.youtubeVideo,
      };
      setMessages(prev => [...prev, closeMsg]);
      setIsQuestionnaireActive(false);
      setQuestionnaireStep(0);
      setQuestionnaireResponses({});
      setCurrentQuestionnaire(null);
      return;
    }

    // UFE: Not right now should end the chat with resources
    if (updatedResponses.procedure === 'UFE' && currentQuestion.field === 'ufe_specialist_choice' && selectedOption === 'Not right now') {
      const closeMsg = {
        text: 'No worries at all. Here are some useful resources you can check out anytime. If you’d like to speak with a specialist later, just message me “Hi” — I’ll be happy to arrange it for you. Take care.',
        sender: 'bot',
        timestamp: new Date(),
        aiGenerated: true,
        recommendedTreatment: currentQuestionnaire.treatmentPage,
        youtubeVideo: currentQuestionnaire.youtubeVideo,
      };
      setMessages(prev => [...prev, closeMsg]);
      setIsQuestionnaireActive(false);
      setQuestionnaireStep(0);
      setQuestionnaireResponses({});
      setCurrentQuestionnaire(null);
      return;
    }

    // VAE: Close Request should end the chat with resources
    if (updatedResponses.procedure === 'VAE' && currentQuestion.field === 'vae_atypical_choice' && selectedOption === 'Close Request') {
      const closeMsg = {
        text: 'No worries at all. Here are some useful resources you can check out anytime. If you’d like to speak with a specialist later, just message me “Hi” — I’ll be happy to arrange it for you. Take care.',
        sender: 'bot',
        timestamp: new Date(),
        aiGenerated: true,
        recommendedTreatment: currentQuestionnaire.treatmentPage,
        youtubeVideo: currentQuestionnaire.youtubeVideo,
      };
      setMessages(prev => [...prev, closeMsg]);
      setIsQuestionnaireActive(false);
      setQuestionnaireStep(0);
      setQuestionnaireResponses({});
      setCurrentQuestionnaire(null);
      return;
    }

    // VAE: Not right now should end the chat with resources
    if (updatedResponses.procedure === 'VAE' && currentQuestion.field === 'vae_specialist_choice' && selectedOption === 'Not right now') {
      const closeMsg = {
        text: 'No worries at all. Here are some useful resources you can check out anytime. If you’d like to speak with a specialist later, just message me “Hi” — I’ll be happy to arrange it for you. Take care.',
        sender: 'bot',
        timestamp: new Date(),
        aiGenerated: true,
        recommendedTreatment: currentQuestionnaire.treatmentPage,
        youtubeVideo: currentQuestionnaire.youtubeVideo,
      };
      setMessages(prev => [...prev, closeMsg]);
      setIsQuestionnaireActive(false);
      setQuestionnaireStep(0);
      setQuestionnaireResponses({});
      setCurrentQuestionnaire(null);
      return;
    }

    // VV: Close Request (atypical symptom path) should end the chat with resources
    if (updatedResponses.procedure === 'VV' && currentQuestion.field === 'vv_atypical_choice' && selectedOption === 'Close Request') {
      const closeMsg = {
        text: 'No worries at all. Here are some useful resources you can check out anytime. If you’d like to talk to a specialist later, just message me “Hi” — I’ll be happy to arrange it for you. Thank you. Take care.',
        sender: 'bot',
        timestamp: new Date(),
        aiGenerated: true,
        recommendedTreatment: currentQuestionnaire.treatmentPage,
        youtubeVideo: currentQuestionnaire.youtubeVideo,
      };
      setMessages(prev => [...prev, closeMsg]);
      setIsQuestionnaireActive(false);
      setQuestionnaireStep(0);
      setQuestionnaireResponses({});
      setCurrentQuestionnaire(null);
      return;
    }

    // VV: Not right now should end the chat with resources
    if (updatedResponses.procedure === 'VV' && currentQuestion.field === 'vv_consult_specialist' && selectedOption === 'Not right now') {
      const closeMsg = {
        text: 'No worries at all. Here are some useful resources you can check out anytime. If you’d like to talk to a specialist later, just message me “Hi” — I’ll be happy to arrange it for you. Thank you. Take care.',
        sender: 'bot',
        timestamp: new Date(),
        aiGenerated: true,
        recommendedTreatment: currentQuestionnaire.treatmentPage,
        youtubeVideo: currentQuestionnaire.youtubeVideo,
      };
      setMessages(prev => [...prev, closeMsg]);
      setIsQuestionnaireActive(false);
      setQuestionnaireStep(0);
      setQuestionnaireResponses({});
      setCurrentQuestionnaire(null);
      return;
    }

    // Check if user selected "Seeking General Information" on first question
    if (currentQuestion.field === 'user_intent' && selectedOption === 'Seeking General Information') {
      // End questionnaire and show information response
      const infoMessage = {
        text: `🎉 Thank you for your interest in ${currentQuestionnaire.procedure}! \n\nHere are some helpful resources for you:\n\n📖 Learn more about ${currentQuestionnaire.procedure} treatment on our detailed page\n🎥 Watch our informative video about ${currentQuestionnaire.procedure} procedure\n\nFeel free to reach out if you have any questions!`,
        sender: 'bot',
        timestamp: new Date(),
        aiGenerated: true,
        recommendedTreatment: currentQuestionnaire.treatmentPage,
        youtubeVideo: currentQuestionnaire.youtubeVideo,
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
        youtubeVideo: currentQuestionnaire.youtubeVideo,
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
        const nq = nextQuestionData.question;
        const nextQuestion = {
          text: nq.question,
          sender: 'bot',
          timestamp: new Date(),
          isQuestionnaireQuestion: true,
          questionId: nq.id,
          options: nq.options,
          isInput: nq.isInput,
          field: nq.field,
          placeholder: nq.placeholder,
          multiSelect: !!nq.multiSelect,
        };
        console.log('[Questionnaire] Next question rendered:', nextQuestion);
        setMessages(prev => [...prev, nextQuestion]);
      }, 500);
    } else {
      // No further valid questions (often because remaining questions are conditionally skipped).
      // Mark questionnaire complete to trigger submission effect.
      setQuestionnaireStep(currentQuestionnaire.questions.length);
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
    if (
      isQuestionnaireActive &&
      currentQuestionnaire &&
      currentQuestionnaire.procedure !== 'MAIN_MENU' &&
      questionnaireStep === currentQuestionnaire.questions.length
    ) {
      submitQuestionnaireToTeleCRM(questionnaireResponses, currentQuestionnaire);
    }
  }, [questionnaireStep, isQuestionnaireActive, questionnaireResponses, currentQuestionnaire]);

  // Function to submit questionnaire responses to TeleCRM
  const submitQuestionnaireToTeleCRM = useCallback(async (responses, questionnaire) => {
    setIsSubmittingQuestionnaire(true);
    // Removed intermediate "saving responses" message per request

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
        'blocked_ft_diagnosed', 'hsg_report_available',
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
        // TeleCRM submission successful
        const thankYouMessage =
          questionnaire.procedure === 'VV'
            ? {
                text: 'Thank you. Your details have been noted. A member of our care team will contact you as discussed.\n\nMeanwhile, I’ll share helpful information about Varicose Veins and Endovenous Ablation for you to review.\n\nWishing you good health. Take care.',
                sender: 'bot',
                timestamp: new Date(),
                aiGenerated: true,
                recommendedTreatment: questionnaire.treatmentPage,
                youtubeVideo: questionnaire.youtubeVideo,
              }
            : questionnaire.procedure === 'FTR'
                ? {
                    text: 'Thank you. Your details have been noted. A member of our care team will contact you as discussed.\n\nMeanwhile, I’ll share helpful information about Fallopian Tube Recanalization (FTR) for you to review.\n\nWishing you good health. Take care.',
                    sender: 'bot',
                    timestamp: new Date(),
                    aiGenerated: true,
                    recommendedTreatment: questionnaire.treatmentPage,
                    youtubeVideo: questionnaire.youtubeVideo,
                  }
            : questionnaire.procedure === 'GAE'
                ? {
                    text: 'Thank you. Your details have been noted. A member of our care team will contact you as discussed.\n\nMeanwhile, I’ll share helpful information about Knee Pain / Osteoarthritis and Genicular Artery Embolization (GAE) for you to review.\n\nWishing you good health. Take care.',
                    sender: 'bot',
                    timestamp: new Date(),
                    aiGenerated: true,
                    recommendedTreatment: questionnaire.treatmentPage,
                    youtubeVideo: questionnaire.youtubeVideo,
                  }
            : questionnaire.procedure === 'TNA'
                ? {
                    text: 'Thank you. Your details have been noted. A member of our care team will contact you as discussed.\n\nMeanwhile, I’ll share helpful information about Thyroid Nodule Ablation (TNA) for you to review.\n\nWishing you good health. Take care.',
                    sender: 'bot',
                    timestamp: new Date(),
                    aiGenerated: true,
                    recommendedTreatment: questionnaire.treatmentPage,
                    youtubeVideo: questionnaire.youtubeVideo,
                  }
            : questionnaire.procedure === 'UFE'
                ? {
                    text: 'Thank you. Your details have been noted. A member of our care team will contact you as discussed.\n\nMeanwhile, I’ll share helpful information about Uterine Fibroids and Uterine Fibroid Embolization (UFE/UAE) for you to review.\n\nWishing you good health. Take care.',
                    sender: 'bot',
                    timestamp: new Date(),
                    aiGenerated: true,
                    recommendedTreatment: questionnaire.treatmentPage,
                    youtubeVideo: questionnaire.youtubeVideo,
                  }
            : questionnaire.procedure === 'VAE'
                ? {
                    text: 'Thank you. Your details have been noted. A member of our care team will contact you as discussed.\n\nMeanwhile, I’ll share helpful information about Breast Nodules and minimally invasive treatment options like Vacuum-Assisted Excision (VAE) for you to review.\n\nWishing you good health. Take care.',
                    sender: 'bot',
                    timestamp: new Date(),
                    aiGenerated: true,
                    recommendedTreatment: questionnaire.treatmentPage,
                    youtubeVideo: questionnaire.youtubeVideo,
                  }
                : {
                    text: 'Thank you. Our medical team will review your answers and contact you soon.',
                    sender: 'bot',
                    timestamp: new Date(),
                    aiGenerated: true,
                    recommendedTreatment: questionnaire.treatmentPage,
                  };
        setMessages(prev => [...prev, thankYouMessage]);
      } else {
        const errorText = await response.text();
        console.error('TeleCRM API Error:', response.status, errorText);
        throw new Error(`API submission failed: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Questionnaire submission error:', error);
      const errorMessage = {
        text: 'I understand your query. To make sure you get the most accurate and relevant guidance, our care team is available to assist you directly. Connect with our care team at +91 93636 56010 or +91 89259 28840 for clear, step-by-step guidance on how to proceed.',
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
    // Removed interim submitting message per request

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
          text: 'Thank you for providing all the information. Your request has been submitted successfully. Thank you for choosing MedAgg Healthcare. Our care team will be reaching you shortly to confirm your appointment details',
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
        text: 'I understand your query. To make sure you get the most accurate and relevant guidance, our care team is available to assist you directly. Connect with our care team at +91 93636 56010 or +91 89259 28840 for clear, step-by-step guidance on how to proceed.',
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
      'GAE': '/genicular-artery-embolization-gae',
      'Genicular Artery Embolization': '/genicular-artery-embolization-gae',
      'knee pain': '/genicular-artery-embolization-gae',
      'PAE': '/prostate-artery-embolization-pae',
      'Prostatic Artery Embolization': '/prostate-artery-embolization-pae',
      'prostate': '/pae',
      'BPH': '/pae',
      'Thyroid': '/thyroid-nodule-ablation',
      'thyroid nodule': '/thyroid-nodule-ablation',
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
      'UFE': '/uterine-artery-embolization-uae',
      'UAE': '/uterine-artery-embolization-uae',
      'Uterine Fibroid': '/uterine-artery-embolization-uae',
      'fibroid': '/uterine-artery-embolization-uae',
      'PFE': '/plantar-fascial-embolization',
      'Plantar Fascial': '/plantar-fascial-embolization',
      'heel pain': '/plantar-fascial-embolization',
      'Fallopian': '/fallopian-tube-recanalization-ftr',
      'FTE': '/fallopian-tube-recanalization-ftr',
      'FTR': '/fallopian-tube-recanalization-ftr',
      'TAVI': '/transcatheter-aortic-valve-replacement',
      'Aortic Valve': '/transcatheter-aortic-valve-replacement',
      'RFA': '/rfa',
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
      // Allow typed selection for MAIN_MENU
      if (currentQuestionnaire && currentQuestionnaire.procedure === 'MAIN_MENU') {
        const typed = (userInput || '').toString().trim();
        if (typed) handleQuestionnaireResponse(typed);
      }
      return;
    }

    // Check if we're in booking flow
    if (isBookingFlow) {
      handleBookingResponse(userInput);
      return;
    }

    // Greeting -> show main menu
    const greeting = (userInput || '').toString().trim().toLowerCase();
    if (
      greeting === 'hi' ||
      greeting === 'hii' ||
      greeting === 'hello' ||
      greeting === 'hey' ||
      greeting === 'hai' ||
      greeting === 'hi ira' ||
      greeting === 'hello ira'
    ) {
      startQuestionnaire('MAIN_MENU');
      return;
    }

    // Check for emergency first
    if (detectEmergency(userInput)) {
      const emergencyResponse = getEmergencyResponse();
      const botMessage = {
        text: emergencyResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        isEmergency: true,
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
        text: 'Here\'s our contact information:\n\n📞 **Phone:** +91 9363656010\n📧 **Email:** contact@medagg.com\n📍 **Location:** Perungudi, Chennai\n\nOur team is available to assist you with any questions or to schedule your consultation. Feel free to reach out to us anytime!',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, contactResponse]);
      return;
    }

    // Enhanced symptom detection for automatic questionnaire triggering
    const detection = detectProcedureFromSymptoms(lowerInput);

    if (detection && detection.procedure && questionnaires[detection.procedure]) {
      console.log('Detected procedure:', detection); // Debug log

      // Provide brief information first, then start questionnaire
      const procedureInfo = getProcedureInfo(detection.procedure);

      const infoMessage = {
        text: procedureInfo.message,
        sender: 'bot',
        timestamp: new Date(),
        // No CTA here for questionnaire flows
      };
      setMessages(prev => [...prev, infoMessage]);

      // Start questionnaire after brief delay
      setTimeout(() => {
        console.log('Starting questionnaire for:', detection.procedure); // Debug log
        startQuestionnaire(detection.procedure);
      }, 1500);
      return;
    } else if (detection) {
      // We detected a treatment from keywords, but it doesn't have a configured questionnaire.
      // Show the standardized condition-intro message and a CTA to the treatment page.
      const displayName = detection.displayName || 'this condition';
      const infoText = `Thanks for sharing that.\nBased on what you’ve mentioned, it looks like you may be looking for help\nrelated to ${displayName}.`;

      const infoMessage = {
        text: infoText,
        sender: 'bot',
        timestamp: new Date(),
        aiGenerated: true,
        recommendedTreatment: detection.route || '/#services',
      };
      setMessages(prev => [...prev, infoMessage]);
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
        { role: 'assistant', content: aiResponse.text },
      ].slice(-10)); // Keep last 10 messages for context

      // Update medical context
      updateMedicalContext(userInput, aiResponse.text);

      const botMessage = {
        text: aiResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        aiGenerated: true,
        recommendedTreatment: recommendedTreatmentRoute,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage = {
        text: 'I understand your query. To make sure you get the most accurate and relevant guidance, our care team is available to assist you directly. Connect with our care team at +91 93636 56010 or +91 89259 28840 for clear, step-by-step guidance on how to proceed.',
        sender: 'bot',
        timestamp: new Date(),
        error: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [detectEmergency, getEmergencyResponse, isQuestionnaireActive, isBookingFlow, handleBookingResponse, startBookingFlow, startQuestionnaire, callOpenAI, conversationHistory, updateMedicalContext, detectRecommendedTreatment]);

  const handleQuickResponse = (response) => {
    // Prevent selecting other quick links while booking is in progress
    if (isBookingFlow && bookingStep < bookingQuestions.length) {
      setIsQuickResponsesOpen(false);
      // Provide a gentle reminder message only once per click
      const reminder = {
        text: 'Please complete your appointment booking first. You can use quick links after submitting your details.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, reminder]);
      return;
    }
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
    } else if (response === 'What treatments do you offer?') {
      const botMessage = {
        text: 'We offer a range of effective non-surgical options designed to help you achieve the best possible results with minimal\u00A0downtime. Connect with our care team at \u202A+91 93636 56010\u202C or \u202A+91 89259 28840\u202C for clear, step-by-step guidance on\u00A0how\u00A0to\u00A0proceed. Feel free to explore the treatment\u00A0options\u00A0below.',
        sender: 'bot',
        timestamp: new Date(),
        aiGenerated: true,
        // Show CTA button pointing to treatments overview
        recommendedTreatment: '/#services',
      };
      setMessages(prev => [...prev, botMessage]);
    } else if (response === 'Tell me about non-surgical options') {
      const botMessage = {
        text: 'We offer a range of effective non-surgical options designed to help you achieve the best possible results with minimal\u00A0downtime. Feel free to explore the treatment options below.',
        sender: 'bot',
        timestamp: new Date(),
        aiGenerated: true,
        recommendedTreatment: '/#services',
      };
      setMessages(prev => [...prev, botMessage]);
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
              src='/Ira_for_website.gif'
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
                <h3 className='font-bold text-base sm:text-lg'>IRa</h3>
                <p className='text-xs text-pink-100 font-medium'>Interventional Radiology Assistant</p>
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
                            <button
                              type='button'
                              onClick={() => handleViewTreatment(message.recommendedTreatment)}
                              className='inline-flex items-center text-sm px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-lg hover:from-pink-600 hover:to-pink-500 transition-all shadow-sm hover:shadow-md'
                            >
                              View Treatment Options
                              <svg className='ml-1.5 w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' />
                              </svg>
                            </button>
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
                        {formatTime(message.timestamp)}
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
                        {formatTime(message.timestamp)}
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
              onClick={() => {
                if (isBookingFlow && bookingStep < bookingQuestions.length) return;
                setIsQuickResponsesOpen(!isQuickResponsesOpen);
              }}
              disabled={isBookingFlow && bookingStep < bookingQuestions.length}
              className={`flex justify-between items-center w-full text-left text-sm font-semibold transition-colors mb-2 ${
                isBookingFlow && bookingStep < bookingQuestions.length
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-800'
              }`}>
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
                    disabled={(isBookingFlow && bookingStep < bookingQuestions.length) || isSubmittingBooking || isSubmittingQuestionnaire || isAIProcessing}
                    className={`text-xs font-medium px-3.5 py-2 rounded-full transition-all whitespace-nowrap
                      ${
                        (isBookingFlow && bookingStep < bookingQuestions.length) || isSubmittingBooking || isSubmittingQuestionnaire || isAIProcessing
                          ? 'bg-gray-100 text-gray-300 border border-gray-200 cursor-not-allowed'
                          : response === 'Schedule Your Appointment'
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
