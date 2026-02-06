import React, { useState, useEffect, useDeferredValue, useTransition } from 'react';
import Hero_crossel from './Hero_crossel';
import HeroCrosselMap from './Hero_crossel_map';
import SharedSearchBar from './SharedSearchBar';
import MobileHeroSection from './MobileHeroSection';
import FloatingBadgeCTA from './FloatingBadgeCTA';
import curatedData from '../../data/treatment_keywords.json';

// Memoized, non-search slides to avoid re-rendering while typing
const MemoHeroCrossel = React.memo(Hero_crossel);
const MemoHeroCrosselMap = React.memo(HeroCrosselMap);

const OriginalHeroSlide = ({
  query,
  setQuery,
  handleSearch,
  results,
  isLoading,
  onSearchFocus,
  onSearchBlur,
}) => (
  <section
    className='relative w-full min-h-screen bg-cover bg-center rounded-none overflow-hidden flex items-center'
    style={{
      backgroundImage: 'url(\'/Herosection%20background.jpg\')',
    }}
  >
    {/* Overlay - Adjusted gradient to cover more area */}
    <div className='absolute inset-0 bg-gradient-to-br from-[#1a1446] via-[#2d2552] to-[#e1006a] opacity-90 z-0' />


    {/* Doctor Image - Hidden on mobile, visible from md screens up */}
    <div className='block md:absolute md:right-0 lg:right-0 md:translate-x-3 lg:translate-x-4 2xl:translate-x-5 bottom-0 z-10 w-full md:w-[380px] lg:w-[480px] xl:w-[560px] 2xl:w-[680px] md:max-h-[85vh] mt-8 md:mt-0 relative'>

      {/* Social Icons */}
      <div className='hidden md:flex absolute -top-20 right-72 flex-col items-start gap-2 z-20'>
        <p className='text-white/80 font-semibold text-sm mb-1'>Follow Us On :</p>
        <div className='flex items-center gap-3'>
          <a href='https://www.facebook.com/profile.php?id=61558841344582' target='_blank' rel='noopener noreferrer' aria-label='Facebook'
             className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/20 transition-all duration-200'>
            <svg className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor'><path d='M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.261c-1.243 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12'/></svg>
          </a>
          <a href='https://www.instagram.com/medagghealthcare?igsh=ZncyaGY3Z3poODky' target='_blank' rel='noopener noreferrer' aria-label='Instagram'
             className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/20 transition-all duration-200'>
            <svg className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor'><path d='M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.783 2.225 7.149 2.163 8.415 2.105 8.795 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.659.388 3.678 1.37c-.98.98-1.24 2.092-1.298 3.373C2.012 5.668 2 6.077 2 12c0 5.923.012 6.332.07 7.613.058 1.281.318 2.393 1.298 3.373.98.98 2.092 1.24 3.373 1.298C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.281-.058 2.393-.318 3.373-1.298.98-.98 1.24-2.092 1.298-3.373.058-1.281.07-1.69.07-7.613 0-5.923-.012-6.332-.07-7.613-.058-1.281-.318-2.393-1.298-3.373-.98-.98-2.092-1.24-3.373-1.298C15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z'/></svg>
          </a>
          <a href='https://youtube.com/@medagghealthcare?si=aUo2YtohR4EquRx1' target='_blank' rel='noopener noreferrer' aria-label='YouTube'
             className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/20 transition-all duration-200'>
            <svg className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor'><path d='M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 8.072 0 12 0 12s0 3.928.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.5 20.5 12 20.5 12 20.5s7.5 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.928 24 12 24 12s0-3.928-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'/></svg>
          </a>
          <a href='https://www.linkedin.com/company/medagg-healthcare/' target='_blank' rel='noopener noreferrer' aria-label='LinkedIn'
             className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/20 transition-all duration-200'>
            <svg className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor'><path d='M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h4v1.743c.553-.984 1.98-2.243 4.287-2.243C20.38 8.5 21 11.037 21 14.298V21H17v-6.19c0-1.477-.027-3.375-2.063-3.375-2.065 0-2.383 1.6-2.383 3.264V21H9z'/></svg>
          </a>
         
        </div>
      </div>
      <img
        src='/abc_home.png'
        alt='Doctor'
        className='w-1/2 sm:w-2/5 md:w-full h-auto md:h-full object-contain mx-auto md:scale-105 lg:scale-110'
      />
    </div>

    {/* Content Container */}
    <div className='relative z-10 flex flex-col justify-center items-center md:items-start w-full text-center md:text-left pt-6 pb-5 md:pt-6 md:pb-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
        {/* Content - Left side with responsive width (ISVIR logo/text removed) */}
        <div className='flex flex-col justify-center items-center md:items-start h-full gap-2 sm:gap-3 pt-2 sm:pt-4 md:pt-0 w-full md:max-w-2xl lg:max-w-xl xl:max-w-2xl'>

          <h1
            className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mt-2'
            style={{ lineHeight: 1.2 }}
          >
            <span className='block'>No Surgery. No Scars.</span>
            <span className='block mt-0.5 sm:mt-1'>Just Results.</span>
          </h1>

          {/* Subtitle & Search Bar Container */}
          <div className='-mt-4'>
            <p className='text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-medium mb-4'>
              Experience care without fear, without surgery, and with quick recovery.
            </p>
            <SharedSearchBar
              query={query}
              setQuery={setQuery}
              handleSearch={handleSearch}
              results={results}
              isLoading={isLoading}
              onInputFocus={onSearchFocus}
              onInputBlur={onSearchBlur}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const totalSlides = 3;
  // Defer query updates to reduce re-render pressure while typing
  const deferredQuery = useDeferredValue(query);
  const [, startTransition] = useTransition();

  // Clear results when query is emptied
  useEffect(() => {
    if (!(deferredQuery || '').trim()) {
      setResults([]);
      setIsLoading(false);
    }
  }, [deferredQuery]);

  // Data structure for treatment suggestions
  const treatmentSuggestions = [
    {
      name: 'Prostate Artery Embolization (PAE)',
      path: '/prostate-artery-embolization-pae',
      keywords: [
        'prostate',
        'pae',
        'bph',
        'enlarged prostate',
        'benign prostatic hyperplasia',
        'urination',
        'urine',
        'frequent urination',
        'weak urine stream',
        'difficulty urinating',
        'nighttime urination',
        'bathroom problems',
        'urinary issues',
        'prostate problems',
        'urinary retention',
        'bladder problems',
        'pee problems',
        'frequent bathroom visits',
      ],
    },
    {
      name: 'Geniculate Artery Embolization (GAE)',
      path: '/genicular-artery-embolization-gae',
      keywords: [
        'geniculate artery embolization',
        'knee pain',
        'knee',
        'osteoarthritis',
        'knee arthritis',
        'joint pain',
        'knee joint',
        'knee stiffness',
        'walking pain',
        'climbing stairs pain',
        'knee swelling',
        'chronic knee pain',
        'arthritis',
        'joint stiffness',
        'gae procedure',
        'knee treatment',
        'knee embolization',
        'non-surgical knee treatment',
      ],
    },
    {
      name: 'Fallopian Tube Recanalization (FTR)',
      path: '/fallopian-tube-recanalization-ftr',
      keywords: [
        'fallopian tube recanalization',
        'blocked fallopian tube treatment',
        'minimally invasive fertility treatment',
        'fallopian tube blockage solution',
        'ftr procedure for infertility',
        'non-surgical infertility treatment',
        'fallopian tube reopening procedure',
        'interventional radiology fertility treatment',
        'ftr vs ivf',
        'fallopian tube recanalization success rate',
        'blocked tubes pregnancy solution',
        'fallopian tube repair procedure',
        'fallopian tube recanalization cost',
        'infertility treatment without surgery',
      ],
    },
    {
      name: 'Varicocele Embolization',
      path: '/varicocele-embolization',
      keywords: [
        'varicocele embolization',
        'varicocele surgery',
        'varicocelectomy',
        'non-surgical varicocele treatment',
        'embolization for male infertility',
        'varicocele minimally invasive treatment',
        'varicocele embolization vs surgery',
        'testicular vein embolization',
        'varicocele embolization recovery',
        'cost of varicocele embolization',
        'embolization for varicocele pain relief',
        'interventional radiology varicocele treatment',
        'varicocele embolization success rate',
        'infertility treatment for varicocele',
        'varicocele embolization risks',
        'male infertility embolization treatment',
        'varicocele vein repair procedure',
        'veins in scrotum',
      ],
    },
    {
      name: 'Thyroid Nodule Ablation',
      path: '/thyroid-nodule-ablation',
      keywords: [
        'thyroid nodule',
        'thyroid nodule ablation',
        'rfa for thyroid nodules',
        'radiofrequency ablation for thyroid',
        'thyroid lump non-surgical treatment',
        'minimally invasive thyroid treatment',
        'thermal ablation thyroid procedure',
        'thyroid nodule treatment without surgery',
        'benign thyroid nodule ablation',
        'thyroid radiofrequency treatment',
        'cost of thyroid nodule ablation',
        'thyroid lump reduction procedure',
        'microwave ablation thyroid',
        'thyroid ablation vs surgery',
        'thyroid nodule shrink treatment',
        'thyroid tumor ablation therapy',
        'thyroidectomy',
        'thyroidectomy vs ablation',
      ],
    },
    {
      name: 'Uterine Fibroid Embolization (UFE)',
      path: '/uterine-artery-embolization-uae',
      keywords: [
        'Uterine',
        'uterine fibroid embolization',
        'uterus fibroid',
        'fibroid in uterus',
        'ufe for fibroid treatment',
        'minimally invasive fibroid removal',
        'fibroid embolization vs hysterectomy',
        'uterine artery embolization',
        'non-surgical fibroid treatment',
        'fibroid embolization recovery',
      ],
    },
    {
      name: 'Varicose Veins',
      path: '/varicose-vein',
      keywords: [
        'Varicose Veins',
        'varicose vein treatment',
        'minimally invasive varicose vein removal',
        'laser treatment for varicose veins',
        'varicose vein embolization',
        'varicose vein ablation',
        'endovenous thermal ablation',
        'varicose veins non-surgical treatment',
        'vein embolization for leg pain',
        'varicose vein injection treatment',
        'varicose vein treatment cost',
        'varicose vein closure procedure',
        'varicose vein stripping alternative',
        'varicose vein recovery treatment',
        'spider vein embolization',
        'varicose vein day care procedure',
        'sclerotherapy',
      ],
    },
    {
      name: 'Transcatheter Aortic Valve Replacement (TAVR)',
      path: '/transcatheter-aortic-valve-replacement',
      keywords: [
        'transcatheter aortic valve replacement',
        'tavr procedure for aortic stenosis',
        'minimally invasive heart valve replacement',
        'tavr vs open heart surgery',
        'non-surgical aortic valve replacement',
        'tavr recovery time',
        'aortic valve replacement without surgery',
        'transcatheter valve implantation',
        'tavr heart procedure success rate',
        'tavr procedure cost',
        'aortic stenosis catheter treatment',
        'elderly valve replacement non-surgical',
        'tavr risks and benefits',
        'interventional cardiology valve treatment',
        'tavr procedure explained',
        'chest pain',
        'chest',
        'heart',
        'cardiac',
        'valve',
        'breathlessness',
        'shortness of breath',
      ],
    },
    {
      name: 'Radiofrequency Ablation (RFA)',
      path: '/rfa',
      keywords: [
        'radiofrequency ablation treatment',
        'rfa for cancer tumors',
        'minimally invasive tumor ablation',
        'liver tumor ablation',
        'kidney tumor ablation',
        'thyroid nodule rfa',
        'rfa for varicose veins',
        'cardiac arrhythmia ablation',
        'pain management rfa procedure',
        'nerve ablation radiofrequency',
        'tumor heat ablation treatment',
        'non-surgical ablation therapy',
        'radiofrequency ablation recovery',
        'cost of rfa procedure',
        'rfa in interventional radiology',
      ],
    },
    {
      name: 'Chronic Total Occlusion PCI',
      path: '/cto',
      keywords: [
        'chronic total occlusion pci',
        'cto percutaneous coronary intervention',
        'blocked coronary artery treatment',
        'minimally invasive heart blockage treatment',
        'cto angioplasty',
        'pci for chronic blockage',
        'interventional cardiology cto procedure',
        'cto stenting procedure',
        'coronary artery recanalization',
        'non-surgical treatment for heart blockage',
        'cto pci success rate',
        'cost of chronic total occlusion pci',
        'cto angioplasty vs cabg',
      ],
    },
    {
      name: 'Arteriovenous Malformations (AVM)',
      path: '/radiofrequency-ablation-for-avm',
      keywords: [
        'arteriovenous malformation treatment',
        'avm embolization',
        'brain avm treatment without surgery',
        'avm endovascular therapy',
        'embolization for avm',
        'avm coiling procedure',
        'avm laser and embolization',
        'spinal avm treatment',
        'minimally invasive avm therapy',
        'avm embolization cost',
        'avm brain procedure recovery',
        'congenital avm treatment',
        'avm surgery vs embolization',
        'vascular malformation embolization',
        'avm catheter treatment',
      ],
    },
    {
      name: 'Endovascular Coiling',
      path: '/endovascular-coiling',
      keywords: [
        'endovascular coiling',
        'brain aneurysm coiling treatment',
        'non-surgical aneurysm repair',
        'coiling vs surgical clipping',
        'minimally invasive aneurysm treatment',
        'cerebral aneurysm embolization',
        'brain aneurysm coiling recovery',
        'interventional neuroradiology coiling',
        'coil embolization for brain aneurysm',
        'endovascular aneurysm repair (evar)',
        'brain coil procedure success rate',
        'cost of endovascular coiling',
        'catheter-based aneurysm repair',
        'aneurysm coiling vs surgery',
        'endovascular coiling explained',
      ],
    },
    {
      name: 'Y-90 Radioembolization',
      path: '/y90-radioembolization',
      keywords: [
        'y-90 radioembolization',
        'selective internal radiation therapy (sirt)',
        'liver cancer radioembolization',
        'y-90 treatment for hepatocellular carcinoma',
        'radioembolization therapy cost',
        'minimally invasive liver tumor treatment',
        'radioactive beads liver cancer',
        'yttrium-90 radioembolization procedure',
        'interventional oncology liver therapy',
        'y-90 radiation microspheres',
        'sirt vs tace therapy',
        'y-90 liver cancer survival rate',
        'liver tumor embolization with y-90',
        'targeted radiation therapy liver',
      ],
    },
    // More treatments will be added here
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (isInteracting) return;
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 20000); // Change slide every 20 seconds

    return () => clearInterval(slideInterval);
  }, [isInteracting, totalSlides]);

  // Enhanced fuzzy keyword search function
  const performKeywordSearch = (searchQuery) => {
    const query = searchQuery.toLowerCase().trim();
    const matchedTreatments = [];

    // Simple fuzzy matching function
    const fuzzyMatch = (text, keyword) => {
      const textLower = text.toLowerCase();
      const keywordLower = keyword.toLowerCase();

      // Exact match
      if (textLower.includes(keywordLower)) return 3;

      // Partial match (at least 3 characters)
      if (keywordLower.length >= 3 && textLower.includes(keywordLower.substring(0, 3))) return 2;

      // Character similarity for typos
      let matches = 0;
      for (let char of keywordLower) {
        if (textLower.includes(char)) matches++;
      }

      // If more than 50% characters match, consider it a fuzzy match
      if (matches / keywordLower.length > 0.5 && keywordLower.length > 2) return 1;

      // Special case: check if query contains keyword or vice versa
      if (textLower.includes(keywordLower) || keywordLower.includes(textLower)) return 2;

      return 0;
    };

    treatmentSuggestions.forEach(treatment => {
      let score = 0;

      treatment.keywords.forEach(keyword => {
        score += fuzzyMatch(query, keyword);
      });

      // Also check treatment name for direct matches
      score += fuzzyMatch(query, treatment.name) * 2;

      if (score > 0) {
        matchedTreatments.push({
          ...treatment,
          score,
        });
      }
    });

    // Sort by score and return top 3
    return matchedTreatments
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(treatment => ({
        name: treatment.name,
        path: treatment.path,
      }));
  };

  // Curated search using provided keyword/symptom lists for higher precision
  const curatedSearch = (searchQuery, { strict = true } = {}) => {
    const normalize = (s = '') => s.toLowerCase().trim().replace(/\s+/g, ' ');
    const q = normalize(searchQuery);
    if (!q) return [];

    const tokens = q.split(/[^a-z0-9]+/).filter(Boolean).filter(t => t.length >= 3);

    // Simple edit distance within 1 for len>=5
    const editDistanceLe1 = (a, b) => {
      if (a === b) return true;
      if (Math.abs(a.length - b.length) > 1) return false;
      // Ensure a is shorter
      if (a.length > b.length) [a, b] = [b, a];
      let i = 0, j = 0, diffs = 0;
      while (i < a.length && j < b.length) {
        if (a[i] === b[j]) { i++; j++; continue; }
        diffs++;
        if (diffs > 1) return false;
        if (a.length === b.length) { i++; j++; }
        else { j++; }
      }
      if (j < b.length || i < a.length) diffs++;
      return diffs <= 1;
    };

    const WEIGHTS = {
      ir_procedures: 1.5,
      medical_terms: 1.3,
      symptoms: 1.2,
      lay_searches: 1.0,
    };

    const phraseMatch = (phrase) => {
      const p = normalize(phrase);
      if (!p) return 0;
      // Exact/substring match boost
      let score = 0;
      if (q.includes(p) || p.includes(q)) score += 1.5;
      // Token overlap scoring
      const ptokens = p.split(/[^a-z0-9]+/).filter(Boolean);
      let tokenScore = 0;
      for (const t of tokens) {
        for (const tk of ptokens) {
          if (tk === t || tk.startsWith(t)) { tokenScore += 1; break; }
          if (t.length >= 4 && tk.length >= 4 && editDistanceLe1(t, tk)) { tokenScore += 0.7; break; }
        }
      }
      // Normalize a bit by unique matches
      score += Math.min(tokenScore, tokens.length);
      return score;
    };

    const scoredRaw = curatedData.map(item => {
      let score = 0;
      const excludes = (item.exclude || []).map(normalize);
      // Exclusion guard: if any exclude phrase present, zero score
      for (const ex of excludes) {
        if (ex && (q.includes(ex) || ex.includes(q))) return { item, score: 0 };
      }

      const cats = item.categories || {};
      for (const [cat, list] of Object.entries(cats)) {
        const weight = WEIGHTS[cat] || 1.0;
        (list || []).forEach(phrase => {
          const pm = phraseMatch(phrase);
          if (pm > 0) score += pm * weight;
        });
      }

      // Slight boost if treatment name is partially in query
      if (item.name && phraseMatch(item.name) > 0) score += 1.5;

      // Apply item weight multiplier
      const multiplier = typeof item.weight === 'number' ? item.weight : 1.0;
      score *= multiplier;
      return { item, score };
    }).filter(s => s.score > 0);

    // If query contains a specific anchor, prefer items that mention that anchor
    const ANCHORS = ['breast','thyroid','prostate','uterus','uterine','knee','varicose','varicocele','fallopian','tube','tubes','shoulder','plantar','fasciitis','diabetic','foot'];
    const anchorHit = tokens.find(t => ANCHORS.includes(t));

    let scored = scoredRaw;
    if (anchorHit) {
      const containsAnchor = (text) => (text || '').toLowerCase().includes(anchorHit);
      const itemHasAnchor = (it) => {
        if (containsAnchor(it.name)) return true;
        const cats = it.categories || {};
        for (const list of Object.values(cats)) {
          if ((list || []).some(phrase => containsAnchor(phrase))) return true;
        }
        return false;
      };
      const filtered = scoredRaw.filter(s => itemHasAnchor(s.item));
      if (filtered.length > 0) {
        scored = filtered;
      }
    }

    scored = scored.sort((a, b) => b.score - a.score);

    if (scored.length === 0) return [];

    // Decision: strict means only return the single most accurate if over threshold and margin
    const THRESHOLD = 3.0;
    const MARGIN = 1.0;
    const top = scored[0];
    const second = scored[1];

    if (!strict) {
      // return up to 3 items regardless of threshold (for generic queries)
      return scored.slice(0, 3).map(({ item }) => ({ name: item.name, path: item.path }));
    }

    if (top.score >= THRESHOLD && (!second || top.score - second.score >= MARGIN)) {
      return [{ name: top.item.name, path: top.item.path }];
    }

    return [];
  };

  // Live suggestions on keypress (debounced)
  useEffect(() => {
    const q = (deferredQuery || '').trim();
    // Clearing state for empty query is handled in the other effect
    if (!q) return;

    // 150ms for desktop (precise pointer), 200ms for mobile/touch
    const isFinePointer = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    const debounceMs = isFinePointer ? 150 : 200;

    const handler = setTimeout(() => {
      // Determine if query is generic and lacks specific organ/treatment anchors
      const qn = q.toLowerCase();
      const tokens = qn.split(/[^a-z0-9]+/).filter(Boolean);
      const GENERIC_TERMS = new Set(['pain', 'swelling', 'lump', 'veins', 'urine', 'bleeding', 'infertility', 'pregnancy', 'problem', 'treatment']);
      const SPECIFIC_TERMS = new Set(['breast','thyroid','prostate','uterus','uterine','knee','varicose','varicocele','fallopian','tube','tubes','shoulder','plantar','fasciitis','diabetic','foot','vein','pae','ufe','gae','ftr','rfa','turp']);
      const hasGeneric = tokens.some(t => GENERIC_TERMS.has(t));
      const hasSpecific = tokens.some(t => SPECIFIC_TERMS.has(t));

      // Use non-strict only if generic AND no specific anchors
      const curated = curatedSearch(q, { strict: !(hasGeneric && !hasSpecific) });
      if (curated.length > 0) {
        startTransition(() => setResults(curated));
        return;
      }
      const keywordResults = performKeywordSearch(q);
      startTransition(() => setResults(keywordResults));
      // Keep isLoading for submit/AI only to avoid flicker while typing
    }, debounceMs); // small debounce for better UX (150ms desktop, 200ms mobile)

    return () => clearTimeout(handler);
  }, [deferredQuery]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    setResults([]);

    try {
      const qn = query.toLowerCase().trim();
      const GENERIC_TERMS = new Set(['pain', 'swelling', 'lump', 'veins', 'urine', 'bleeding', 'infertility', 'pregnancy', 'problem', 'treatment']);
      const isGeneric = qn.split(/[^a-z0-9]+/).filter(Boolean).some(t => GENERIC_TERMS.has(t));

      const curated = curatedSearch(query, { strict: !isGeneric });
      if (curated.length > 0) {
        console.log('Curated Results:', curated);
        setResults(curated);
        return;
      }

      // If curated has nothing, use fast local fuzzy keyword search
      const keywordResults = performKeywordSearch(query);
      console.log('Quick Keyword Results:', keywordResults);
      startTransition(() => setResults(keywordResults));
    } catch (error) {
      console.error('Error fetching search results:', error);
      const keywordResults = performKeywordSearch(query);
      console.log('Fallback Keyword Results:', keywordResults);
      startTransition(() => setResults(keywordResults));
    } finally {
      setIsLoading(false);
    }
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const handleSearchInputFocus = () => {
    setIsInteracting(true);
  };

  const handleSearchInputBlur = () => {
    setIsInteracting(false);
  };

  return (
    <>
      {/* Mobile Hero Section - Visible only on mobile */}
      <div className='md:hidden'>
        <MobileHeroSection
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          results={results}
          isLoading={isLoading}
        />
      </div>

      {/* Desktop Carousel - Hidden on mobile, visible on md and up */}
      <div className='hidden md:block relative w-full overflow-hidden'>
        {/* Top-center floating CTA (visible across all slides) */}
        <FloatingBadgeCTA
          imgSrc='/irpreneur.png'
          alt='IR preneur 2025'
          href='https://medagghealthcare.com/IRPreneur-conference/index.php#home'
          size={120}
          mobileSize={120}
          topOffset={24}
          align='left'
          leftOffset={24}
          zIndex={40}
          showOnMobile={false}
        />
        {/* Carousel Container */}
        <div
          className='flex transition-transform duration-1000 ease-in-out'
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* Slide 1: Original Hero */}
          <div className='w-full flex-shrink-0'>
            <OriginalHeroSlide
              query={query}
              setQuery={setQuery}
              handleSearch={handleSearch}
              results={results}
              isLoading={isLoading}
              onSearchFocus={handleSearchInputFocus}
              onSearchBlur={handleSearchInputBlur}
            />
          </div>

          {/* Slide 2: New Hero Crossel */}
          <div className='w-full flex-shrink-0'>
            <MemoHeroCrossel
              query={query}
              setQuery={setQuery}
              handleSearch={handleSearch}
              results={results}
              isLoading={isLoading}
              onSearchFocus={handleSearchInputFocus}
              onSearchBlur={handleSearchInputBlur}
            />
          </div>

          {/* Slide 3: Map Hero Crossel */}
          <div className='w-full flex-shrink-0'>
            <MemoHeroCrosselMap
              query={query}
              setQuery={setQuery}
              handleSearch={handleSearch}
              results={results}
              isLoading={isLoading}
              onSearchFocus={handleSearchInputFocus}
              onSearchBlur={handleSearchInputBlur}
            />
          </div>
        </div>

        {/* Carousel Navigation Dots */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20'>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={() => goToSlide((currentSlide - 1 + totalSlides) % totalSlides)}
          className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-20'
          aria-label='Previous slide'
        >
          <svg width='20' height='20' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
            <path d='M15 18l-6-6 6-6'/>
          </svg>
        </button>

        <button
          onClick={() => goToSlide((currentSlide + 1) % totalSlides)}
          className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-20'
          aria-label='Next slide'
        >
          <svg width='20' height='20' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
            <path d='M9 18l6-6-6-6'/>
          </svg>
        </button>
      </div>
    </>
  );
};

export default HeroSection;
