import React from 'react';

const toc = [
  { id: 'consent', label: 'Consent' },
  { id: 'information-we-collect', label: 'Information we collect' },
  { id: 'ways-of-collection', label: 'Ways of collection' },
  { id: 'use-of-your-data', label: 'Use of your data' },
  { id: 'sharing-your-information', label: 'Sharing your information' },
  { id: 'data-protection-rights', label: 'Your data protection rights' },
  { id: 'retention', label: 'Retention of your information' },
  { id: 'security', label: 'Security safeguards' },
  { id: 'amendment', label: 'Amendment or modification' },
  { id: 'contact', label: 'Contact information' },
];

function PrivacyMain() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Table of Content */}
          <aside className="md:col-span-1">
            <div className="sticky top-28">
              <h3 className="text-sm font-bold text-[#2d2552] mb-3">Table of Content</h3>
              <nav className="space-y-2">
                {toc.map(item => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm px-3 py-2 rounded-md text-[#2d2552] hover:bg-gray-100"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Welcome Section */}
            <section aria-labelledby="welcome-title">
              <h2 id="welcome-title" className="text-2xl sm:text-3xl font-extrabold text-[#2d2552]">
                Welcome to Our Privacy Policy
              </h2>

              <div className="prose max-w-none mt-5 text-gray-700">
                <p>
                  <strong>Medagg Healthcare Private Limited</strong> (“we”, “our”, “us”) operates and
                  manages <strong>www.medagghealthcare.com</strong> (“Website”). We are committed to
                  advancing Interventional Radiology (IR) — delivering precise, image-guided, minimally
                  invasive treatments that improve clinical outcomes while reducing recovery time. Through our
                  platform, we aim to provide affordable, high-quality healthcare services to all users
                  (“<strong>you</strong>”, “<strong>your</strong>”).
                </p>
                <p>
                  We act as your healthcare assistant, helping you navigate appointments, non-surgical procedures,
                  second opinions, diagnostics, and the entire journey from discovery to recovery (“<strong>Services</strong>”).
                </p>
                <p>
                  We value your privacy and are committed to ensuring that any information you share with us through the
                  Website or during the use of our Services is protected. This Privacy Policy explains how we collect,
                  store, use, disclose, and/or transfer information identifiable to you (“<strong>Personal Information</strong>”)
                  when you interact with our Website or when you avail our Services..
                </p>
              </div>
            </section>

            {/* Consent */}
            <section id="consent" className="mt-10" aria-labelledby="consent-title">
              <h3 id="consent-title" className="text-xl font-bold text-[#2d2552]">
                1. Consent:
              </h3>

              <div className="mt-4 space-y-6 text-gray-700">
                <div>
                  <p className="font-semibold">1.1.</p>
                  <p className="mt-1">
                    By accessing our Site and/or by using and profiting from any of our services, it is considered you have
                    read and understood the Privacy policy and you consent to the collection, capacity, usage, disclosure
                    and/or exchange of your data within the way stated in this Privacy Policy.
                  </p>
                  <p className="mt-2 font-semibold text-[#2d2552]">
                    IF YOU DO NOT AGREE WITH ANY OR ALL OF THE FOLLOWING TERMS OF THIS PRIVACY POLICY, PLEASE DO NOT ACCESS
                    AND/OR USE WEBSITE OR AVAIL OUR SERVICES.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">1.2.</p>
                  <p className="mt-1">
                    By accessing our Site and/or by availing our services on behalf of a person such as your child or any
                    individual not able of giving consent, or an employee, it is understood that the person accessing the
                    website is the legal guardian of the child or is authorized by such person or substance, as the case
                    may be, to acknowledge the Privacy Policy on behalf of such person or substance, and consent to our
                    collection, capacity, utilization, divulgence and/or exchange of such individual’s or entity’s data as
                    stated in the privacy policy.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">1.3.</p>
                  <p className="mt-1">
                    The User’s consent might be taken for the reason of sharing information collected by Medagg healthcare
                    with the hospitals and/or insurance agency and/or EMI Benefit suppliers.
                  </p>
                </div>
              </div>
            </section>

            {/* Placeholders for future sections to match TOC (empty content for now) */}
            <section id="information-we-collect" className="mt-10">
              <h3 className="text-xl font-bold text-[#2d2552]">2. Information we collect</h3>
              <div className="mt-3 space-y-6 text-gray-700">
                <div>
                  <p className="font-semibold">2.1.</p>
                  <p className="mt-1">
                    We may collect, utilize, store, disclose and/or transfer data approximately you as stated in the
                    privacy policy. The data may contain “Personal Information” as well as “Sensitive Personal Information”
                    (as defined hereinafter).
                  </p>
                </div>

                <div>
                  <p className="font-semibold">2.2. Personal Data</p>
                  <p className="mt-1">
                    Personal Data implies any data around you from which you’ll be recognized, counting but not limited to:
                  </p>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>
                      (a) <span className="font-medium">Identity information:</span> your full name, age, date of birth and gender;
                    </li>
                    <li>
                      (b) <span className="font-medium">Contact information:</span> your contact number, e-mail address, residential address (present and permanent);
                    </li>
                    <li>
                      (c) <span className="font-medium">Technical information:</span> internet protocol address, cookie data, browser type, browser language, referring URL,
                      errors generated at the time of usage of Website, date and time zone.
                    </li>
                    <li>
                      (d) <span className="font-medium">Usage information:</span> includes information about how you use the Website including but not limited to content viewed,
                      content shared, pages visited on the Website, appointments taken and/or consultations booked by you, by using our Services;
                    </li>
                    <li>
                      (e) Your insurance related information; and
                    </li>
                    <li>
                      (f) Any other personal information that is willingly and freely shared by you on the Website or in the course of availing our Services.
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">2.3. Sensitive Personal Information</p>
                  <p className="mt-1">
                    Sensitive Personal Information means personal information revealing, related to, or constituting, as may be applicable:
                  </p>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>(a) Username and password keys to enable access to our Website;</li>
                    <li>(b) Financial information such as bank account details, credit and debit card details or any other payment instrument details;</li>
                    <li>(c) Health information including but not limited to medical records, symptoms, and appointment or consultations history, medications, physical, psychological and mental health condition and surgical procedures;</li>
                    <li>(d) Official identifier;</li>
                    <li>(e) Biometric information;</li>
                    <li>(f) Genetic information;</li>
                    <li>(g) Transgender status; and</li>
                    <li>(h) Intersex status;</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">2.4.</p>
                  <p className="mt-1">
                    We may collect your data included in your individual profile which is made on the Site after you register,
                    any Individual Data and/or Sensitive Individual Data contained in any enquiry made by you with respect to our Services,
                    and any Individual Data and/or sensible Individual Data contained in or in connection to any communication that you simply share with us.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">2.5.</p>
                  <p className="mt-1">
                    However, we may collect any data where your identity has been anonymised and isn’t in any way personally identifiable to you.
                    We may gather any such data that’s freely accessible within the open space without your consent.
                  </p>
                </div>
              </div>
            </section>

            <section id="ways-of-collection" className="mt-10">
              <h3 className="text-xl font-bold text-[#2d2552]">3. Ways of collection</h3>
              <div className="mt-3 space-y-6 text-gray-700">
                <div>
                  <p className="font-semibold">3.1.</p>
                  <p className="mt-1">
                    We may use different methods to collect information from and about you, including but not limited to:
                  </p>
                  <ul className="list-disc ml-5 mt-2 space-y-2">
                    <li>
                      (a) <span className="font-medium">Data provided by you during direct interactions with us:</span>
                      You may give us information during the course of receiving any Services or otherwise, when you access our Website,
                      use any of the features of our Website, when you register on our Website, by filling in forms (electronically or physically), via e-mail,
                      phone, social media platforms (including but not limited to Facebook or YouTube), messages (including but not limited to short message service, WhatsApp),
                      or by contacting any of our representatives/employees, or when you give feedback to us.
                    </li>
                    <li>
                      (b) <span className="font-medium">Automatic data collection tools:</span> as you interact with our Website, we may automatically collect technical information including but not limited to
                      usage data about your browsing actions and patterns, and such other information as mentioned in clause 2.2 (c) of this Privacy Policy.
                      We collect this personal data by using cookies, web beacons, server logs and other similar technologies.
                    </li>
                    <li>
                      (c) <span className="font-medium">Data from third parties:</span> we may collect data about you from our authorized third parties including but not limited to physicians, doctors, hospitals,
                      clinical labs, diagnostic labs, pharmacies, payment gateways and advertisers, that may include your Personal Data and/or Sensitive Personal Data.
                    </li>
                  </ul>
                </div>

                <p className="text-gray-700">Medagg Healthcare does not knowingly collect Personal Information from children.</p>
              </div>
            </section>

            <section id="use-of-your-data" className="mt-10">
              <h3 className="text-xl font-bold text-[#2d2552]">4. Use of your data</h3>
              <div className="mt-3 space-y-6 text-gray-700">
                <div>
                  <p className="font-semibold">4.1.</p>
                  <p className="mt-1">
                    We may use your data only for lawful purposes and for which you have given your consent. We believe in using any data provided by you fairly and in a transparent manner. We may use your data for the following lawful purposes: Where it is necessary for the performance of a contract (already entered into or prior to entering into), and/or where it is necessary for fulfilling legitimate interests pursued by us or by an authorized third party:
                  </p>
                  <ul className="list-disc ml-5 mt-2 space-y-2">
                    <li>
                      (a) We may collect data including but not restricted to your personality, contact subtle elements, therapeutic conditions and medical history in arrange to (i) give you with an estimated cost for performing the specified procedure or surgery; (ii) provide you with data around expert surgeons who perform required procedure or surgery; (iii) give you with data around best hospitals which encourages required procedure or surgery; and (iv) where it is fundamental for arrangement of services, including medical condition and the arrangement of healthcare or treatment.
                    </li>
                    <li>
                      (b) We may collect data including but not limited to your identity, contact details, medical conditions and medical history and financial data in order to (i) provide you with information regarding financing/ EMI options of procedures or surgery; (ii) facilitate immediate, easy and secured bill payments; and (iii) assist you in claiming your medical insurance during the provision of Services.
                    </li>
                    <li>
                      (c) We may collect information including but not limited to your identity, contact details and communications in order to (i) get in touch with you via email, phone, social media platforms (including but not limited to Facebook or YouTube), messages (including but not limited to short message service, WhatsApp), for appointments, consultations, technical issues, payment reminders and for providing other information; (ii) provide you effective, efficient, appropriate and most affordable treatment; (iii) maintain valuable communications with you; and (iv) retain call records for internal training and quality purposes.
                    </li>
                    <li>
                      (d) We may collect information including but not limited to your identity, contact details and technical data in order to (i) carry out research and analytics for improving our Website and Services; (ii) maintain security and service quality of our Website and Services; (iii) bring to you relevant Website information and to understand the usefulness of such information; and (iv) Enable us to monitor your use of the Website and Services.
                    </li>
                    <li>
                      (e) Where we are subjected to comply with any legal or regulatory obligation under any applicable law.
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">4.2.</p>
                  <p className="mt-1">
                    In order to protect your vital interests as also of any other natural person, we may collect, use and share your information, including but not limited to medical records, symptoms, consultations, medical history and medications to prevent a serious threat to your health and safety or that of others. Your information will only be shared by us with persons, authorities or organization that may help you in preventing such a threat.
                  </p>
                </div>
              </div>
            </section>

            <section id="sharing-your-information" className="mt-10">
              <h3 className="text-xl font-bold text-[#2d2552]">5. Sharing your information</h3>
              <div className="mt-3 space-y-6 text-gray-700">
                <div>
                  <p className="font-semibold">5.1. Authorized person</p>
                  <p className="mt-1">
                    We may share information about you with persons including employees and processors appointed by us to collect, use, share, disclose and/or transfer information and/or provide Services on our behalf. However, all disclosures of your information with authorized persons are subject to confidentiality obligations to reasonably protect your information.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">5.2. Data analytics</p>
                  <p className="mt-1">
                    We may share information about you with authorized third parties hired to track the Website usage and analyze your information. Data analytics is performed in order to better understand usage of our Services and enhance the Website experience by helping us make better business decisions. However, all such third parties are subject to confidentiality obligations to reasonably protect your information.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">5.3. Performance of a contract</p>
                  <p className="mt-1">
                    We may share your information including but not limited to medical records, symptoms, consultations, medical history and medications, with doctors, hospitals, and medical establishments including but not limited to clinical labs and diagnostic labs, in order to enforce any contract between us.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">5.4. Business development</p>
                  <p className="mt-1">
                    We may share anonymised data which does not personally identify you with prospective businesses in order to expand our field of services.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">5.5. Compliance of legal obligation or dispute resolution</p>
                  <p className="mt-1">
                    We may share information about you in compliance with any law and/or order of any court or tribunal. We may also disclose your information in order to resolve any dispute.
                  </p>
                </div>

                <p className="mt-2 text-gray-700">
                  Please note that except as stated above, we will not share your identifiable information with any other person without your consent. However, we reserve the right to share anonymised data for the purposes we deem fit.
                </p>
              </div>
            </section>

            <section id="data-protection-rights" className="mt-10">
              <h3 className="text-xl font-bold text-[#2d2552]">6. Your data protection rights</h3>
              <div className="mt-3 space-y-6 text-gray-700">
                <div>
                  <p className="font-semibold">6.1. The right to withdraw your consent</p>
                  <p className="mt-1">
                    You have the right to withdraw your consent for the collection, storage, usage, disclosure and/or transfer of information by us at any time. However, on withdrawal of your consent, we might have the option not to provide Services for which your information was obtained.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">6.2. The right to access your information</p>
                  <p className="mt-1">
                    You have the right to access your information held by us and seek details relating to (i) purposes of collection, storage, usage, disclosure and/or transfer of your information; (ii) the categories of concerned information; and/or (iii) the third party or recipient to whom the information is disclosed. Upon making a request, you will receive a brief summary of your information being collected, stored, used, disclosed or transferred by us for the purposes mentioned under clause 4 of this Privacy Policy.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">6.3. The right to correct your information</p>
                  <p className="mt-1">
                    You have the right to request us for correction of any inaccurate information, completion of incomplete data or updating any outdated data about you.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">6.4. The right to erasure of your information</p>
                  <p className="mt-1">
                    You have the right to request us to delete or erase your information (i) when it is no longer necessary to use your information for our purposes; (ii) where you have withdrawn your consent to collection, storage, usage, disclosure and/or transfer of information; (iii) where you have objected to using your information as per clause 6.6 of this Privacy Policy; and/or (iv) where we have unlawfully collected, stored, used, disclosed and/or transferred your information.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">6.5. The right to restrict processing</p>
                  <p className="mt-1">
                    You have the right to request us to restrict the collection, storage, usage, disclosure and/or transfer of your information in the following circumstances: (i) when you want to establish information’s accuracy; (ii) where our use of your information is unlawful but you do not want us to erase such information; (iii) where we no longer need to collect, store, use, disclose and/or transfer your information, but you need us to hold your information as you need it to establish, exercise or defend legal claims; and/or (iv) when you have objected to our collection, storage, usage, disclosure and/or transfer of your information, but we need to verify whether we have overriding legitimate grounds to use such information.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">6.6. The right to object to processing</p>
                  <p className="mt-1">
                    You have the right to object to our collection, storage, usage, disclosure and/or transfer of information: (i) where we are relying on a legitimate interest and there is something about your particular situation which makes you want to object to processing on this ground as you feel it impacts your fundamental rights and freedoms; and (ii) where collection, storage, usage, disclosure and/or transfer of your information is used for marketing purposes.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">6.7. The right to information portability</p>
                  <p className="mt-1">
                    You have the right to transmit your information from us to any other service provider.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">6.8. Rights in relation to automated decision making and profiling</p>
                  <p className="mt-1">
                    You have the right not to be subject to a decision based solely on automated processing, including profiling. We do not take any decision about you based on automated decision making and profiling, unless we take your explicit consent for the same.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">6.9. How to exercise your rights</p>
                  <p className="mt-1">
                    If you wish to make a request for invoking any of your above mentioned rights, you may contact us at <a href="mailto:contact@medagghealthcare.com" className="text-[#ff3576] underline">contact@medagghealthcare.com</a>. We may take all reasonable efforts to incorporate the changes within a reasonable time in accordance with applicable law.
                  </p>
                </div>
              </div>
            </section>

            <section id="retention" className="mt-10">
              <h3 className="text-xl font-bold text-[#2d2552]">7. Retention of your information</h3>
              <div className="mt-3 space-y-6 text-gray-700">
                <div>
                  <p className="font-semibold">7.1.</p>
                  <p className="mt-1">
                    We may retain all or any of your information for a necessary period to fulfill the purposes outlined in clause 4 of this Privacy Policy. However, your information may be retained for a longer period in order to comply with any legal obligation.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">7.2.</p>
                  <p className="mt-1">
                    We may retain all or any of your information in anonymised form without giving you any notice, for such period as may be required for the purpose of, including but not limited to, internal usage, business development, scientific research purposes and statistical purposes.
                  </p>
                </div>
              </div>
            </section>

            <section id="security" className="mt-10">
              <h3 className="text-xl font-bold text-[#2d2552]">8. Security safeguards</h3>
              <div className="mt-3 space-y-6 text-gray-700">
                <div>
                  <p className="font-semibold">8.1.</p>
                  <p className="mt-1">
                    Information collected from you is stored on a secured network/server and access to such information is restricted only to authorized personnel.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">8.2.</p>
                  <p className="mt-1">
                    Any communications between your browser and portions of the Website containing personally identifiable information are protected with Secure Socket Layer (SSL) encryption. This encryption helps to protect your information while it is being transmitted. Once we receive your information, we strive to maintain the physical and electronic security of your personal information using reasonable efforts.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">8.3.</p>
                  <p className="mt-1">
                    We maintain backup files as a protection against natural disasters, equipment failures, or other disruptions. These backup files help us to protect your personal information because they lower the risk of losing valuable data.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">8.4.</p>
                  <p className="mt-1">
                    We have implemented managerial and operational policies as well as adopted business practices to prevent any misuse, unauthorized access, modification, disclosure or destruction of your information.
                  </p>
                </div>
              </div>
            </section>

            <section id="amendment" className="mt-10">
              <h3 className="text-xl font-bold text-[#2d2552]">9. Amendment or modification</h3>
              <div className="mt-3 space-y-6 text-gray-700">
                <div>
                  <p className="font-semibold">9.1.</p>
                  <p className="mt-1">
                    We reserve the right to amend or modify any of the terms of this Privacy Policy at any time as we deem fit. All changes to this Privacy Policy will be effective immediately upon being posted on our Website. However, in order to prevent any confusion an effective date will be provided. In case of any material changes to this Privacy Policy, we will notify you by e-mail and clearly post the changes on our Website.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">9.2.</p>
                  <p className="mt-1">
                    If you continue the use of our Website or our Services after the effective date of a modified Privacy Policy, it will indicate your consent to any amended or modified terms. It is hereby clarified that the Privacy Policy shall also include any amendments or modifications thereof.
                  </p>
                </div>
              </div>
            </section>

            <section id="contact" className="mt-10">
              <h3 className="text-xl font-bold text-[#2d2552]">10. Contact information</h3>
              <div className="mt-3 space-y-6 text-gray-700">
                <div>
                  <p className="font-semibold">10.1.</p>
                  <p className="mt-1">If you have any questions or concerns about this Privacy Policy, you may contact us at the following:</p>
                  <ul className="mt-2 space-y-1">
                    <li><span className="font-medium">Address:</span> Medagg Healthcare,  Phase-1, Sri Harsha 30, villa no 4, Church Rd, Kandhanchavadi, Perungudi, Chennai, Tamil Nadu 600096.</li>
                    <li><span className="font-medium">Telephone:</span> +91 9363656010</li>
                    <li><span className="font-medium">Write us at:</span> <a href="mailto:contact@medagghealthcare.com" className="text-[#ff3576] underline">contact@medagghealthcare.com</a></li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">10.2.</p>
                  <p className="mt-1">If you have any further grievances, queries, claims, complaints, or to exercise your rights with respect to our collection, usage, sharing, disclosure and/or transfer of your information, you may contact the below mentioned:</p>
                  <ul className="mt-2 space-y-1">
                    <li><span className="font-medium">Grievance contact:</span> <a href="mailto:contact@medagghealthcare.com" className="text-[#ff3576] underline">contact@medagghealthcare.com</a></li>
                    <li><span className="font-medium">Phone:</span> +91 9363656010</li>
                    <li><span className="font-medium">Address:</span> Medagg Healthcare,  Phase-1, Sri Harsha 30, villa no 4, Church Rd, Kandhanchavadi, Perungudi, Chennai, Tamil Nadu 600096.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">10.3.</p>
                  <p className="mt-1">Any grievances, queries, claims, complaints, or rights exercised with regard to this Privacy Policy shall be answered or resolved within a period of 30 (thirty) days from the date of such receipt.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyMain;
