// Keyword-based treatment detection utility (clean version)
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
  const exact = hit && inputNorm === p;
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
        matchedVia: 'exact',
      };
    }
  }

  // Minimal threshold to avoid false positives
  if (!best.name || best.score < 2) return null;

  return best;
}

// --- Fuzzy detection for questionnaire gate ONLY ---
const ENABLE_GATE_FUZZ = true;

const normalizeAndStem = (str) => {
  const s = normalize(str);
  // very light stemming: remove common plurals
  return s.replace(/\b(veins|fibroids|lumps|nodes|tubes|knees|legs|symptoms)\b/g, (m) => m.slice(0, -1));
};

// Dice coefficient similarity (fast, decent for short phrases)
const diceCoefficient = (a, b) => {
  if (!a || !b) return 0;
  if (a === b) return 1;
  const bigrams = (s) => {
    const res = [];
    for (let i = 0; i < s.length - 1; i++) res.push(s.slice(i, i + 2));
    return res;
  };
  const aB = bigrams(a);
  const bB = bigrams(b);
  const map = new Map();
  for (const bg of aB) map.set(bg, (map.get(bg) || 0) + 1);
  let matches = 0;
  for (const bg of bB) {
    const c = map.get(bg) || 0;
    if (c > 0) {
      matches++;
      map.set(bg, c - 1);
    }
  }
  return (2 * matches) / (aB.length + bB.length);
};

export function detectTreatmentFuzzyGate(rawInput) {
  if (!ENABLE_GATE_FUZZ) return null;
  const inputNorm = normalizeAndStem(rawInput || '');
  if (!inputNorm) return null;

  let best = { score: 0, name: null, path: null, procedureCode: null };

  for (const item of data) {
    const categories = item.categories || {};
    const symptoms = (categories.symptoms || []).slice(0, 30);
    const lay = (categories.lay_searches || []).slice(0, 30);
    const medical = (categories.medical_terms || []).slice(0, 30);
    const ir = (categories.ir_procedures || []).slice(0, 30);

    let local = 0;

    const checkList = (phrases, primary) => {
      for (const ph of phrases) {
        const p = normalizeAndStem(ph);
        // quick exact contains first
        if (inputNorm.includes(p)) {
          local += primary ? 3 : 2;
          continue;
        }
        // fuzzy check
        const sim = diceCoefficient(inputNorm, p);
        if (primary ? sim >= 0.8 : sim >= 0.9) {
          local += primary ? 1 : 0.5; // small boost to allow gate start
        }
      }
    };

    checkList(symptoms, true);
    checkList(ir, true);
    checkList(lay, false);
    checkList(medical, false);

    if (local > best.score) {
      const name = item.name || '';
      let procedureCode = null;
      for (const rule of NAME_TO_CODE) {
        if (name.includes(rule.includes)) {
          procedureCode = rule.code;
          break;
        }
      }
      best = {
        score: local,
        name,
        path: item.path,
        displayName: name,
        procedureCode,
        matchedVia: 'fuzzy',
      };
    }
  }

  if (!best.name || best.score < 1) return null;
  return best;
}
