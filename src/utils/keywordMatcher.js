// Keyword-based treatment detection utility
// Reads structured keywords from treatment_keywords.json and matches user input.

import data from '../data/treatment_keywords.json';

// Map JSON entries to questionnaire procedure codes when available
// Only return codes that exist in questionnaires in chatbot.jsx
const NAME_TO_CODE = [
  { includes: 'Prostate', code: 'PAE' },
  { includes: 'Geniculate', code: 'GAE' },
  { includes: 'Thyroid', code: 'TNA' },
  { includes: 'Varicose Veins', code: 'VV' },
  { includes: 'Varicocele', code: 'VCE' },
  { includes: 'Fallopian Tube', code: 'FTR' },
  { includes: 'Uterine Fibroid', code: 'UFE' },
  { includes: 'Plantar Fasciitis', code: 'PFE' },
];

const normalize = (str) =>
  (str || '')
    .toString()
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const phraseHit = (inputNorm, phrase) => {
  const p = normalize(phrase);
  if (!p) return { hit: false, exact: false };
  const hit = inputNorm.includes(p);
  const exact = hit && (inputNorm === p);
  return { hit, exact };
};

export function detectTreatment(rawInput) {
  const inputNorm = normalize(rawInput);
  if (!inputNorm) return null;

  let best = { score: 0, name: null, path: null, procedureCode: null };

  for (const item of data) {
    const categories = item.categories || {};
    const symptoms = categories.symptoms || [];
    const lay = categories.lay_searches || [];
    const medical = categories.medical_terms || [];
    const ir = categories.ir_procedures || [];

    let score = 0;

    // Primary: symptoms and IR procedures
    for (const ph of symptoms) {
      const { hit, exact } = phraseHit(inputNorm, ph);
      if (hit) score += 3 + (exact ? 1 : 0);
    }
    for (const ph of ir) {
      const { hit, exact } = phraseHit(inputNorm, ph);
      if (hit) score += 3 + (exact ? 1 : 0);
    }

    // Secondary: lay searches and medical terms
    for (const ph of lay) {
      const { hit, exact } = phraseHit(inputNorm, ph);
      if (hit) score += 2 + (exact ? 1 : 0);
    }
    for (const ph of medical) {
      const { hit, exact } = phraseHit(inputNorm, ph);
      if (hit) score += 2 + (exact ? 1 : 0);
    }

    if (score > best.score) {
      // Try to map to a questionnaire-supported code
      const name = item.name || '';
      let procedureCode = null;
      for (const rule of NAME_TO_CODE) {
        if (name.includes(rule.includes)) {
          procedureCode = rule.code;
          break;
        }
      }

      best = {
        score,
        name,
        path: item.path,
        displayName: name,
        procedureCode,
      };
    }
  }

  // Minimal threshold to avoid false positives
  if (!best.name || best.score < 2) return null;

  return best;
}
