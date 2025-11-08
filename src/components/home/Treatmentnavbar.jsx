import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const treatments = [
  { title: 'Enlarged Prostate', path: '/pae', subTreatments: [{ title: 'Prostate Artery Embolization', path: '/pae' }] },
  { title: 'Knee Pain', path: '/gae', subTreatments: [{ title: 'Genicular Artery Embolization', path: '/gae' }] },
  { title: 'Thyroid Nodule', path: '/thyroid', subTreatments: [{ title: 'Thyroid Nodule Ablation', path: '/thyroid' }] },
  { title: 'Varicocele', path: '/varicocele-embolization', subTreatments: [{ title: 'Varicocele Embolization', path: '/varicocele-embolization' }] },
  { title: 'Fallopian Tube Block', path: '/fte', subTreatments: [{ title: 'Fallopian Tube Recanalization', path: '/fte' }] },
  { title: 'Uterine Fibroids', path: '/uae', subTreatments: [{ title: 'Uterine Artery Embolization', path: '/uae' }] },
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

    ]
  },
 // { title: 'Plantar Fascial Embolization', path: '/pfe' },
 // { title: 'Varicose Veins', path: '/varicose-vein' },
  { title: 'Plantar Fascitis', path: '/pfe', subTreatments: [{ title: 'Plantar Fascitis Embolization', path: '/pfe' }] },
  { title: 'Varicose Veins', path: '/varicose-vein', subTreatments: [{ title: 'Endovenous Ablation', path: '/varicose-vein' }] },
  
  
 
 
];

const DropdownMenu = ({ items }) => {
  return (
    <ul className='absolute left-0 top-full mt-0 bg-white border border-gray-200 shadow-lg rounded-b-md z-50' style={{ minWidth: '280px', width: 'max-content' }}>
      {items.map((item, index) => (
        <li key={index} className='relative group/submenu'>
          <Link to={item.path || '#'} className='flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
            <span className='pr-2'>{item.title}</span>
            {item.subTreatments && <span className='text-xs ml-2 flex-shrink-0'>►</span>}
          </Link>
          {item.subTreatments && (
            <div className='absolute left-full top-0 mt-0 hidden group-hover/submenu:block'>
              <DropdownMenu items={item.subTreatments} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

// Fixed-position root dropdown so it is always visible over hero without scrolling
const FixedDropdown = ({ isOpen, position, items, onMouseEnter, onMouseLeave }) => {
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
              <div className='absolute left-full top-0 mt-0 hidden group-hover/submenu:block'>
                <DropdownMenu items={item.subTreatments} />
              </div>
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
  const fixedHoverRef = useRef(false);

  // Ensure hovered item + its submenu are fully visible without manual scrolling
  const handleMouseEnter = (idx, targetEl) => {
    setOpenIndex(idx);
    const container = scrollContainerRef.current;
    if (!targetEl || !container) return;

    // Geometry
    const itemLeft = targetEl.offsetLeft; // position within the scroll container
    const itemWidth = targetEl.offsetWidth;
    const containerWidth = container.clientWidth;
    const currentScroll = container.scrollLeft;

    // Assume submenu minimum width (matches DropdownMenu minWidth ~280 + padding)
    const submenuWidth = 320; // px
    const padding = 16; // viewport breathing room

    // We want: keep the hovered item label visible (>=8px from left), and try to fit submenu within right edge
    let desired = currentScroll;
    const visibleLeft = (scroll) => scroll + 0;
    const visibleRight = (scroll) => scroll + containerWidth - padding;

    // If submenu overflows right edge, shift left so submenu fits
    if (itemLeft + submenuWidth > visibleRight(desired)) {
      desired = itemLeft + submenuWidth - (containerWidth - padding);
    }
    // Special case: for the very first tab, never scroll right; keep start fully visible
    if (idx === 0) {
      desired = 0;
      try { setShowLeftArrow(false); } catch (e) { /* no-op */ }
    }
    // Never push scroll so far that the hovered item's label gets cropped on the left
    // Keep at least 8px of space from the left edge to the start of the hovered item
    const maxAllowedScroll = Math.max(0, itemLeft - 8);
    desired = Math.min(desired, maxAllowedScroll);

    // Clamp within allowed scroll range
    const maxScroll = container.scrollWidth - containerWidth;
    if (desired < 0) desired = 0;
    if (desired > maxScroll) desired = maxScroll;

    // Instant correction so user never needs to scroll manually
    container.scrollTo({ left: desired, behavior: 'auto' });
    // Ensure arrow visibility reflects the new scroll position immediately
    try { checkArrows(); } catch (e) { /* no-op */ }

    // If this item has a submenu, open fixed dropdown positioned under the tab
    const hasSubmenu = !!treatments[idx]?.subTreatments;
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

      setFixedItems(treatments[idx].subTreatments);
      setFixedPos({ left, top });
      setFixedOpen(true);
    } else {
      setFixedOpen(false);
    }
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

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <nav className='sticky top-[84px] lg:top-[92px] z-40 w-full bg-white border-b border-gray-200 shadow-xl shadow-black/15 ring-1 ring-black/5'>
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
          className='w-full overflow-x-auto overflow-y-visible scrollbar-hide pb-2 pl-4 pr-4'
        >
            <ul className='flex items-center justify-start whitespace-nowrap py-2'>
              {/* Small left spacer to keep first item clear of edge */}
              <li className='w-6 sm:w-8 flex-shrink-0 pointer-events-none' aria-hidden='true' />
              {treatments.map((treatment, idx) => (
                <li
                  key={idx}
                  className='relative group/main flex items-center first:ml-0 last:mr-2'
                  onMouseEnter={(e) => handleMouseEnter(idx, e.currentTarget)}
                  onMouseMove={(e) => openIndex === idx && handleMouseEnter(idx, e.currentTarget)}
                  onFocus={(e) => handleMouseEnter(idx, e.currentTarget)}
                  onMouseLeave={() => {
                    setOpenIndex(null);
                    if (!fixedHoverRef.current) setFixedOpen(false);
                  }}
                >
                  <Link to={treatment.path || '#'} className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors duration-200 ${openIndex === idx ? 'bg-[#ff3576] text-white' : 'text-gray-700 hover:text-[#ff3576]'}`}>
                    <span>{treatment.title}</span>
                    {treatment.subTreatments && <span className='text-xs'>▼</span>}
                  </Link>

                  {openIndex === idx && treatment.subTreatments && (
                    <div className='hidden group-hover/main:block'>
                      <DropdownMenu items={treatment.subTreatments} />
                    </div>
                  )}
                  {idx < treatments.length - 1 && (
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
            className='absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full shadow-md p-2 z-30 border border-gray-200'
          >
            <ChevronRight className='h-4 w-4 text-gray-700' />
          </button>
        )}
      </div>
      {/* Fixed-position root dropdown */}
      <FixedDropdown
        isOpen={fixedOpen}
        position={fixedPos}
        items={fixedItems}
        onMouseEnter={() => { fixedHoverRef.current = true; }}
        onMouseLeave={() => { fixedHoverRef.current = false; setFixedOpen(false); }}
      />
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </nav>
  );
}
