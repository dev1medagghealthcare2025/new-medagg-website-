import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Groq from 'groq-sdk';
import Hero_crossel from './Hero_crossel';
import HeroCrosselMap from './Hero_crossel_map';
import SharedSearchBar from './SharedSearchBar';
import MobileHeroSection from './MobileHeroSection';
import FloatingBadgeCTA from './FloatingBadgeCTA';

const OriginalHeroSlide = ({ query, setQuery, handleSearch, results, isLoading }) => (
  <section
    className='relative w-full min-h-screen bg-cover bg-center rounded-none overflow-hidden flex items-center'
    style={{
      backgroundImage: 'url(\'/Herosection%20background.jpg\')',
    }}
  >
    {/* Overlay - Adjusted gradient to cover more area */}
    <div className='absolute inset-0 bg-gradient-to-br from-[#1a1446] via-[#2d2552] to-[#e1006a] opacity-90 z-0' />

    {/* Doctor Image - Hidden on mobile, visible from md screens up */}
    <div className='block md:absolute md:right-0 lg:right-0 md:translate-x-1 lg:translate-x-2 2xl:translate-x-3 bottom-0 z-10 w-full md:w-[520px] lg:w-[640px] xl:w-[760px] 2xl:w-[860px] md:max-h-[85vh] mt-8 md:mt-0'>
      <img
        src='/main_home_new.png'
        alt='Doctor'
        className='w-3/4 sm:w-1/2 md:w-full h-auto md:h-full object-contain mx-auto'
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
  const totalSlides = 3;

  // Data structure for treatment suggestions
  const treatmentSuggestions = [
    {
      name: 'Prostate Artery Embolization (PAE)',
      path: '/pae',
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
      path: '/gae',
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
      path: '/fte',
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
      path: '/thyroid',
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
      path: '/uae',
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
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 20000); // Change slide every 20 seconds

    return () => clearInterval(slideInterval);
  }, [totalSlides]);

  const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY, dangerouslyAllowBrowser: true });

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
          score
        });
      }
    });

    // Sort by score and return top 3
    return matchedTreatments
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(treatment => ({
        name: treatment.name,
        path: treatment.path
      }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    setResults([]);

    // Try AI search first for better understanding of user intent
    const systemPrompt = `
      You are an intelligent medical search assistant for a healthcare provider specializing in interventional radiology. 
      
      CRITICAL: You must handle ALL types of typos, misspellings, abbreviations, and variations in user input including:
      
      COMMON MEDICAL TYPOS & VARIATIONS:
      - Knee: "nee", "knee", "kne", "knea", "knee pain", "joint pain"
      - Prostate: "prostat", "prostrate", "prostate", "BPH", "enlarged prostate"
      - Thyroid: "thyriod", "thyroid", "thyroids", "neck lump", "goiter"
      - Breast: "brest", "breast", "chest", "breast lump", "breast mass"
      - Heart: "hart", "heart", "cardiac", "chest pain", "valve"
      - Vein: "vien", "vein", "veins", "leg veins", "varicose"
      - Artery: "artery", "arteries", "blood vessel"
      - Pain: "pian", "pain", "ache", "hurt", "discomfort"
      - Nodule: "noduel", "nodule", "lump", "mass", "growth"
      - Embolization: "embolisation", "embolization", "blocking"
      
      SYMPTOM VARIATIONS:
      - Urination issues: "pee problems", "bathroom issues", "weak stream"
      - Swelling: "swolen", "swelling", "inflammation", "enlarged"
      - Difficulty: "dificulty", "difficulty", "trouble", "hard to"
      - Treatment: "treatmnt", "treatment", "therapy", "procedure"
      
      Your goal is to understand ANY medical query with spelling mistakes and suggest relevant treatments.

      Available treatments and their paths:
      ${treatmentSuggestions.map(t => `- ${t.name}: ${t.path}`).join('\n')}

      Based on the user's query, provide up to 3 relevant treatment pages. Format: {"results": [{"name": "Treatment Name", "path": "/path"}]}
      If no treatments match, return: {"results": []}
    `;

    try {
      // First try fallback search immediately for faster results
      const keywordResults = performKeywordSearch(query);
      if (keywordResults.length > 0) {
        console.log('Quick Keyword Results:', keywordResults);
        setResults(keywordResults);
        setIsLoading(false);
        return;
      }

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: query,
          },
        ],
        model: 'llama-3.1-8b-instant',
        temperature: 0.3,
        max_tokens: 512,
        top_p: 1,
        stream: false,
        response_format: { type: 'json_object' },
      });

      const responseContent = chatCompletion.choices[0]?.message?.content;
      if (responseContent) {
        try {
          const parsedResults = JSON.parse(responseContent);
          console.log('AI Results:', parsedResults);
          const aiResults = parsedResults.results || [];
          
          if (aiResults.length > 0) {
            setResults(aiResults);
          } else {
            // Fallback to fuzzy keyword search if AI finds nothing
            const keywordResults = performKeywordSearch(query);
            console.log('Fallback Keyword Results:', keywordResults);
            setResults(keywordResults);
          }
        } catch (parseError) {
          console.error('JSON Parse Error:', parseError);
          // Fallback to fuzzy keyword search
          const keywordResults = performKeywordSearch(query);
          console.log('Fallback Keyword Results:', keywordResults);
          setResults(keywordResults);
        }
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      // Fallback to fuzzy keyword search
      const keywordResults = performKeywordSearch(query);
      console.log('Fallback Keyword Results:', keywordResults);
      setResults(keywordResults);
    } finally {
      setIsLoading(false);
    }
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <>
      {/* Mobile Hero Section - Visible only on mobile */}
      <div className="md:hidden">
        <MobileHeroSection />
      </div>

      {/* Desktop Carousel - Hidden on mobile, visible on md and up */}
      <div className="hidden md:block relative w-full overflow-hidden">
        {/* Top-center floating CTA (visible across all slides) */}
        <FloatingBadgeCTA 
          imgSrc="/irpreneur.png" 
          alt="IR preneur 2025"
          href="https://medagghealthcare.com/IRPreneur-conference/"
          size={120}
          mobileSize={120}
          topOffset={24}
          offsetX={116}
          zIndex={40}
          showOnMobile={false}
        />
        {/* Carousel Container */}
        <div 
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* Slide 1: Original Hero */}
          <div className="w-full flex-shrink-0">
            <OriginalHeroSlide 
              query={query}
              setQuery={setQuery}
              handleSearch={handleSearch}
              results={results}
              isLoading={isLoading}
            />
          </div>
          
          {/* Slide 2: New Hero Crossel */}
          <div className="w-full flex-shrink-0">
            <Hero_crossel 
              query={query}
              setQuery={setQuery}
              handleSearch={handleSearch}
              results={results}
              isLoading={isLoading}
            />
          </div>

          {/* Slide 3: Map Hero Crossel */}
          <div className="w-full flex-shrink-0">
            <HeroCrosselMap 
              query={query}
              setQuery={setQuery}
              handleSearch={handleSearch}
              results={results}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Carousel Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
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
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-20"
          aria-label="Previous slide"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        
        <button
          onClick={() => goToSlide((currentSlide + 1) % totalSlides)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-20"
          aria-label="Next slide"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </>
  );
};

export default HeroSection;
