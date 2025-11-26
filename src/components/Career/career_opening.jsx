import React from 'react';
import { useState } from 'react';

// Resolve TeleCRM API key once at module load with safe fallbacks
const TELECRM_API_KEY = (import.meta && import.meta.env && (
  import.meta.env.VITE_TELECRM_API_KEY ||
  import.meta.env.VITE_TELECRM_TOKEN
)) || (typeof window !== 'undefined' && (window.VITE_TELECRM_API_KEY || window.VITE_TELECRM_TOKEN)) || '';

const openings = [
  {
    id: 1,
    title: 'Business Development Executive / Inside Sales Medagg Healthcare',
    subtitle: 'Join Our Mission to Transform Healthcare Experiences!',
    level: 'Fresher / Experience',
    languages: ['English', 'Hindi', 'Telugu', 'Tamil', 'Malayalam', 'Kannada', 'Bengali'],
   
    responsibilities: [
      "Make outbound calls to potential patients, presenting Medagg Healthcare's services with enthusiasm and professionalism",
      'Understand patient needs and provide relevant information about our offerings',
      'Convert leads into loyal patients by highlighting the value and benefits of Medagg Healthcare',
      'Maintain accurate records of patient interactions in our CRM system',
      'Collaborate with the healthcare team to stay updated on services and promotions',
      'Achieve individual and team targets for patient conversion',
    ],
    requirements: [
      'Excellent communication skills to articulate healthcare services effectively',
      'Multilingual proficiency (added advantage)',
      'Understanding of healthcare terminology and services',
      'Adaptability and proactive approach in a startup environment',
      'Passion for healthcare and genuine interest in helping people improve their well-being',
    ],
  },
  {
    id: 2,
    title: 'Care Companion– City Operations',
    subtitle: 'Join Our Mission to Transform Healthcare Experiences!',
    level: '0–3 Years Experience',
    languages: ['English', 'Tamil', 'Hindi', 'Telugu', 'Kannada'],
    cities: ['Bangalore', 'Chennai', 'Hyderabad'],
    responsibilities: [
      'Patient Support: Assist patients during outpatient and inpatient visits, providing information, guidance, and support to ensure they receive top‑notch care.',
      'Payment Follow‑ups: Track and follow up on payments from hospitals and insurance providers, resolving payment‑related issues efficiently.',
      'Sales Assistance: Support our sales team with patient engagement and outreach efforts.',
      'Onboarding Hospitals & Doctors: Help bring new hospitals and doctors on board, ensuring smooth integration and documentation processes.',
    ],
    requirements: [
      '0–3 years of experience',
      'Excellent communication skills in English and regional languages',
      'Patient‑first approach with empathy and understanding',
      'Willingness to travel within your city as needed',
      'Bike ownership mandatory',
    ],
  },
  {
    id: 3,
    title: 'Marketing / Business Development Manager',
    subtitle: 'Join Our Mission to Transform Healthcare Experiences!',
    level: '0–5 Years Experience',
    languages: ['English', 'Tamil'],
    responsibilities: [
      'Develop and execute growth‑focused marketing and BD strategies',
      'Build relationships with hospitals, doctors, and partners',
      'Own performance metrics and funnel analytics',
      'Plan and run campaigns across digital and offline channels',
    ],
    requirements: [
      '0–5 years in Marketing/BD, preferably in healthcare',
      'Strong stakeholder management and communication',
      'Data‑driven decision making and campaign ownership',
    ],
  },
];

function Badge({ children, tone = 'pink' }) {
  const tones = {
    pink: 'bg-[#ffe3ee] text-[#ff3576]',
    soft: 'bg-[#f6eefe] text-[#2d2552]',
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${tones[tone]} whitespace-nowrap`}>
      {children}
    </span>
  );
}

const Chevron = ({ open }) => (
  <span
    className={`inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#ff3576] text-white transition-transform duration-200 ${
      open ? 'rotate-180' : ''
    }`}
    aria-hidden="true"
  >
    ▾
  </span>
);

const CareerOpening = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  // Apply modal state
  const [showApply, setShowApply] = useState(false);
  const [activeJob, setActiveJob] = useState(null);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    languages: [],
    resumeUrl: '',
  });

  const openApplyModal = (job) => {
    setActiveJob(job);
    setShowApply(true);
    setStep(1);
    setSubmitted(false);
    setErrorMsg('');
  };

  const closeApplyModal = () => {
    setShowApply(false);
    setActiveJob(null);
    setStep(1);
    setSubmitting(false);
    setSubmitted(false);
    setErrorMsg('');
    setForm({ name: '', email: '', phone: '', experience: '', languages: [], resume: null });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const toggleLanguage = (lang) => {
    setForm((f) => {
      const exists = f.languages.includes(lang);
      return { ...f, languages: exists ? f.languages.filter((l) => l !== lang) : [...f.languages, lang] };
    });
  };

  // resumeUrl is handled by generic onChange()

  const next = () => setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  async function submitApplication() {
    setSubmitting(true);
    setErrorMsg('');
    try {
      // Basic URL validation (optional but helpful)
      if (!form.resumeUrl || !/^https?:\/\//i.test(form.resumeUrl)) {
        throw new Error('Please provide a valid public resume URL (starting with http or https).');
      }

      const endpoint = 'https://api.telecrm.in/enterprise/658abddbf911ed2d692b0cf5/autoupdatelead';
      const apiKey = TELECRM_API_KEY;

      if (!apiKey) {
        throw new Error('Missing TeleCRM API key (VITE_TELECRM_API_KEY)');
      }

      const payload = {
        fields: {
          name: form.name,
          phone: form.phone,
          email: form.email,
          experience: form.experience,
          languages: form.languages.join(', '),
          role: activeJob?.title || '',
          resumeUrl: form.resumeUrl,
          source: 'Website - Career Apply',
        },
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = 'Failed to submit application';
        try {
          const data = await res.json();
          if (data && (data.message || data.error)) {
            msg = data.message || data.error;
          }
        } catch {}
        throw new Error(msg);
      }

      setSubmitted(true);
      setStep(3);
    } catch (err) {
      setErrorMsg(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="openings" className="w-full bg-gray-100">
      <div className="max-w-5xl md:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-[#ff3576] font-semibold text-sm">Now Hiring</p>
          <h2 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#2d2552]">
            Open Positions Available
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4b4766]/80">
            Find your perfect role and start making an impact in healthcare innovation.
          </p>
        </div>

        {/* List */}
        <div className="space-y-4">
          {openings.map((job) => {
            const isOpen = openId === job.id;
            return (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden"
              >
                {/* Row */}
                <button
                  type="button"
                  onClick={() => toggle(job.id)}
                  className="w-full text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4 p-5 sm:p-6">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#2d2552] font-extrabold text-lg sm:text-xl">
                        {job.title}
                      </h3>
                      <p className="mt-1 text-[#4b4766]/80 text-sm">
                        {job.subtitle}
                      </p>

                      {/* Badges row */}
                      <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="text-[#2d2552] text-sm">Level:</span>
                        <Badge tone="pink">{job.level}</Badge>

                        <span className="ml-2 text-[#2d2552] text-sm">Language :</span>
                        <Badge tone="soft">{job.languages.join(', ')}</Badge>

                        {job.cities && job.cities.length > 0 && (
                          <>
                            <span className="ml-2 text-[#2d2552] text-sm">Cities :</span>
                            <Badge tone="soft">{job.cities.join(', ')}</Badge>
                          </>
                        )}
                      </div>
                    </div>

                    <Chevron open={isOpen} />
                  </div>
                </button>

                {/* Details */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 sm:pb-7 pt-1">
                    {/* Responsibilities */}
                    <div>
                      <h4 className="text-[#ff3576] font-extrabold text-xl">Key Responsibilities:</h4>
                      <ul className="mt-3 space-y-2 text-[#2d2552] text-sm sm:text-base list-none">
                        {job.responsibilities.map((item, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-[#ff3576]" aria-hidden="true">✤</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Requirements */}
                    <div className="mt-6">
                      <h4 className="text-[#ff3576] font-extrabold text-xl">Requirements:</h4>
                      <ul className="mt-3 space-y-2 text-[#2d2552] text-sm sm:text-base list-none">
                        {job.requirements.map((item, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-[#ff3576]" aria-hidden="true">✤</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="mt-6">
                      <button
                        type="button"
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#ff3576] text-white font-semibold shadow hover:shadow-md transition"
                        onClick={() => openApplyModal(job)}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Apply Modal */}
      {showApply && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={closeApplyModal} />

          {/* Dialog */}
          <div className="relative z-[101] h-full w-full flex items-start sm:items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
              <div className="border-b px-5 py-4">
                <h3 className="text-lg sm:text-xl font-extrabold text-[#2d2552]">
                  {submitted ? 'Thank You' : `Apply for ${activeJob?.title || ''}`}
                </h3>
                {!submitted && (
                  <p className="text-sm text-[#4b4766]/80">Step {step} of 3</p>
                )}
              </div>

              {/* Steps */}
              {!submitted ? (
                <div className="px-5 py-4 space-y-4">
                  {step === 1 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-[#ff3576] text-white grid place-content-center text-sm font-bold">1</span>
                        <span className="w-7 h-7 rounded-full bg-gray-200 grid place-content-center text-sm font-bold text-gray-500">2</span>
                        <span className="w-7 h-7 rounded-full bg-gray-200 grid place-content-center text-sm font-bold text-gray-500">3</span>
                      </div>
                      <input name="name" value={form.name} onChange={onChange} placeholder="Your Name*" className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#ff3576]" />
                      <input name="email" value={form.email} onChange={onChange} placeholder="Your Email*" type="email" className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#ff3576]" />
                      <input name="phone" value={form.phone} onChange={onChange} placeholder="Your Phone*" className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#ff3576]" />
                      <div className="pt-1">
                        <button onClick={next} className="w-full bg-[#2d2552] text-white font-semibold rounded-lg py-2.5">Continue</button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-gray-200 grid place-content-center text-sm font-bold text-gray-500">1</span>
                        <span className="w-7 h-7 rounded-full bg-[#ff3576] text-white grid place-content-center text-sm font-bold">2</span>
                        <span className="w-7 h-7 rounded-full bg-gray-200 grid place-content-center text-sm font-bold text-gray-500">3</span>
                      </div>
                      <input name="experience" value={form.experience} onChange={onChange} placeholder="Year Of Experience?" className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#ff3576]" />
                      <div>
                        <p className="text-sm font-semibold text-[#2d2552] mb-1">Language</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {(activeJob?.languages || []).map((l) => (
                            <label key={l} className="inline-flex items-center gap-2 text-sm">
                              <input type="checkbox" className="accent-[#ff3576]" checked={form.languages.includes(l)} onChange={() => toggleLanguage(l)} />
                              <span>{l}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <button onClick={back} className="flex-1 border border-gray-300 text-[#2d2552] rounded-lg py-2.5">Back</button>
                        <button onClick={next} className="flex-1 bg-[#2d2552] text-white font-semibold rounded-lg py-2.5">Continue</button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-gray-200 grid place-content-center text-sm font-bold text-gray-500">1</span>
                        <span className="w-7 h-7 rounded-full bg-gray-200 grid place-content-center text-sm font-bold text-gray-500">2</span>
                        <span className="w-7 h-7 rounded-full bg-[#ff3576] text-white grid place-content-center text-sm font-bold">3</span>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#2d2552] mb-1">Public Resume URL</label>
                        <input
                          type="url"
                          name="resumeUrl"
                          value={form.resumeUrl}
                          onChange={onChange}
                          placeholder="https://drive.google.com/... (Anyone with the link can view)"
                          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#ff3576]"
                          required
                        />
                        <p className="mt-1 text-xs text-[#4b4766]">Share a link that anyone can access (Google Drive, Dropbox, etc.).</p>
                      </div>
                      {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
                      <div className="flex items-center gap-2 pt-1">
                        <button onClick={submitApplication} disabled={submitting} className="flex-1 bg-[#ff3576] text-white font-semibold rounded-lg py-2.5 disabled:opacity-60">{submitting ? 'Submitting...' : 'Submit'}</button>
                        <button onClick={closeApplyModal} className="flex-1 border border-gray-300 text-[#2d2552] rounded-lg py-2.5">Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="px-5 py-8 text-center">
                  <h4 className="text-2xl font-extrabold text-[#2d2552] mb-2">Thank You</h4>
                  <p className="text-[#4b4766]">Your response has been submitted.</p>
                  <div className="mt-6">
                    <button onClick={closeApplyModal} className="px-6 py-3 rounded-xl bg-[#ff3576] text-white font-semibold shadow hover:shadow-md transition">Close</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CareerOpening;