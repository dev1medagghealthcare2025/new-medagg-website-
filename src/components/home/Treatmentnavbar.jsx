import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const treatments = [
  { title: 'Enlarged Prostate', path: '/prostate-artery-embolization-pae', subTreatments: [{ title: 'Prostate Artery Embolization', path: '/prostate-artery-embolization-pae' }] },
  { title: 'Knee Pain', path: '/genicular-artery-embolization-gae', subTreatments: [{ title: 'Genicular Artery Embolization', path: '/genicular-artery-embolization-gae' }] },
  { title: 'Thyroid Nodule', path: '/thyroid-nodule-ablation', subTreatments: [{ title: 'Thyroid Nodule Ablation', path: '/thyroid-nodule-ablation' }] },
  { title: 'Varicocele', path: '/varicocele-embolization', subTreatments: [{ title: 'Varicocele Embolization', path: '/varicocele-embolization' }] },
  { title: 'Fallopian Tube Block', path: '/fallopian-tube-recanalization-ftr', subTreatments: [{ title: 'Fallopian Tube Recanalization', path: '/fallopian-tube-recanalization-ftr' }] },
  { title: 'Uterine Fibroids', path: '/uterine-artery-embolization-uae', subTreatments: [{ title: 'Uterine Artery Embolization', path: '/uterine-artery-embolization-uae' }] },
  {
    title: 'Interventional',
    subTreatments: [
      {
        title: 'Interventional Neurology',
        subTreatments: [
          { title: 'Endovascular Coiling', path: '/endovascular-coiling' },
          { title: 'RFA Treatment For AVM', path: '/radiofrequency-ablation-for-avm' },
        ],
      },
      {
        title: 'Interventional Cardiology',
        subTreatments: [
          { title: 'Transcatheter Aortic Valve Implantation', path: '/transcatheter-aortic-valve-replacement' },
          { title: 'Chronic Total Occlusion', path: '/cto' },
          { title: 'Radiofrequency Ablation For Arrhythmia', path: '/rfa' },
        ],
      },
    ],
  },
  {
    title: 'Breast Nodules',
    subTreatments: [
        { title: 'Breast Nodule VAE', path: '/breast-nodule-vae' },
        { title: 'Breast Nodule Cryoablation', path: '/breast-nodule-cryoablation' },
        { title: 'Breast Nodule Radiofrequency Ablation', path: '/breast-nodule-rfa' },

    ],
  },
 // { title: 'Plantar Fascial Embolization', path: '/pfe' },
 // { title: 'Varicose Veins', path: '/varicose-vein' },
  { title: 'Plantar Fascitis', path: '/plantar-fascial-embolization', subTreatments: [{ title: 'Plantar Fascitis Embolization', path: '/plantar-fascial-embolization' }] },
  { title: 'Varicose Veins', path: '/varicose-vein', subTreatments: [{ title: 'Endovenous Ablation', path: '/varicose-vein' }] },

  // New: Endovascular Recanalization & Stenting - Diabetic Foot
  { title: 'Diabetic Foot', path: '/diabetic-foot', subTreatments: [
    { title: 'Endovascular Recanalization & Stenting', path: '/diabetic-foot' }
  ] },

  // New: Adhesive Capsulitis Embolization - Frozen Shoulder
  { title: 'Frozen Shoulder', path: '/frozen-shoulder', subTreatments: [
    { title: 'Adhesive Capsulitis Embolization', path: '/frozen-shoulder' }
  ] },

];

const DropdownMenu = ({ items, stackSubBelow = false, depth = 0 }) => {
  return (
    <ul className='absolute left-0 top-full mt-0 bg-white border border-gray-200 shadow-lg rounded-b-md z-50' style={{ minWidth: '280px', width: 'max-content' }}>
      {items.map((item, index) => (
        <li key={index} className='relative group/submenu'>
          <Link to={item.path || '#'} className='flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
            <span className='pr-2'>{item.title}</span>
            {item.subTreatments && <span className='text-xs ml-2 flex-shrink-0'>►</span>}
          </Link>
          {item.subTreatments && (
            stackSubBelow && depth === 0 ? (
              <div className='hidden group-hover/submenu:block'>
                <ul className='pl-4 pr-2 py-2'>
                  {item.subTreatments.map((sub, subIdx) => (
                    <li key={subIdx} className='relative'>
                      <Link to={sub.path || '#'} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded'>
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className='absolute left-full top-0 mt-0 hidden group-hover/submenu:block'>
                <DropdownMenu items={item.subTreatments} stackSubBelow={stackSubBelow} depth={depth + 1} />
              </div>
            )
          )}
        </li>
      ))}
    </ul>
  );
};

// Fixed-position root dropdown so it is always visible over hero without scrolling
const FixedDropdown = ({ isOpen, position, items, onMouseEnter, onMouseLeave, stackSubBelow = false }) => {
  if (!isOpen || !items?.length) return null;
  const { left, top } = position || { left: 0, top: 0 };
  return (
    <div
      className='fixed z-50'
      style={{ left, top }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ul className='relative bg-white border border-gray-200 shadow-lg rounded-b-md' style={{ minWidth: '280px', width: 'max-content' }}>
        {items.map((item, index) => (
          <li key={index} className='relative group/submenu'>
            <Link to={item.path || '#'} className='flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
              <span className='pr-2'>{item.title}</span>
              {item.subTreatments && <span className='text-xs ml-2 flex-shrink-0'>►</span>}
            </Link>
            {item.subTreatments && (
              stackSubBelow ? (
                <div className='hidden group-hover/submenu:block'>
                  <ul className='pl-4 pr-2 py-2'>
                    {item.subTreatments.map((sub, subIdx) => (
                      <li key={subIdx} className='relative'>
                        <Link to={sub.path || '#'} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded'>
                          {sub.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className='absolute left-full top-0 mt-0 hidden group-hover/submenu:block'>
                  <DropdownMenu items={item.subTreatments} />
                </div>
              )
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Treatmentnavbar() {
  const [openIndex, setOpenIndex] = useState(null);
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [fixedOpen, setFixedOpen] = useState(false);
  const [fixedItems, setFixedItems] = useState([]);
  const [fixedPos, setFixedPos] = useState({ left: 0, top: 0 });
  const [fixedStackBelow, setFixedStackBelow] = useState(false);
  const fixedHoverRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpenIndex, setMobileOpenIndex] = useState(null); // top-level tab index
  const [mobileOpenSubIndex, setMobileOpenSubIndex] = useState(null); // sub item index within dropdown

  // Ensure 'Interventional' appears last without mutating original data
  const orderedTreatments = useMemo(() => {
    const arr = [...treatments];
    const idx = arr.findIndex(t => t.title === 'Interventional');
    if (idx !== -1) {
      const [it] = arr.splice(idx, 1);
      arr.push(it);
    }
    return arr;
  }, []);

  // Ensure hovered item + its submenu are fully visible without manual scrolling
  const handleMouseEnter = (idx, targetEl, doScroll = true) => {
    if (isMobile) return; // no hover logic on mobile
    setOpenIndex(idx);
    const container = scrollContainerRef.current;
    if (!targetEl || !container) return;

    // Geometry
    const itemLeft = targetEl.offsetLeft; // position within the scroll container
    const itemWidth = targetEl.offsetWidth;
    const containerWidth = container.clientWidth;
    const currentScroll = container.scrollLeft;

    if (doScroll) {
      // Keep only the hovered tab visible (do NOT auto-scroll to fit submenu width)
      const padding = 12;
      let desired = currentScroll;
      const visibleLeft = currentScroll + padding;
      const visibleRight = currentScroll + containerWidth - padding;

      if (itemLeft < visibleLeft) {
        desired = Math.max(0, itemLeft - padding);
      } else if (itemLeft + itemWidth > visibleRight) {
        desired = Math.max(0, itemLeft + itemWidth - (containerWidth - padding));
      }

      // Clamp within allowed scroll range
      const maxScroll = container.scrollWidth - containerWidth;
      if (desired < 0) desired = 0;
      if (desired > maxScroll) desired = maxScroll;

      // Only scroll if needed; smooth to avoid sudden jumps
      if (desired !== currentScroll) {
        container.scrollTo({ left: desired, behavior: 'smooth' });
      }
    }
    // Ensure arrow visibility reflects the new scroll position immediately
    try { checkArrows(); } catch (e) { /* no-op */ }

    // If this item has a submenu, open fixed dropdown positioned under the tab
    const hasSubmenu = !!orderedTreatments[idx]?.subTreatments;
    if (hasSubmenu) {
      const rect = targetEl.getBoundingClientRect();
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      const dropdownWidth = 360; // estimated width, will still be max-content

      // Compute left so dropdown fits within viewport, with min margin of 8px
      let left = rect.left;
      if (left + dropdownWidth > viewportWidth - 8) {
        left = Math.max(8, viewportWidth - dropdownWidth - 8);
      }
      // Clamp left to at least 8px so it doesn't hug the edge
      left = Math.max(8, left);

      const top = rect.bottom; // directly below the tab

      setFixedItems(orderedTreatments[idx].subTreatments);
      // Enable stack-below layout only for Interventional root
      const isInterventional = orderedTreatments[idx]?.title === 'Interventional';
      setFixedStackBelow(!!isInterventional);
      setFixedPos({ left, top });
      setFixedOpen(true);
    } else {
      setFixedOpen(false);
    }
  };

  // Mobile handlers
  const handleMobileTabClick = (idx) => {
    setMobileOpenSubIndex(null);
    setMobileOpenIndex(prev => (prev === idx ? null : idx));
  };

  const handleMobileSubToggle = (subIdx) => {
    setMobileOpenSubIndex(prev => (prev === subIdx ? null : subIdx));
  };

  const checkArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollWidth > clientWidth && scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      // Ensure we start from the very left so the first item isn't cropped
      try { scrollContainer.scrollLeft = 0; } catch (e) { /* no-op */ }
      const timer = setTimeout(() => {
        checkArrows();
      }, 100);

      scrollContainer.addEventListener('scroll', checkArrows);
      window.addEventListener('resize', checkArrows);

      return () => {
        clearTimeout(timer);
        scrollContainer.removeEventListener('scroll', checkArrows);
        window.removeEventListener('resize', checkArrows);
      };
    }
  }, []);

  // Detect mobile viewport once and on resize
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener?.('change', apply);
    window.addEventListener('orientationchange', apply);
    return () => {
      mq.removeEventListener?.('change', apply);
      window.removeEventListener('orientationchange', apply);
    };
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      if (!isMobile) {
        setOpenIndex(null);
        setFixedOpen(false);
        fixedHoverRef.current = false;
      }
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <nav className='sticky top-[72px] lg:top-[80px] z-40 w-full bg-white border-b border-gray-200 shadow-xl shadow-black/15 ring-1 ring-black/5'>
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className='absolute left-0 -translate-x-full top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full shadow-md p-2 z-30 border border-gray-200'
          >
            <ChevronLeft className='h-4 w-4 text-gray-700' />
          </button>
        )}
        <div
          ref={scrollContainerRef}
          className='w-full overflow-x-auto overflow-y-visible scrollbar-hide pb-2 pl-4 pr-12'
        >
            <ul className='flex items-center justify-start whitespace-nowrap py-2'>
              {/* Small left spacer to keep first item clear of edge */}
              <li className='w-6 sm:w-8 flex-shrink-0 pointer-events-none' aria-hidden='true' />
              {orderedTreatments.map((treatment, idx) => (
                <li
                  key={idx}
                  className='relative group/main flex items-center first:ml-0 last:mr-2'
                  onMouseEnter={(e) => handleMouseEnter(idx, e.currentTarget, false)}
                  onFocus={(e) => handleMouseEnter(idx, e.currentTarget, true)}
                  onMouseLeave={() => {
                    if (isMobile) return;
                    setOpenIndex(null);
                    if (!fixedHoverRef.current) setFixedOpen(false);
                  }}
                >
                  {isMobile ? (
                    <button
                      type='button'
                      aria-expanded={mobileOpenIndex === idx}
                      onClick={() => handleMobileTabClick(idx)}
                      className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors duration-200 ${mobileOpenIndex === idx ? 'bg-[#ff3576] text-white' : 'text-gray-700'} `}
                    >
                      <span>{treatment.title}</span>
                      {treatment.subTreatments && <span className='text-xs'>{mobileOpenIndex === idx ? '▲' : '▼'}</span>}
                    </button>
                  ) : (
                    <Link to={treatment.path || '#'} className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors duration-200 ${openIndex === idx ? 'bg-[#ff3576] text-white' : 'text-gray-700 hover:text-[#ff3576]'}`}>
                      <span>{treatment.title}</span>
                      {treatment.subTreatments && <span className='text-xs'>▼</span>}
                    </Link>
                  )}
                  {idx < orderedTreatments.length - 1 && (
                    <span className='text-gray-300'>|</span>
                  )}
                </li>
              ))}
              {/* Small right spacer to keep last item clear of edge */}
              <li className='w-6 sm:w-8 flex-shrink-0 pointer-events-none' aria-hidden='true' />
            </ul>
        </div>
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className='absolute right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full shadow-md p-2 z-30 border border-gray-200'
          >
            <ChevronRight className='h-4 w-4 text-gray-700' />
          </button>
        )}
      </div>
      {/* Fixed-position root dropdown (desktop only) */}
      {!isMobile && (
        <FixedDropdown
          isOpen={fixedOpen}
          position={fixedPos}
          items={fixedItems}
          stackSubBelow={fixedStackBelow}
          onMouseEnter={() => { fixedHoverRef.current = true; }}
          onMouseLeave={() => { fixedHoverRef.current = false; setFixedOpen(false); }}
        />
      )}

      {/* Mobile dropdown panel */}
      {isMobile && mobileOpenIndex !== null && (
        <div className='bg-white border-t border-gray-200 shadow-inner'>
          <div className='max-w-7xl mx-auto px-4 py-2'>
            {(orderedTreatments[mobileOpenIndex]?.subTreatments || []).map((item, i) => (
              <div key={i} className='border-b last:border-b-0 border-gray-100'>
                {item.subTreatments ? (
                  <>
                    <button
                      type='button'
                      className='w-full flex items-center justify-between text-left px-2 py-3 text-sm text-gray-800'
                      aria-expanded={mobileOpenSubIndex === i}
                      onClick={() => handleMobileSubToggle(i)}
                    >
                      <span>{item.title}</span>
                      <span className='text-xs ml-2'>{mobileOpenSubIndex === i ? '▲' : '▼'}</span>
                    </button>
                    {mobileOpenSubIndex === i && (
                      <ul className='pl-4 pb-2'>
                        {item.subTreatments.map((sub, si) => (
                          <li key={si}>
                            <Link to={sub.path || '#'} className='block px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded'>
                              {sub.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link to={item.path || '#'} className='w-full flex items-center justify-between text-left px-2 py-3 text-sm text-gray-800 hover:bg-gray-50 rounded'>
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </nav>
  );
}
