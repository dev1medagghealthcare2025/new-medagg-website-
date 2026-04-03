import React, { useEffect, useState } from 'react';
import { Users, Star, Presentation, Users2, Coffee, Utensils, HandCoins, Microscope, Calendar, Clock, MapPin, ChevronDown, ChevronUp, Linkedin } from 'lucide-react';
import './index.css'

const navItems = [
	{ id: 'home', label: 'Home' },
	{ id: 'about', label: 'About' },
	{ id: 'agenda', label: 'Agenda' },
	{ id: 'speakers', label: 'Speakers' },
	{ id: 'venue', label: 'Venue' },
	{ id: 'contact', label: 'Contact' },
]

function usePathname() {
	const [pathname, setPathname] = useState(() => window.location.pathname || '/')
	useEffect(() => {
		const onPop = () => setPathname(window.location.pathname || '/')
		window.addEventListener('popstate', onPop)
		return () => window.removeEventListener('popstate', onPop)
	}, [])
	return pathname
}

function navigate(to) {
	if (!to) return
	if (window.location.pathname === to) return
	window.history.pushState({}, '', to)
	window.dispatchEvent(new PopStateEvent('popstate'))
}

const withBase = (p = '') => {
	const base = (import.meta?.env?.BASE_URL || '/');
	const cleanBase = base.endsWith('/') ? base : `${base}/`;
	const cleanPath = String(p).replace(/^\/+/, '');
	return `${cleanBase}${cleanPath}`;
}

const LOGO_PUBLIC = withBase('medagg-logo.png')
const LOGO_FALLBACK = 'https://medagg.com/wp-content/uploads/2023/12/MEDAGG-NEW-LOGO.png'

function Logo({ className = 'h-12' }) {
	const [src, setSrc] = useState(LOGO_FALLBACK)
	useEffect(() => {
		fetch(LOGO_PUBLIC, { method: 'HEAD' })
			.then((r) => { if (r.ok) setSrc(LOGO_PUBLIC) })
			.catch(() => {})
	}, [])
	return (
		<img
			className={className}
			src={src}
			alt="Medagg Healthcare"
		/>
	)
}

function Navbar() {
	const [open, setOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)
	const pathname = usePathname()
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10)
		window.addEventListener('scroll', onScroll)
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	const normalizePath = (p = '') => String(p).replace(/\/+$/, '')
	const isGallery = normalizePath(pathname) === normalizePath(withBase('gallery'))
	const onNavClick = (e, to) => {
		if (e?.metaKey || e?.ctrlKey || e?.shiftKey || e?.altKey) return
		if (typeof to === 'string' && to.startsWith('http')) return
		if (to?.startsWith?.('#')) return
		e?.preventDefault?.()
		setOpen(false)
		navigate(to)
	}
	const galleryActiveClass = isGallery ? 'text-brand-600 font-semibold' : 'text-slate-700 hover:text-brand-600 font-medium'
	return (
		<header className={`sticky top-0 z-50 transition ${scrolled ? 'bg-white/90 backdrop-blur border-b border-slate-200' : 'bg-transparent'}`}>
			<div className="container-lg flex items-center justify-between py-3">
				<a href="https://nosurgeries.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
					<Logo className="h-10 sm:h-12" />
				</a>
				<nav className="hidden md:flex items-center gap-6">
					{!isGallery && navItems.map((n) => (
						<a key={n.id} href={`#${n.id}`} className="text-slate-700 hover:text-brand-600 font-medium">{n.label}</a>
					))}
					<a href={withBase('gallery')} onClick={(e) => onNavClick(e, withBase('gallery'))} className={galleryActiveClass}>Gallery</a>
					{isGallery && (
						<a href={withBase('')} onClick={(e) => onNavClick(e, withBase(''))} className="text-slate-700 hover:text-brand-600 font-medium">Back</a>
					)}
				</nav>
				<button onClick={() => setOpen(!open)} className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
				</button>
			</div>
			{open && (
				<div className="md:hidden border-t border-slate-200 bg-white">
					<div className="container-lg py-3 flex flex-col gap-3">
						{!isGallery && navItems.map((n) => (
							<a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="text-slate-700 hover:text-brand-600 font-medium">{n.label}</a>
						))}
						<a href={withBase('gallery')} onClick={(e) => onNavClick(e, withBase('gallery'))} className={isGallery ? 'text-brand-600 font-semibold' : 'text-slate-700 hover:text-brand-600 font-medium'}>Gallery</a>
						{isGallery && (
							<a href={withBase('')} onClick={(e) => onNavClick(e, withBase(''))} className="text-slate-700 hover:text-brand-600 font-medium">Back</a>
						)}
					</div>
				</div>
			)}
		</header>
	)
}

function Gallery() {
	const images = [
		{ src: '/conf_1.JPG', alt: 'IRpreneur Conference photo 1' },
		{ src: '/conf_2.JPG', alt: 'IRpreneur Conference photo 2' },
		{ src: '/conf_3.JPG', alt: 'IRpreneur Conference photo 3' },
		{ src: '/conf_4.JPG', alt: 'IRpreneur Conference photo 4' },
		{ src: '/conf_5.JPG', alt: 'IRpreneur Conference photo 5' },
		{ src: '/conf_6.JPG', alt: 'IRpreneur Conference photo 6' },
		{ src: '/conf_7.JPG', alt: 'IRpreneur Conference photo 7' },
		{ src: '/conf_8.JPG', alt: 'IRpreneur Conference photo 8' },
		{ src: '/conf_9.JPG', alt: 'IRpreneur Conference photo 9' },
		{ src: '/conf_10.JPG', alt: 'IRpreneur Conference photo 10' },
		{ src: '/Conf_12.JPG', alt: 'IRpreneur Conference photo 12' },
	]
	const [loadedCount, setLoadedCount] = useState(0)
	const [failedCount, setFailedCount] = useState(0)
	return (
		<div>
			<section className="relative min-h-[75vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${withBase('/conf_13.JPG')})` }} />
				<div className="absolute inset-0 [background:radial-gradient(800px_200px_at_50%_-40px,rgba(99,102,241,0.18),transparent_70%)]" />
			</section>

			<section className="py-12 bg-slate-50">
				<div className="container-lg">
					<h2 className="section-title">Event Gallery</h2>
					<div className="mt-8 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
						{images.map((img) => (
							<div key={img.src} className="mb-4 break-inside-avoid">
								<img
									src={withBase(img.src)}
									alt={img.alt}
									loading="lazy"
									className="block w-full h-auto"
									onLoad={() => setLoadedCount((c) => c + 1)}
									onError={(e) => {
										setFailedCount((c) => c + 1)
										e.currentTarget.style.display = 'none'
									}}
								/>
							</div>
						))}
					</div>
					{loadedCount === 0 && failedCount > 0 && (
						<div className="mt-8 text-center text-slate-500 border-2 border-dashed border-slate-300 rounded-xl bg-white p-8">
							Gallery images are not present in React `public/` yet. Copy `conf_*.JPG`, `Conf_12.JPG`, and `conf_13.JPG` from `php-version/` into `medagg-landing-page/public/`.
						</div>
					)}
				</div>
			</section>

			<footer className="py-6 border-t border-slate-200">
				<div className="container-lg text-center text-sm text-slate-600"> 2025 Medagg Healthcare. All rights reserved.</div>
			</footer>
		</div>
	)
}

function CountdownInline() {
	const target = new Date('2025-11-22T10:00:00+05:30').getTime()
	const [now, setNow] = useState(Date.now())
	useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id) }, [])
	const diff = Math.max(0, target - now)
	const days = Math.floor(diff / (1000 * 60 * 60 * 24))
	const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
	const mins = Math.floor((diff / (1000 * 60)) % 60)
	const secs = Math.floor((diff / 1000) % 60)
	const Box = ({ label, value, color }) => (
		<div className="flex flex-col items-center">
			<span className="text-slate-200 text-xs sm:text-sm tracking-widest">{label}</span>
			<div className="mt-2 rounded-lg sm:rounded-xl border border-white/20 bg-black/30 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 min-w-[60px] sm:min-w-[72px] md:min-w-[84px] text-center shadow-inner">
				<span className={`text-2xl sm:text-3xl md:text-4xl font-extrabold ${color}`}>{String(value).padStart(2, '0')}</span>
			</div>
		</div>
	)
	return (
		<div className="flex flex-col items-center justify-center gap-4 sm:gap-8 text-center">
			<div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6">
				<Box label="DAYS" value={days} color="text-cyan-400" />
				<span className="text-white/60 text-3xl">:</span>
				<Box label="HRS" value={hours} color="text-pink-500" />
				<span className="text-white/60 text-3xl">:</span>
				<Box label="MINS" value={mins} color="text-amber-300" />
				<span className="text-white/60 text-3xl">:</span>
				<Box label="SECS" value={secs} color="text-teal-400" />
			</div>
		</div>
	)
}

function Hero() {
	return (
		<section id="home" className="relative overflow-hidden">
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${withBase('/hero_bg.jpg')})` }}></div>
				<div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70"></div>
			</div>
				<div className="container-lg relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 min-h-[calc(100vh-80px)] flex items-center justify-center text-white px-4 sm:px-6">
				<div className="w-full max-w-6xl mx-auto">
					<div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 md:gap-8 lg:gap-12">
						{/* Date Badge (Left) */}
						<div className="border border-yellow-400/60 rounded-md p-4 sm:p-5 w-32 sm:w-36 md:w-40 text-center tracking-widest shrink-0">
							<p className="text-5xl sm:text-6xl font-black leading-none">22</p>
							<p className="my-3 h-0.5 w-16 sm:w-20 mx-auto bg-yellow-400/60"></p>
							<p className="text-2xl sm:text-3xl font-extrabold uppercase">Nov</p>
							<p className="text-xl sm:text-2xl font-semibold">2025</p>
						</div>

						{/* Main Content (Right) */}
						<div className="flex-1 text-center md:text-left mt-4 md:mt-0">
							<h1 className="text-5xl xs:text-6xl sm:text-7xl font-extrabold leading-[1] uppercase drop-shadow-sm">
								IRpreneur
							</h1>
							<p className="text-xl sm:text-2xl md:text-3xl font-semibold italic mt-3 sm:mt-4">
								The Synapse of Practice, Finance and Technology
							</p>
							<p className="text-base sm:text-lg text-white/90 font-medium mt-3 max-w-2xl mx-auto md:mx-0">
								A day-long immersion on business concepts designed for Interventional Radiologists (IRs).
							</p>
							<div className="w-full">
								<div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-3 sm:gap-4 mt-5 sm:mt-6">
									<span className="inline-flex items-center bg-white text-black px-4 py-2 rounded-md text-sm sm:text-base whitespace-nowrap">
										<Clock className="w-4 h-4 mr-2" />
										Saturday · 10:00 AM
									</span>
									<span className="inline-flex items-center bg-white text-black px-4 py-2 rounded-md text-sm sm:text-base whitespace-nowrap">
										<MapPin className="w-4 h-4 mr-2" />
										The Westin Chennai Velachery
									</span>
								</div>
								<div className="mt-6 sm:mt-8 w-full flex justify-center md:justify-start">
									<CountdownInline />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function Countdown() {
	const target = new Date('2025-11-22T10:00:00+05:30').getTime()
	const [now, setNow] = useState(Date.now())
	useEffect(() => {
		const id = setInterval(() => setNow(Date.now()), 1000)
		return () => clearInterval(id)
	}, [])
	const diff = Math.max(0, target - now)
	const days = Math.floor(diff / (1000 * 60 * 60 * 24))
	const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
	const mins = Math.floor((diff / (1000 * 60)) % 60)
	const secs = Math.floor((diff / 1000) % 60)
	const Box = ({ label, value, color }) => (
		<div className="flex flex-col items-center">
			<span className="text-slate-300 text-sm tracking-widest">{label}</span>
			<div className="mt-2 rounded-xl border border-slate-600/60 bg-slate-800/40 px-6 py-4 min-w-[84px] text-center shadow-inner">
				<span className={`text-4xl font-extrabold ${color}`}>{String(value).padStart(2, '0')}</span>
			</div>
		</div>
	)
	return (
		<section className="bg-slate-900 py-10">
			<div className="container-lg flex flex-col items-center justify-center gap-8 text-center">
				<div className="flex items-center justify-center gap-6">
					<Box label="DAYS" value={days} color="text-cyan-400" />
					<span className="text-slate-500 text-3xl">:</span>
					<Box label="HRS" value={hours} color="text-pink-500" />
					<span className="text-slate-500 text-3xl">:</span>
					<Box label="MINS" value={mins} color="text-amber-300" />
					<span className="text-slate-500 text-3xl">:</span>
					<Box label="SECS" value={secs} color="text-teal-400" />
				</div>
			</div>
		</section>
	)
}

function About() {
    const whoCards = [
        { img: '/IR_professionais.png', text: 'IR professionals aspiring to grow their practice' },
        { img: '/IR_space.png', text: 'Potential investors in the IR space' },
        { img: '/IR_Entrepreneurs.png', text: 'Aspiring IR entrepreneurs & stand-alone IR centers' },
        { img: '/Young_IR.png', text: 'Young IR professionals seeking early career advice' },
    ]
    return (
        <section id="about" className="relative py-20 bg-gradient-to-b from-slate-50 to-white">
            <div className="absolute inset-0 pointer-events-none [background:radial-gradient(600px_200px_at_50%_-40px,rgba(99,102,241,0.08),transparent_70%)]"></div>
            <div className="container-lg relative">
                <h3 className="text-left text-xl sm:text-2xl font-bold text-slate-900">About Medagg</h3>
                <p className="mt-4 text-base sm:text-lg text-slate-700">Medagg Healthcare is Indian’s first IR focused patient aggregation platform. With presence in more than 18 cities across 9 Indian states, the platform is poised to become a pan-India network in the next few quarters. Medagg is a corporate member of ISVIR and works closely with a large number of IR professionals in helping them improve their practice.</p>

                <h3 className="mt-10 text-left text-xl sm:text-2xl font-bold text-slate-900">About IRpreneur</h3>
                <p className="mt-4 text-base sm:text-lg text-slate-700">Interventional radiology (IR) is an emerging field of modern medicine that provides non-surgical treatment options to a number of health conditions which otherwise need surgery. With the awareness about such procedures increasing in this digitally connected world and with the obvious choice of patients to prefer non-surgical treatment options, this is a field that is poised for phenomenal growth in the coming years.</p>
                <p className="mt-4 text-base sm:text-lg text-slate-700">IRpreuner is an attempt to bring together an aspiring group of IR professionals who are taking the lead in terms of increasing awareness about these non-surgical procedures. It is an intense one day workshop that combines latest concepts from practice, finance and technology.</p>

                <h3 className="mt-10 text-left text-xl sm:text-2xl font-bold text-slate-900">Why Sponsor IRpreuner</h3>
                <p className="mt-4 text-base sm:text-lg text-slate-700">Sponsoring the Irpreuner event gets your brand to establish a direct connect with India’s leading IR professionals. Interaction with this group of IR professionals at a stage when the IR practice across India is poised to grow in leaps and bounds puts your brand also in good stead to gain from this impetus in the IR industry.</p>

                {/* Highlights removed to match PHP layout exactly */}

                <h3 className="mt-12 text-xl font-bold text-slate-900">Who Should Attend</h3>
                <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {whoCards.map((c, i) => (
                        <div key={i} className="border border-slate-200 rounded-xl overflow-hidden text-center shadow hover:shadow-lg transition flex flex-col">
                            <img src={withBase(c.img)} alt={c.text} className="w-full h-[150px] object-cover" />
                            <p className="p-4 text-lg text-slate-800 font-black">{c.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function Venue() {
  return (
    <section id="venue" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${withBase('/venue.jpg')})` }}></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>
      <div className="container-lg px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-left mb-12">
          <h2 className="text-6xl font-extrabold text-white mb-4 tracking-tighter" style={{fontFamily: '"Oswald", "Roboto Condensed", "Arial Narrow", sans-serif', fontStretch: 'condensed'}}>VENUE</h2>
          <div className="w-24 h-1 bg-white/80 rounded-full"></div>
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 items-center">
          {/* Map Section */}
          <div className="rounded-2xl overflow-hidden shadow-xl h-[400px] border-2 border-white/20">
            <iframe 
              title="The Westin Chennai Velachery" 
              className="w-full h-full" 
              loading="lazy" 
              allowFullScreen 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15549.69148529249!2d80.215669!3d12.992868!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267863720e967%3A0x43df2420d668eb5b!2sThe%20Westin%20Chennai%20Velachery!5e0!3m2!1sen!2sin!4v1666666666666!5m2!1sen!2sin"
            ></iframe>
          </div>

          {/* Venue Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-5xl font-bold text-yellow-400 mb-4" style={{fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif', fontStyle: 'italic', letterSpacing: '0.01em'}}>The Westin Chennai</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-white mt-1 flex-shrink-0" />
                  <div className="ml-3">
                    <p className="text-white/90 font-medium">The Westin, 154, Velachery Rd, TN Police Housing Colony, Velachery</p>
                    <p className="text-white/90 font-medium">Chennai, Tamil Nadu 600042</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-white mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="ml-3">
                    <p className="text-white/90 font-medium">22nd November 2025</p>
                    <p className="text-white/90 font-medium">9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-xl font-bold text-white mb-4">Venue Highlights</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white/90 font-medium">On-site parking available</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white/90 font-medium">Accessible by major bus routes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AgendaItem({ time, title, meta, type, panelMembers }) {
    const [isExpanded, setIsExpanded] = useState(false);
	const iconMap = {
		network: <Users className="h-6 w-6" strokeWidth={2.5} />,
		inauguration: <Star className="h-6 w-6" strokeWidth={2.5} fill="currentColor" />,
		talk: <Presentation className="h-6 w-6" strokeWidth={2.5} />,
		panel: <Users2 className="h-6 w-6" strokeWidth={2.5} />,
		break: <Coffee className="h-6 w-6" strokeWidth={2.5} />,
		lunch: <Utensils className="h-6 w-6" strokeWidth={2.5} />,
		vote: <HandCoins className="h-6 w-6" strokeWidth={2.5} />,
		special: <Microscope className="h-6 w-6" strokeWidth={2.5} />,
		schedule: <Clock className="h-6 w-6" strokeWidth={2.5} />,
		location: <MapPin className="h-6 w-6" strokeWidth={2.5} />,
		default: <Calendar className="h-6 w-6" strokeWidth={2.5} />
	};

	const icon = iconMap[type] || iconMap.default;
    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl hover:bg-white border border-white/20">
            <div className="flex flex-col items-center mb-4">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600/10 text-indigo-700 shadow-inner mb-3">
                    {React.cloneElement(icon, { className: 'h-6 w-6 text-indigo-700' })}
                </span>
                <span className="text-sm font-semibold text-indigo-800 bg-indigo-100/80 px-3 py-1 rounded-full">{time}</span>
            </div>
            <div className="text-center w-full">
                <p className="font-bold text-slate-800 text-lg mb-2">{title}</p>
                {meta && <p className="text-sm text-slate-600 bg-slate-50/80 rounded-lg px-3 py-1.5 whitespace-pre-line">{meta}</p>}
                
                {(type === 'break') && (
                    <img src={withBase('/Tea_break.png')} alt="Tea Break" className="max-w-[180px] w-full h-auto mt-4 mx-auto" />
                )}
                {(type === 'lunch') && (
                    <img src={withBase('/Lunch_break.png')} alt="Lunch Break" className="max-w-[180px] w-full h-auto mt-4 mx-auto" />
                )}
                
                {panelMembers && panelMembers.length > 0 && (
                    <div className="mt-3">
                        <button 
                            onClick={() => setIsExpanded(!isExpanded)}
							className="flex items-center justify-center gap-2 text-xs font-semibold text-indigo-700 hover:text-indigo-900 transition-colors mx-auto"
						>
							<span>Panel Members</span>
							{isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
						</button>
                        
                        {isExpanded && (
                            <div className="mt-3 space-y-2 text-left bg-indigo-50/50 rounded-lg p-3">
                                {panelMembers.map((member, idx) => (
                                    <div key={idx} className="text-xs">
                                        <p className="font-semibold text-slate-800">{member.name}</p>
                                        <p className="text-slate-600">{member.designation}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

function Agenda() {
    const items = [
        { time: '08:30 – 09:00', title: 'Registration & Networking', type: 'network' },
        { time: '09:00 – 10:00', title: 'Inauguration', meta: 'Guest of Honour : MR. Balachandra R\n Partner & Executive Director At Junior Kuppanna, Co-Founder & Partner At Blue Koi Ventures\n Guest of Honour : Dr. S Prakash\n EX MD, Star Health and Allied Insurance', type: 'inauguration' },
        { time: '10:10 – 10:30', title: 'Guest Talk 1: IR Reimbursement Roadmap : Navigating Coverage for Your Independent Center', meta: 'Dr. S Prakash\nEX MD, Star Health and Allied Insurance', type: 'talk' },
        { time: '10:40 – 11:00', title: 'Guest Talk 2: Been There Done That - 1', meta: 'Dr. Arjun Somireddy\nFounding Director RIVEA Vascular', type: 'special' },
        { time: '11:00 – 11:15', title: 'Tea Break', type: 'break' },
        { time: '11:15 – 11:45', title: 'Panel 1: Emerging Elective IR Procedures & Go to Market Strategy ', meta: 'Moderator – Dr. MC Uthappa\n Director of GIRI,Bengaluru\nConsultant Interventional Radiology', type: 'panel', panelMembers: [
            { name: 'Dr. Rohit P V Nair', designation: 'Senior Consultant - Vascular and IR, Aster Medcity, Kochi' },
            { name: 'Dr. Karthikeyan Damodaran', designation: 'Director of Vascular and IR at MIOT International Hospital, Chennai' },
            { name: 'Dr. Sankesh Mehta', designation: 'Consultant IR, MGM Healthcare, Chennai' },
            { name: 'Dr. Thoufiq Ali M', designation: 'Interventional Radiologist, KIMS Al Shifa, Super Specialty Hospital' },
            { name: 'Sumitha Karthik', designation: 'Co-Founder & COO, Medagg Healthcare' },
        ] },
        { time: '11:55 – 12:25', title: 'Panel 2: Co-existence In Common Territory : An Interaction Between Surgeon & IRs', meta: 'Moderator – Dr. T. Deepashree\n HOD IR,Rela Hospital\n Vice President ISVIRIndia', type: 'panel', panelMembers: [
            { name: 'Dr. Prakash Ayyadurai', designation: 'Orthopedic Surgeon & Specialist In Arthroscopy ' },
            { name: 'Dr. A. Shabnam Fathima', designation: 'Vascular Surgeon' },
            { name: 'Dr. Dhivya Sharona', designation: 'Gynaecologist' },
            { name: 'Dr. Shankar Balakrishnan', designation: 'Clinical Lead, Department of Interventional neurology and Neuromodulation, Rela Hospital' },
            { name: 'Dr. Anandh Balaji ', designation: 'Urologist, Robotic Surgeon' },
        ] },
        { time: '12:35 – 12:55', title: 'Guest Talk 3: Discharge in <10 mins: Speed Up Documentation, Power Up Claims', meta: 'Mr. VT Shreeram\nFounder & CEO Patient Lens AI', type: 'talk' },
        { time: '13:05 – 13:25', title: 'Guest Talk 4: IR for Wealth: Smart Investment Strategies : Hear It From an Investor', meta: 'Mr. Moorthy LG\n CEO, SaaSvat Tech Labs and Former CFO and Partner, TVS capital funds and former CFO of Navi Finserv', type: 'talk' },
        { time: '13:25 – 14:05', title: 'Lunch Break', type: 'lunch' },
        { time: '14:05 – 14:25', title: 'Guest Talk 5: Been There Done That - 2', meta: 'Dr. Gaurav Gangwani\n Consultant IR (Vascular Specialist)', type: 'special' },
        { time: '14:35 – 14:55', title: "Guest Talk 6: From Scrubs to Startups : The Thriving IRpreneur's Playbook", meta: 'Mr.Ramesh Krishnan\nFounder & CEO, Medagg Healthcare\nExecutive Director of Rela Institute', type: 'talk' },
        { time: '15:05 – 15:35', title: 'Panel 3: Emergence of OBLs & Challenges in the Indian Context', meta: 'Moderator –  Mr.Ramesh Krishnan\n Founder and CEO, Medagg Healthcare, Executive Director of Rela Institute', type: 'panel', panelMembers: [
            { name: ' Dr. Balaji Patel Kola', designation: 'Consultant Endo Vascular and Interventional Radiologist' },
            { name: ' Dr. T. Deepashree', designation: 'HOD IR, Rela Hospital, Vice President ISVIRIndia' },
            { name: 'Dr. Tejeshwar Singh Jugpal', designation: 'Director, Imperial Radiology & Healthsolutions' },
            { name: 'Dr. MC Uthappa', designation: 'Director of GIRI,Bengaluru,Consultant Interventional Radiology' },
        ] },
        { time: '15:35 – 15:50', title: 'Tea Break', type: 'break' },
        { time: '15:50 – 16:20', title: 'Panel 4: Group Practice in IR - Grooming an Idea ', meta: 'Moderator –  Dr. Minal Chaudhry\n Director - Radiodiagnosis and Intervention Radiology\n Aakash Healthcare Super Speciality Hospital', type: 'panel', panelMembers: [
            { name: 'Dr. Ashok Reddy Somu', designation: 'Consultant Interventional Radiologist' },
            { name: 'Dr. Pushparajan Sundarrajan ', designation: 'Endovascular and Interventional Radiologist, Chennai' },
            { name: 'Dr. S.Kiran Kumar ', designation: 'Interventional Radiologist, Chennai' },
            { name: 'Dr. Arul Arokia Sensan Babu', designation: 'Neuro and Vascular Interventional Radiologist' },
            { name: 'Dr. Vinayagamani S ', designation: 'Consultant & In-charge - Interventional Neuroradiology & Peripheral Vascular Interventions' },
        ] },
        { time: '16:30 – 17:00', title: 'Panel 5: Co-existence In Common Territory : An Interaction Between Surgeon & IRs - 2 ', meta: 'Moderator –  Dr. Rohit P V Nair\n Senior Consultant - Vascular and IR, Aster Medcity, Kochi.', type: 'panel', panelMembers: [
            { name: 'Prof. Dr. Anil Vaidya', designation: 'Multi-Organ Transplant Surgeon Chairman and Director – Institute of Multi-Visceral and Abdominal Organ Transplant' },
            { name: 'Dr. Sreenivasa Narayana Raju', designation: 'Vascular Interventional Radiologist' },
            { name: 'Dr. Muralidharan Vetrivel', designation: 'Consultant Neurosurgeon : Cerebrovascular & Neuro-oncology, Rela Hospital' },
            { name: 'Dr. Sumati Sundaraiya ', designation: 'Clinical Lead - Diagnostic Oncology & Theronostics (Nuclear Medicine) at MIOT International' },
            { name: 'Dr. Ram Kishore Gurajala ', designation: 'Interventional Radiologist at MGM Healtcare, Chennai' },
        ] },
        { time: '17:10 – 17:40', title: 'Panel 6: Early Career Advise For Young IR Professionals', meta: 'Moderator – Dr. Balaji Patel Kola \n Consultant Endo Vascular and Interventional Radiologist.', type: 'panel', panelMembers: [
            { name: 'Dr. Sanjeeva Kalva ', designation: 'Professor of Radiology and Vice-Chair of Image-Guided Interventions, University of Texas Southwestern Medical Center, Dallas,Texas, United States' },
            { name: 'Dr. Murali Krishnaswami ', designation: 'Interventional Neuro and EndoVascular Specialist Sims Hospital, Chennai.' },
        ] },
        { time: '17:45 – 18:00', title: 'Vote of Thanks', meta: 'Sumitha Karthik\nCo-Founder & COO, Medagg Healthcare', type: 'vote' },
    ];

	return (
		<section id="agenda" className="relative py-20 overflow-hidden bg-fixed" 
			style={{
				backgroundImage: 'url(/conference_bg.jpg)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundAttachment: 'fixed',
				position: 'relative',
			}}
		>
			{/* Overlay for better text readability */}
			<div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
			
			<div className="relative container-lg z-10">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">CONFERENCE AGENDA</h2>
					<div className="w-24 h-1 bg-white/80 mx-auto rounded-full"></div>
				</div>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{items.map((it, i) => (
						<AgendaItem key={i} {...it} />
					))}
				</div>
			</div>
		</section>
	)
}

function Speakers() {
    const speakers = [
       // { name: 'Prof. Mohamed Rela', role: 'Chairman & MD, Rela Institute', topic: 'Inauguration', image: '/Prof. Mohamed Rela.png' },
        { name: 'Dr. Anandh Balaji', role: 'Urologist, Robotic Surgeon', topic: 'Panel Member - 2', image: withBase('/Dr. Anand balaji.png') },
        { name: 'Prof. Dr. Anil Vaidya', role: 'Multi-Organ Transplant Surgeon Chairman and Director – Institute of Multi-Visceral and Abdominal Organ Transplant', topic: 'Panel Member - 5', image: withBase('/anil vaidya.png'), linkedin: 'https://www.linkedin.com/in/prof-anil-vaidya-143302148/?originalSubdomain=in' },
        { name: 'Dr. Arjun Somireddy', role: 'Founding Director RIVEA Vascular', topic: 'Been There Done That - 1', image: withBase('/Dr. Arjun Somireddy.png') },
        { name: 'Dr. Arul Arokia Sensan Babu', role: ' Neuro and Vascular Interventional Radiologist', topic: 'Panel Member - 4', image: withBase('/dr. arul.png'), linkedin: 'https://www.linkedin.com/in/arul-babu-869298a8/' },
        { name: 'Dr. Ashok Reddy Somu', role: ' Consultant Interventional Radiologist', topic: 'Panel Member - 4', image: withBase('/ashok reddy somu.png'), linkedin: 'https://www.linkedin.com/in/dr-ashok-reddy-somu-665613130/?originalSubdomain=in' },
        { name: 'Dr. Balaji Patel Kola', role: 'Consultant Endo Vascular and Interventional Radiologist', topic: 'Panel 6 Moderator, Member - 3', image: withBase('/Balaji_Patel_Kola_new.png'), linkedin: 'https://www.linkedin.com/in/prof-dr-balaji-patel-kola' },
        { name: 'Dr. T. Deepashree', role: 'HOD IR,Rela Hospital,\n Vice President ISVIRIndia', topic: 'Panel 2 Moderator, Member - 3', image: withBase('/Dr. T. Deepashree.png'), linkedin: 'https://www.linkedin.com/in/dr-deepa-shree-mrcp-frcr-ebir-cct-uk-5aa54a64' },
        { name: 'Dr. Dhivya Sharona', role: 'Gynaecologist', topic: 'Panel Member - 2', image: withBase('/Dhivya sharona.png'), linkedin: 'https://www.linkedin.com/in/dhivya-sharona-d-56b78048/' },
        { name: 'Dr. Gaurav Gangwani', role: 'Consultant IR (Vascular Specialist)', topic: 'Been There Done That - 2', image: withBase('/Gaurav_new.png'), linkedin: 'https://www.linkedin.com/in/dr-gaurav-gangwani' },
        { name: 'Dr. Karthikeyan Damodaran', role: 'Director of Vascular and IR at MIOT International Hospital, Chennai', topic: 'Panel Member - 1', image: withBase('/Karthikeyan Damodaran.png'), linkedin: 'https://www.linkedin.com/in/dr-karthikeyan-damodharan-mrcp-frcr-ebir-fcirse-fams-14496699/' },
        { name: 'Dr.S.Kiran Kumar', role: 'Interventional Radiologist', topic: 'Panel Member - 4', image: withBase('/Dr. Kiran.png') },
        { name: 'Dr. Minal Chaudhry', role: 'Director - Radiodiagnosis and Intervention Radiology,  Aakash Healthcare Super Speciality Hospital', topic: 'Panel 4 Moderator', image: withBase('/Dr Minal.jpg'), linkedin: 'https://www.linkedin.com/in/drminalchaudhry?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
        { name: 'Mr. Moorthy LG', role: 'CEO, SaaSvat Tech Labs and Former CFO and Partner,\n TVS capital funds and former CFO of Navi Finserv', topic: 'IR for Wealth Smart Investment Strategies', image: withBase('/Mr. Moorthy LG.png'), linkedin: 'https://www.linkedin.com/in/moorthy-lg-resultlane' },
        { name: 'Dr. Murali Krishnaswami', role: 'Interventional Neuro and EndoVascular Specialist Sims Hospital, Chennai.', topic: 'Panel Member - 6', image: withBase('/Dr Murali.png'), linkedin: 'https://www.linkedin.com/in/murali-krishnaswami-b90848192/?originalSubdomain=in' },
        { name: 'Dr. Muralidharan Vetrivel', role: 'Consultant Neurosurgeon : Cerebrovascular & Neuro-oncology, Rela Hospital', topic: 'Panel Member - 5', image: withBase('/Vetrivel.png'), linkedin: 'https://www.linkedin.com/in/muralidharan-vetrivel-4616bbb9/?originalSubdomain=in' },
        { name: 'Dr. Prakash Ayyadurai', role: 'Orthopedic Surgeon & Specialist In Arthroscopy', topic: 'Panel Member - 2', image: withBase('/Prakash Ayyadurai.png'), linkedin: 'https://www.linkedin.com/in/prakashayyadurai/' },
        { name: 'Dr. Pushparajan Sundarrajan', role: ' Endovascular and Interventional Radiologist', topic: 'Panel Member - 4', image: withBase('/pushparajan.png'), linkedin: 'https://www.linkedin.com/in/pushparajan-sundarrajan-37b3707a/' },
        { name: 'Dr. MC Uthappa', role: 'Director of GIRI,Bengaluru,\n Consultant Interventional Radiology', topic: 'Panel 1 Moderator, Member - 3 ', image: withBase('/new_mc_utthpa.jpeg'), linkedin: 'https://www.linkedin.com/in/mc-uthappa-56178a4b' },
        { name: 'Dr. Ram Kishore Gurajala ', role: 'Interventional Radiologist at MGM Healtcare, Chennai', topic: 'Panel Member - 5', image: withBase('/Ram Kishore Gurajala.png'), linkedin: 'https://www.linkedin.com/in/ram-kishore-gurajala-3b9010290/' },
        { name: 'Dr. Rohit P V Nair', role: 'Senior Consultant - Vascular and IR, Aster Medcity, Kochi', topic: 'Panel 5 Moderator, Member - 1', image: withBase('/Rohit nair.png'), linkedin: 'https://www.linkedin.com/in/rohit-nair-5a658b41/' },
        { name: 'Dr. Sanjeeva Kalva ', role: 'Professor of Radiology and Vice-Chair of Image-Guided Interventions, University of Texas Southwestern Medical Center, Dallas, TX', topic: 'Panel Member - 6', image: withBase('/Dr Kalwa_new.png'), linkedin: 'https://www.linkedin.com/in/sanjeeva-kalva-55a815234/' },
        { name: 'Dr. Sankesh Mehta', role: ' Consultant IR, MGM Healthcare, Chennai', topic: 'Panel Member - 1', image: withBase('/Sankesh.png'), linkedin: 'https://www.linkedin.com/in/sankesh-mehta-803064292/' },
        { name: 'Dr. A. Shabnam Fathima', role: 'Vascular Surgeon', topic: 'Panel Member - 2', image: withBase('/Shabnam Fathima.png') },
        { name: 'Dr. Shankar Balakrishnan', role: 'Clinical Lead, Department of Interventional neurology and Neuromodulation, Rela Hospital', topic: 'Panel Member - 2', image: withBase('/Shankar.png'), linkedin: 'https://www.linkedin.com/in/dr-shankar-balakrishnan/?originalSubdomain=in' },
        { name: 'Dr Sreenivasa Narayana Raju', role: 'Vascular Interventional Radiologist', topic: 'Panel Member - 5', image: withBase('/SRINIVASA NARAYANA.png'), linkedin: 'https://www.linkedin.com/in/dr-sreenivasa-narayana-raju-md-dm-aiims-new-delhi-ebir-fvir-234840234/?originalSubdomain=in' },
        { name: 'Dr. Sumati Sundaraiya', role: 'Clinical Lead - Diagnostic Oncology & Theronostics (Nuclear Medicine) at MIOT International, Chennai', topic: 'Panel Member - 5', image: withBase('/Dr. Sumathy.png'), linkedin: 'https://www.linkedin.com/in/sumati-sundaraiya-a290242b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
        { name: 'Dr. Thoufiq Ali M', role: 'Interventional Radiologist, KIMS Al Shifa, Super Specialty Hospital', topic: 'Panel Member - 1', image: withBase('/Thoufiq.png') },
        { name: 'Dr. Tejeshwar Singh Jugpal', role: 'Director, Imperial Radiology & Healthsolutions', topic: 'Panel Member - 3', image: withBase('/Dr. Tejeshwar Singh Jugpal.png'), linkedin: 'https://www.linkedin.com/in/tejeshwarsjugpal/?originalSubdomain=in' },
        { name: 'Dr. Vinayagamani S', role: 'Consultant & In-charge - Interventional Neuroradiology & Peripheral Vascular Interventions', topic: 'Panel Member - 4', image: withBase('/Vinayagamani S.png'), linkedin: 'https://www.linkedin.com/in/vinayagamani2017inr/?originalSubdomain=in' },
        { name: 'Mr. VT Shreeram', role: 'Founder & CEO Patient Lens AI', topic: ' Discharge in <10 mins: Speed Up Documentation, Power Up Claims', image: withBase('/VT_Sreeram.png'), linkedin: 'https://www.linkedin.com/in/vtshreeram/?originalSubdomain=in' },
        { name: 'Ramesh Krishnan', role: 'Founder & CEO, Medagg Healthcare,\n Executive Director of Rela Institute', topic: 'From Scrubs to Startups, Panel 3 Moderator', image: withBase('/Ramesh Krishnan.png'), linkedin: 'https://www.linkedin.com/in/ramesh-krishnan-522b477' },
        { name: 'Sumitha Karthik', role: 'Co-Founder & COO, Medagg Healthcare', topic: 'Vote of Thanks, Panel Member - 1', image: withBase('/sk_new.jpeg'), linkedin: 'https://www.linkedin.com/in/sumitha-karthik-b5a4344b' },
    ]
    return (
        <section id="speakers" className="py-16" style={{ backgroundColor: '#E6E6E6' }}>
            <div className="container-lg">
                <h2 className="section-title">Speakers</h2>
                <div className="text-left mt-8 mb-8 space-y-8">
                    <img src={withBase('/MR. Balachandar R.jpg')} alt="MR. Balachandar R" className="max-w-full h-auto" />
                    <img src={withBase('/Dr. prakash.jpg')} alt="Dr. S Prakash" className="max-w-full h-auto" />
                </div>
                <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {speakers.map((s, i) => (
                        <div key={i} className="card p-5 text-center relative">
                            <img
                                className="h-28 w-28 rounded-full mx-auto object-cover object-top"
                                src={s.image}
                                alt={s.name}
                                loading="lazy"
                                onError={(e) => { e.currentTarget.src = LOGO_PUBLIC; }}
                            />
                            <h3 className="mt-4 font-semibold text-slate-900">{s.name}</h3>
                            <p className="text-sm text-slate-600 whitespace-pre-line">{s.role}</p>
                            <p className="mt-2 text-sm font-medium text-brand-700">{s.topic}</p>
                            {s.linkedin && (
                                <a
                                    href={s.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center mt-3 text-blue-600 hover:text-blue-800 transition-colors"
                                    aria-label={`${s.name} LinkedIn Profile`}
                                >
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function Registration() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', organization: '', designation: '', city: '' })
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    // Optional backend API was removed for PHP-independence
    const API_BASE = ''
    const SHEETS_URL = import.meta.env.VITE_SHEETS_URL || ''
    const PAYMENT_LINK_URL = import.meta.env.VITE_PAYMENT_LINK_URL || ''

    // No external checkout script needed for payment link flow

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const onSubmit = async (e) => {
        e.preventDefault()
        setError('')
        const emailOk = /.+@.+\..+/.test(form.email)
        const phoneOk = /^[0-9()+\-\s]{7,20}$/.test(form.phone)
        if (!emailOk || !phoneOk) {
            setError('Please fill in valid email and phone number.')
            return
        }

        try {
            setLoading(true)

            // 1) Save lead/registration to Google Sheets (no backend required)
            if (SHEETS_URL) {
                try {
                    await fetch(SHEETS_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name: form.name,
                            email: form.email,
                            phone: form.phone,
                            organization: form.organization,
                            designation: form.designation,
                            city: form.city,
                            lunch: form.lunch || ''
                        })
                    })
                } catch (e) {
                    // Non-blocking: proceed to payment even if sheet write fails
                    console.warn('Sheets write failed', e)
                }
            }

            // 2) Redirect to hosted payment link (no server dependency)
            if (PAYMENT_LINK_URL) {
                setSubmitted(true)
                // Optional: preserve name/email/phone in URL if your provider supports reading them
                window.location.href = PAYMENT_LINK_URL
            } else {
                throw new Error('Payment link is not configured. Please set VITE_PAYMENT_LINK_URL and rebuild.')
            }
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }
    return (
        <section id="register" className="py-16" style={{ backgroundColor: '#E6E6E6' }}>
            <div className="container-lg">
                <h2 className="section-title text-center">Register Now</h2>
                <div className="mt-6 grid justify-items-center">
                    <form onSubmit={onSubmit} id="registration-form" className="card p-6 grid gap-4 w-full" style={{ maxWidth: 500 }}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium">Name</label>
                                <input required name="name" value={form.name} onChange={onChange} className="mt-1 w-full rounded-md border-slate-300 bg-white text-slate-800 border p-2 focus:border-brand-600 focus:ring-1 focus:ring-brand-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">City</label>
                                <input required name="city" value={form.city} onChange={onChange} className="mt-1 w-full rounded-md border-slate-300 bg-white text-slate-800 border p-2 focus:border-brand-600 focus:ring-1 focus:ring-brand-600" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium">Email</label>
                                <input required type="email" name="email" value={form.email} onChange={onChange} className="mt-1 w-full rounded-md border-slate-300 bg-white text-slate-800 border p-2 focus:border-brand-600 focus:ring-1 focus:ring-brand-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Phone</label>
                                <input required name="phone" value={form.phone} onChange={onChange} className="mt-1 w-full rounded-md border-slate-300 bg-white text-slate-800 border p-2 focus:border-brand-600 focus:ring-1 focus:ring-brand-600" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium">Organization</label>
                                <input required name="organization" value={form.organization} onChange={onChange} className="mt-1 w-full rounded-md border-slate-300 bg-white text-slate-800 border p-2 focus:border-brand-600 focus:ring-1 focus:ring-brand-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Designation</label>
                                <input required name="designation" value={form.designation} onChange={onChange} className="mt-1 w-full rounded-md border-slate-300 bg-white text-slate-800 border p-2 focus:border-brand-600 focus:ring-1 focus:ring-brand-600" />
                            </div>
                        </div>
                        <button type="submit" className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>{loading ? 'Processing...' : 'Submit Registration'}</button>
                        {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}
                        {submitted && <p className="text-sm text-green-700 bg-green-50 p-2 rounded">Thank you! We have received your details.</p>}
                    </form>
                </div>
            </div>
        </section>
    )
}

function Contact() {
    return (
        <section id="contact" className="py-16 text-white" style={{ backgroundColor: '#3F2B78' }}>
            <div className="container-lg text-left">
                <h2 className="section-title !text-white text-left">Contact Us</h2>
                <div className="mt-4 grid gap-6 md:grid-cols-3">
                    <p><span className="font-semibold">Email:</span> <a className="text-white hover:underline" href="mailto:medaggirprenuer@gmail.com">medaggirprenuer@gmail.com</a></p>
                    <p><span className="font-semibold">Phone:</span> <a className="text-white hover:underline" href="tel:+919962113344">+91 9962113344</a></p>
                    <div className="flex gap-6">
                        <a aria-label="LinkedIn" className="text-white hover:text-pink-300 transition-colors" href="https://www.linkedin.com/company/medagg-healthcare/" target="_blank" rel="noopener noreferrer">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                        <a aria-label="Facebook" className="text-white hover:text-pink-300 transition-colors" href="https://www.facebook.com/people/Medagg-Healthcare/" target="_blank" rel="noopener noreferrer">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/></svg>
                        </a>
                        <a aria-label="Instagram" className="text-white hover:text-pink-300 transition-colors" href="https://www.instagram.com/irpreneur_medagg" target="_blank" rel="noopener noreferrer">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2.2a2.8 2.8 0 110 5.6 2.8 2.8 0 010-5.6zM17.5 6.5a1 1 0 100 2 1 1 0 000-2z"/></svg>
                        </a>
                    </div>
                </div>
            </div>

        </section>
    )
}

function Sponsors() {
        const logos = [
            { src: '/Keerakadai.png', alt: 'Keerakadai' },
            { src: '/Medifocus.png', alt: 'Medifocus' },
            { src: '/Raddmed.png', alt: 'Raddmed' },
            { src: '/SH logo.png', alt: 'SH Logo' },
            { src: '/ASK.png', alt: 'ASK' },
            { src: '/mimapro-logo.png', alt: 'mimapro' },
        ]
        return (
            <section id="sponsors" className="py-12 bg-white">
                <div className="container-lg">
                    <h2 className="section-title text-center">Our Sponsors</h2>
                    <div className="mt-6 grid justify-items-center items-center gap-y-6 gap-x-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
                        {logos.map((l, i) => (
                            <img
                                key={i}
                                src={l.src}
                                alt={l.alt}
                                className="max-h-20 w-auto max-w-[220px] object-contain"
                                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/medagg-logo.png' }}
                            />
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    export default function App() {
        const pathname = usePathname()
        if (pathname === '/gallery') {
            return (
                <div>
                    <Navbar />
                    <Gallery />
                </div>
            )
        }
        return (
            <div>
                <Navbar />
                <Hero />
                <About />
                <Agenda />
                <Speakers />
                <Venue />
                <Sponsors />
                {/* <Registration /> */}
                <Contact />
                <footer className="py-6 border-t border-slate-200">
                    <div className="container-lg text-center text-sm text-slate-600"> 2025 Medagg Healthcare. All rights reserved.</div>
                </footer>
            </div>
        )
    }
