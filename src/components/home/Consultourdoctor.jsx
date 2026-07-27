import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, ClipboardCheck, CheckCircle2, ThumbsUp, Calendar } from 'lucide-react';

const steps = [
  {
    icon: <Phone size={32} color='white' />,
    text: 'Our Care Custodian Will Call You Once You Share Your Details',
  },
  {
    icon: <Calendar size={32} color='white' />,
    text: 'The Care Custodian Will Understand Your Problem In Detail',
  },
  {
    icon: <CheckCircle2 size={32} color='white' />,
    text: 'The Right Solution To Your Query Will Be Addressed With Suitable Options',
  },
  {
    icon: <ThumbsUp size={32} color='white' />,
    text: 'Consultation Will Be Fixed On Your Behalf',
  },
];

export default function Consultourdoctor({ city = '', variant = '' }) {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const isGAE = path.includes('genicular') || path.includes('gae');
  const isPAE = path.includes('prostate') || path.includes('pae');
  const isThyroid = path.includes('thyroid');
  const isFTR = path.includes('fallopian') || path.includes('ftr') || path.includes('fte');
  const isUAE = path.includes('uterine-artery-embolization') || path.includes('uae');
  const isVV = path.includes('varicose-vein') || path.includes('varicose');
  const isPFE = path.includes('plantar') || path.includes('pfe') || path.includes('planter');
  const isDiabeticFoot = path.includes('diabetic');
  const isFrozenShoulder = path.includes('frozen');
  const isTAVI = path.includes('transcatheter-aortic-valve-replacement') || path.includes('tavi') || path.includes('tavr');
  const isCTO = path.includes('/cto') || path.includes('chronic-total-occlusion') || path.includes('cto-');
  const isHemorrhoids = path.includes('piles-hemorrhoids') || path.includes('hemorrhoid') || path.includes('hemorrhoidal') || path.includes('piles');
  const isY90 = path.includes('y90') || path.includes('radioembolization') || path.includes('tare');
  const isTACE = path.includes('tace') || path.includes('chemoembolization') || path.includes('transarterial-chemoembolization');
  const isEndovascularCoiling = path.includes('endovascular-coiling') || path.includes('coiling') || path.includes('aneurysm');
  const isVaricocele = path.includes('varicocele');
  const isBreastNodule = path.includes('breast-nodule') || path.includes('breast-nodule-vae') || path.includes('vae');
  const isPVC = path.includes('pelvic-vein') || path.includes('pvc') || path.includes('pelvic');
  const isNuclear = path.includes('nuclear-medicine') || path.includes('nuclear');

  const cityLower = (city || '').toLowerCase();
  const variantLower = (variant || '').toLowerCase();
  const isChennai = variantLower === 'chennai' || cityLower === 'chennai';
  const isMadurai = variantLower === 'madurai' || cityLower === 'madurai';
  const isCoimbatore = variantLower === 'coimbatore' || cityLower === 'coimbatore';
  const isBangalore = variantLower === 'bangalore' || cityLower === 'bangalore' || cityLower === 'bengaluru';
  const isMangalore = variantLower === 'mangalore' || cityLower === 'mangalore' || cityLower === 'mangaluru';
  const isDelhi = variantLower === 'delhi' || cityLower === 'delhi';
  const isCitySpecific = isChennai || isMadurai || isCoimbatore || isBangalore || isMangalore || isDelhi;
  const cityName = isChennai ? 'Chennai' : isMadurai ? 'Madurai' : isCoimbatore ? 'Coimbatore' : isBangalore ? 'Bangalore' : isMangalore ? 'Mangalore' : isDelhi ? 'Delhi' : '';

  // Treatment-specific heading
  const getTreatmentHeading = () => {
    if (isFTR) return 'Fertility';
    if (isThyroid) return 'Thyroid Nodule';
    if (isGAE) return 'Knee Pain';
    if (isPAE) return 'Enlarged Prostate';
    if (isUAE) return 'Fibroid';
    if (isVaricocele) return 'Varicocele';
    if (isBreastNodule) return 'Breast Nodule';
    if (isPVC) return 'Pelvic Vein';
    if (isVV) return 'Varicose Veins';
    if (isPFE) return 'Heel Pain';
    if (isDiabeticFoot) return 'Diabetic Foot';
    if (isFrozenShoulder) return 'Frozen Shoulder';
    if (isTAVI) return 'Aortic Valve';
    if (isCTO) return 'Blocked Artery';
    if (isHemorrhoids) return 'Piles';
    if (isY90) return 'Liver Tumor';
    if (isTACE) return 'Liver Tumor';
    if (isEndovascularCoiling) return 'Brain Aneurysm';
    if (isNuclear) return 'Radiosynovectomy';
    return '';
  };
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    locations: '',
    preferredLanguage: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(''); // success, error, or ''

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('');

    try {
      const response = await fetch('https://api.telecrm.in/enterprise/658abddbf911ed2d692b0cf5/autoupdatelead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_TELECRM_API_KEY}`,
        },
        body: JSON.stringify({
          fields: {
            name: formData.name,
            phone: formData.phone,
            locations: formData.locations,
            preferredLanguage: formData.preferredLanguage,
            message: formData.message,
            source: 'Website - Consult Our Experts Form',
          },
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', phone: '', locations: '', preferredLanguage: '', message: '' });
      } else {
        const errorData = await response.json(); // Get error details from the server
        console.error('API Error:', errorData); // Log the specific error
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='w-full py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-white'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative'>
        {/* Vertical Dotted Line */}
        <div className='hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-px bg-repeat-y bg-[length:1px_10px]' style={{ backgroundImage: 'linear-gradient(to bottom, #9ca3af 50%, transparent 50%)' }}></div>
        {/* Left: Steps */}
        <div className='flex flex-col justify-center'>
          <div className='text-center lg:text-left mb-6'>
            {isCitySpecific ? (
              <>
                <h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2D224C] mb-3 leading-tight'>
                  Consult Our <span className='text-[#F7266B]'>{getTreatmentHeading()}</span>
                  <br />
                  Experts In {cityName} Today
                </h2>
                <p className='text-sm sm:text-base text-gray-600 max-w-xl mx-auto lg:mx-0'>
                  Get Expert Guidance And Clarity On The Best Non-Surgical Treatments Tailored To You.
                </p>
              </>
            ) : getTreatmentHeading() ? (
              <>
                <h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2D224C] mb-3 leading-tight'>
                  Consult Our <span className='text-[#F7266B]'>{getTreatmentHeading()}</span>
                  <br />
                  Experts Today
                </h2>
                <p className='text-sm sm:text-base text-gray-600 max-w-xl mx-auto lg:mx-0'>
                  Get Expert Guidance And Clarity On The Best Non-Surgical Treatments Tailored To You.
                </p>
              </>
            ) : (
              <>
                <h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2D224C] mb-3 leading-tight'>
                  Consult With Our <span className='text-[#F7266B]'>Experts</span>
                </h2>
                <p className='text-sm sm:text-base text-gray-600 max-w-xl mx-auto lg:mx-0'>
                  Get Expert Guidance And Clarity On The Best Non-Surgical Treatments Tailored To You.
                </p>
              </>
            )}
          </div>
          <div className='relative pl-8'>
            {steps.map((step, idx) => (
              <div key={idx} className='flex items-start mb-6 last:mb-0'>
                <div className='absolute left-0 flex flex-col items-center'>
                  <div className='w-12 h-12 bg-[#F7266B] rounded-full flex items-center justify-center z-10'>
                    {React.cloneElement(step.icon, { size: 24 })}
                  </div>
                  {idx !== steps.length - 1 && (
                    <div className='w-px h-8 border-l-2 border-dashed border-[#F7266B] mt-2' />
                  )}
                </div>
                <div className='ml-8 pl-4 flex items-center min-h-[3rem]'>
                  <p className='font-bold text-base md:text-lg text-[#2D224C] leading-snug'>
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right: Form */}
        <div className='bg-white rounded-2xl p-6 z-10'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <input
              type='text'
              name='name'
              placeholder='Name'
              value={formData.name}
              onChange={handleInputChange}
              className='w-full px-4 py-3 rounded-lg bg-gray-100 text-base border border-transparent focus:border-[#F7266B] focus:ring-0 outline-none transition'
              aria-label='Name'
              required
            />
            <input
              type='tel'
              name='phone'
              placeholder='Phone Number'
              value={formData.phone}
              onChange={handleInputChange}
              className='w-full px-4 py-3 rounded-lg bg-gray-100 text-base border border-transparent focus:border-[#F7266B] focus:ring-0 outline-none transition'
              aria-label='Phone Number'
              required
            />
            <input
              type='text'
              name='locations'
              placeholder='Locations'
              value={formData.locations}
              onChange={handleInputChange}
              className='w-full px-4 py-3 rounded-lg bg-gray-100 text-base border border-transparent focus:border-[#F7266B] focus:ring-0 outline-none transition'
              aria-label='Locations'
            />
            <select
              name='preferredLanguage'
              value={formData.preferredLanguage}
              onChange={handleInputChange}
              className='w-full px-4 py-3 rounded-lg bg-gray-100 text-base border border-transparent focus:border-[#F7266B] focus:ring-0 outline-none transition'
              aria-label='Preferred Language'
            >
              <option value='' disabled>
                Preferred Language
              </option>
              <option value='English'>English</option>
              <option value='Hindi'>Hindi</option>
              <option value='Tamil'>Tamil</option>
              <option value='Telugu'>Telugu</option>
              <option value='Kannada'>Kannada</option>
              <option value='Malayalam'>Malayalam</option>
              <option value='Bengali'>Bengali</option>
              <option value='Marathi'>Marathi</option>
              <option value='Gujarati'>Gujarati</option>
              <option value='Punjabi'>Punjabi</option>
              <option value='Urdu'>Urdu</option>
            </select>
            <textarea
              name='message'
              placeholder='Message'
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              className='w-full px-4 py-3 rounded-lg bg-gray-100 text-base border border-transparent focus:border-[#F7266B] focus:ring-0 outline-none resize-none transition'
              aria-label='Message'
            />
            <div className='mt-4'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='bg-[#F7266B] text-white font-bold text-lg rounded-lg py-3 w-full hover:bg-pink-700 transition-colors duration-300 disabled:bg-gray-400'
              >
                {isSubmitting ? 'Submitting...' : 'Send Message'}
              </button>
            </div>
            {formStatus === 'success' && (
              <p className='text-green-600 text-center font-semibold'>
                Thank you for reaching out to us. Our expert will contact you shortly.
              </p>
            )}
            {formStatus === 'error' && (
              <p className='text-red-600 text-center font-semibold'>
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
