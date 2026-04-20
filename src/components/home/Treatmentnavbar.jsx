import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

 const treatments = [
  { title: 'Enlarged Prostate', path: '/prostate-artery-embolization-pae', subTreatments: [{ title: 'Prostate Artery Embolization', path: '/prostate-artery-embolization-pae' }] },
  { title: 'Knee Pain', path: '/genicular-artery-embolization-gae', subTreatments: [{ title: 'Genicular Artery Embolization', path: '/genicular-artery-embolization-gae' }] },
  { title: 'Thyroid Nodule', path: '/thyroid-nodule-ablation', subTreatments: [{ title: 'Thyroid Nodule Ablation', path: '/thyroid-nodule-ablation' }] },
  { title: 'Varicocele', path: '/varicocele-embolization', subTreatments: [{ title: 'Varicocele Embolization', path: '/varicocele-embolization' }] },
  { title: 'Fallopian Tube Block', path: '/fallopian-tube-recanalization-ftr', subTreatments: [{ title: 'Fallopian Tube Recanalization', path: '/fallopian-tube-recanalization-ftr' }] },
  { title: 'Uterine Fibroids', path: '/uterine-artery-embolization-uae', subTreatments: [{ title: 'Uterine Artery Embolization', path: '/uterine-artery-embolization-uae' }] },
  { title: 'Hemorrhoids/Piles', path: '/piles-hemorrhoids', subTreatments: [{ title: 'Piles Artery Embolization', path: '/piles-hemorrhoids' }] },
  {
    title: 'Y-90 Radioembolization',
    path: '/y90-radioembolization-tare',
    subTreatments: [
      { title: 'TARE', path: '/y90-radioembolization-tare' },
      { title: 'Transarterial Chemoembolization (TACE)', path: '/transarterial-chemoembolization-tace' },
    ],
  },
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
  if (!isOpen || !items || !items.length) return null;
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

const TreatmentsMegaMenu = ({ isOpen, position, columns, onMouseEnter, onMouseLeave }) => {
  if (!isOpen) return null;
  const { left, top } = position || { left: 0, top: 0 };
  return (
    <div
      className='fixed z-50'
      style={{ left, top }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className='bg-white border border-gray-200 shadow-xl rounded-b-md ring-1 ring-black/5 overflow-hidden'>
        <div className='grid grid-cols-5 gap-10 px-10 py-8' style={{ minWidth: '1040px' }}>
          {columns.map((col, colIdx) => (
            <div key={colIdx} className='min-w-0'>
              {col.sections.map((section) => (
                <div key={section.title} className='mb-6 last:mb-0'>
                  <div className='text-[12px] font-bold text-gray-900 mb-3'>{section.title}</div>
                  <ul className='space-y-3'>
                    {section.items.map((item) => (
                      <li key={item.title}>
                        <Link to={item.path || '#'} className='flex items-center gap-3 text-[13px] text-gray-700 hover:text-pink-600'>
                          <span className='w-9 h-9 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-[11px] font-semibold text-gray-600 shrink-0'>
                            {item.badge || item.title.slice(0, 2).toUpperCase()}
                          </span>
                          <span className='leading-snug'>{item.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
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
  const [fixedVariant, setFixedVariant] = useState(null); // 'treatments' | 'cities'
  const fixedHoverRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpenIndex, setMobileOpenIndex] = useState(null); // top-level tab index
  const [mobileOpenSubIndex, setMobileOpenSubIndex] = useState(null); // sub item index within dropdown
  const desktopHoverCloseTimer = useRef(null);

  const cities = useMemo(
    () => [
      'Ahmedabad',
      'Bangalore',
      'Bhubaneswar',
      'Calicut',
      'Chennai',
      'Coimbatore',
      'Delhi',
      'Goa',
      'Hyderabad',
      'Jaipur',
      'Kolkata',
      'Madurai',
      'Perinthalmanna',
      'Salem',
      'Surat',
      'Trivandrum',
      'Vijayawada',
      'Vizag',
    ],
    [],
  );

  const cityItems = useMemo(
    () => cities.map((city) => ({ title: city, path: '/contact-us' })),
    [cities],
  );

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

  const megaMenuColumns = useMemo(() => {
    const byTitle = new Map(orderedTreatments.map((t) => [t.title, t]));
    const breast = byTitle.get('Breast Nodules');
    const interventional = byTitle.get('Interventional');
    const interNeurology = (interventional && interventional.subTreatments || []).find((x) => x.title === 'Interventional Neurology');
    const interCardiology = (interventional && interventional.subTreatments || []).find((x) => x.title === 'Interventional Cardiology');

    const womensHealth = [
      { title: 'Uterine Fibroids', path: byTitle.get('Uterine Fibroids')?.path || '/uterine-artery-embolization-uae' },
      { title: 'Fallopian Tube Block', path: byTitle.get('Fallopian Tube Block')?.path || '/fallopian-tube-recanalization-ftr' },
      ...(breast?.subTreatments || []).map((b) => ({ title: b.title, path: b.path })),
    ].filter((x) => x && x.path);

    const mensHealth = [
      { title: 'Enlarged Prostate', path: byTitle.get('Enlarged Prostate')?.path || '/prostate-artery-embolization-pae' },
      { title: 'Varicocele', path: byTitle.get('Varicocele')?.path || '/varicocele-embolization' },
    ].filter((x) => x && x.path);

    const painJoint = [
      { title: 'Knee Pain', path: byTitle.get('Knee Pain')?.path || '/genicular-artery-embolization-gae' },
      { title: 'Frozen Shoulder', path: byTitle.get('Frozen Shoulder')?.path || '/frozen-shoulder' },
      { title: 'Plantar Fascitis', path: byTitle.get('Plantar Fascitis')?.path || '/plantar-fascial-embolization' },
    ].filter((x) => x && x.path);

    const commonHealth = [
      { title: 'Hemorrhoids', path: byTitle.get('Hemorrhoids/Piles')?.path || '/piles-hemorrhoids' },
      { title: 'Diabetic Foot', path: byTitle.get('Diabetic Foot')?.path || '/diabetic-foot' },
      { title: 'Thyroid Nodule', path: byTitle.get('Thyroid Nodule')?.path || '/thyroid-nodule-ablation' },
      { title: 'Varicose Veins', path: byTitle.get('Varicose Veins')?.path || '/varicose-vein' },
      { title: 'Y-90 Radioembolization', path: byTitle.get('Y-90 Radioembolization')?.path || '/y90-radioembolization-tare' },
    ].filter((x) => x && x.path);

    const interventionalNeurology = (interNeurology?.subTreatments || [])
      .map((x) => ({ title: x.title, path: x.path }))
      .filter((x) => x && x.path);

    const interventionalCardiology = (interCardiology?.subTreatments || [])
      .map((x) => ({ title: x.title, path: x.path }))
      .filter((x) => x && x.path);

    const shown = new Set([
      ...womensHealth,
      ...mensHealth,
      ...painJoint,
      ...commonHealth,
      ...interventionalNeurology,
      ...interventionalCardiology,
    ].map((x) => x.path));

    const extras = [];
    for (const t of orderedTreatments) {
      if (t.title === 'Interventional' || t.title === 'Breast Nodules') continue;
      if (t.path && !shown.has(t.path)) {
        extras.push({ title: t.title, path: t.path });
        shown.add(t.path);
      }
      for (const sub of t.subTreatments || []) {
        if (sub.path && !shown.has(sub.path)) {
          extras.push({ title: sub.title, path: sub.path });
          shown.add(sub.path);
        }
        for (const sub2 of sub.subTreatments || []) {
          if (sub2.path && !shown.has(sub2.path)) {
            extras.push({ title: sub2.title, path: sub2.path });
            shown.add(sub2.path);
          }
        }
      }
    }

    const col1 = { sections: [{ title: "Women's Health", items: womensHealth }] };
    const col2 = { sections: [{ title: 'Mens Health', items: mensHealth }, { title: 'Pain & Joint', items: painJoint }] };
    const col3 = { sections: [{ title: 'Common Health', items: commonHealth }, ...(extras.length ? [{ title: 'More Treatments', items: extras }] : [])] };
    const col4 = { sections: [{ title: 'Interventional Neurology', items: interventionalNeurology }] };
    const col5 = { sections: [{ title: 'Interventional Cardiology', items: interventionalCardiology }] };

    return [col1, col2, col3, col4, col5];
  }, [orderedTreatments]);

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
    const hasSubmenu = !!(orderedTreatments[idx] && orderedTreatments[idx].subTreatments);
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
      const isInterventional = orderedTreatments[idx] && orderedTreatments[idx].title === 'Interventional';
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
    const mq = window.matchMedia('(max-width: 1023px)');
    const apply = () => setIsMobile(mq.matches);
    apply();
    if (mq.addEventListener) {
      mq.addEventListener('change', apply);
    }
    window.addEventListener('orientationchange', apply);
    return () => {
      if (mq.removeEventListener) {
      mq.removeEventListener('change', apply);
    }
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

  const openFixedDropdownForItems = (items, targetEl, stackBelow = false, variant = null) => {
    if (isMobile) return;
    if (!targetEl || !items || !items.length) return;
    const rect = targetEl.getBoundingClientRect();
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const dropdownWidth = 360;
    let left = rect.left;
    if (left + dropdownWidth > viewportWidth - 8) {
      left = Math.max(8, viewportWidth - dropdownWidth - 8);
    }
    left = Math.max(8, left);
    const top = rect.bottom;
    setFixedItems(items);
    setFixedStackBelow(!!stackBelow);
    setFixedPos({ left, top });
    setFixedVariant(variant);
    setFixedOpen(true);
  };

  const scheduleDesktopClose = () => {
    if (desktopHoverCloseTimer.current) {
      clearTimeout(desktopHoverCloseTimer.current);
    }
    desktopHoverCloseTimer.current = setTimeout(() => {
      fixedHoverRef.current = false;
      setFixedVariant(null);
      setFixedOpen(false);
    }, 120);
  };

  const cancelDesktopClose = () => {
    if (desktopHoverCloseTimer.current) {
      clearTimeout(desktopHoverCloseTimer.current);
      desktopHoverCloseTimer.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (desktopHoverCloseTimer.current) {
        clearTimeout(desktopHoverCloseTimer.current);
      }
    };
  }, []);

  return (
    <nav className='sticky top-[64px] lg:top-[78px] z-40 w-full bg-white border-b border-gray-200 shadow-sm ring-1 ring-black/5 overflow-x-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Desktop layout */}
        <div className='hidden lg:flex items-center justify-between h-[68px]'>
          <Link to='/' className='flex items-center gap-2 shrink-0'>
            <img
              src='/new_version_logo_medagg.png'
              alt='No Surgeries'
              className='h-10 w-auto object-contain'
              loading='eager'
              decoding='async'
            />
          </Link>

          <div className='flex items-center gap-5'>
            <button
              type='button'
              className='inline-flex items-center gap-1.5 text-sm font-semibold text-[#392C5C] hover:text-pink-500 transition-colors'
              onMouseEnter={(e) => {
                cancelDesktopClose();
                openFixedDropdownForItems(orderedTreatments, e.currentTarget, false, 'treatments');
              }}
              onMouseLeave={scheduleDesktopClose}
              onFocus={(e) => {
                cancelDesktopClose();
                openFixedDropdownForItems(orderedTreatments, e.currentTarget, false, 'treatments');
              }}
              aria-haspopup='menu'
              aria-expanded={fixedOpen}
            >
              <span>Treatments</span>
              <ChevronDown size={16} />
            </button>

            <button
              type='button'
              className='inline-flex items-center gap-1.5 text-sm font-semibold text-[#392C5C] hover:text-pink-500 transition-colors'
              onMouseEnter={(e) => {
                cancelDesktopClose();
                openFixedDropdownForItems(cityItems, e.currentTarget, false, 'cities');
              }}
              onMouseLeave={scheduleDesktopClose}
              onFocus={(e) => {
                cancelDesktopClose();
                openFixedDropdownForItems(cityItems, e.currentTarget, false, 'cities');
              }}
              aria-haspopup='menu'
              aria-expanded={fixedOpen}
            >
              <span>Cities</span>
              <ChevronDown size={16} />
            </button>

            <Link to='/about' className='text-sm font-semibold text-[#392C5C] hover:text-pink-500 transition-colors'>About</Link>
            <Link to='/blog' className='text-sm font-semibold text-[#392C5C] hover:text-pink-500 transition-colors'>Blogs</Link>
            <Link to='/contact-us' className='text-sm font-semibold text-[#392C5C] hover:text-pink-500 transition-colors'>Contact Us</Link>
          </div>

          <Link
            to='/contact-us'
            className='hover-stable inline-flex h-11 px-6 mr-6 bg-pink-500 text-white text-sm rounded-md font-semibold hover:bg-pink-600 transition-colors items-center justify-center whitespace-nowrap'
          >
            Book Appointment
          </Link>
        </div>

        {/* Mobile layout (keep existing scrollable tabs) */}
        <div className='lg:hidden flex items-center'>
          <button
            onClick={() => scroll('left')}
            className={`mr-2 bg-white hover:bg-gray-50 rounded-full shadow-md p-2 border border-gray-200 transition-opacity ${showLeftArrow ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            aria-hidden={!showLeftArrow}
            tabIndex={showLeftArrow ? 0 : -1}
            type='button'
          >
            <ChevronLeft className='h-4 w-4 text-gray-700' />
          </button>

          <div
            ref={scrollContainerRef}
            className='min-w-0 flex-1 overflow-x-auto overflow-y-visible scrollbar-hide pb-2'
          >
            <ul className='flex items-center justify-start whitespace-nowrap py-2'>
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
                  <button
                    type='button'
                    aria-expanded={mobileOpenIndex === idx}
                    onClick={() => handleMobileTabClick(idx)}
                    className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors duration-200 ${mobileOpenIndex === idx ? 'bg-[#ff3576] text-white' : 'text-gray-700'} `}
                  >
                    <span>{treatment.title}</span>
                    {treatment.subTreatments && <span className='text-xs'>{mobileOpenIndex === idx ? '▲' : '▼'}</span>}
                  </button>
                  {idx < orderedTreatments.length - 1 && (
                    <span className='text-gray-300'>|</span>
                  )}
                </li>
              ))}
              <li className='w-6 sm:w-8 flex-shrink-0 pointer-events-none' aria-hidden='true' />
            </ul>
          </div>

          <button
            onClick={() => scroll('right')}
            className={`ml-2 bg-white hover:bg-gray-50 rounded-full shadow-md p-2 border border-gray-200 transition-opacity ${showRightArrow ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            aria-hidden={!showRightArrow}
            tabIndex={showRightArrow ? 0 : -1}
            type='button'
          >
            <ChevronRight className='h-4 w-4 text-gray-700' />
          </button>
        </div>
      </div>
      {/* Fixed-position root dropdown (desktop only) */}
      {!isMobile && (
        <>
          <TreatmentsMegaMenu
            isOpen={fixedOpen && fixedVariant === 'treatments'}
            position={fixedPos}
            columns={megaMenuColumns}
            onMouseEnter={() => {
              cancelDesktopClose();
              fixedHoverRef.current = true;
            }}
            onMouseLeave={() => {
              fixedHoverRef.current = false;
              scheduleDesktopClose();
            }}
          />
          <FixedDropdown
            isOpen={fixedOpen && fixedVariant === 'cities'}
            position={fixedPos}
            items={fixedItems}
            stackSubBelow={fixedStackBelow}
            onMouseEnter={() => {
              cancelDesktopClose();
              fixedHoverRef.current = true;
            }}
            onMouseLeave={() => {
              fixedHoverRef.current = false;
              scheduleDesktopClose();
            }}
          />
        </>
      )}

      {/* Mobile dropdown panel */}
      {isMobile && mobileOpenIndex !== null && (
        <div className='bg-white border-t border-gray-200 shadow-inner'>
          <div className='max-w-7xl mx-auto px-4 py-2'>
            {((orderedTreatments[mobileOpenIndex] && orderedTreatments[mobileOpenIndex].subTreatments) || []).map((item, i) => (
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
