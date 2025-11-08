import React from "react";

const videoUrls = [
  "https://youtu.be/zMwLTnIUnX4?si=C--38zx7_-voktza",
  "https://youtu.be/we7sPUMcgbc?si=ksz0J2YKEpChAPlc",
  "https://youtu.be/adwnsupBfCo?si=_XfShg6qiRokXehw",
  "https://youtu.be/tkxq0-PhUe0?si=MMloNLZvx6ExHsN2",
  "https://youtu.be/z2AtMviOHX8?si=ZBJ30f-GReygNxmE",
  "https://youtu.be/fyUfJ8OfJjs?si=NBH4QFbSG319KMz5",
  "https://youtu.be/nj4hohs6FLk?si=b7gRl8YI_9gadre3",
  "https://youtu.be/9UYErUyDt3I?si=slmImFesxlCUTDcN",
  "https://youtu.be/DoWb0iGyKEU?si=Iq1KtuoMl0Si2X8M",
  "https://youtu.be/4cbPC9a_j2U?si=zPNdIAgJVaj-ru5s",
];

// Extract the YouTube video ID from various URL formats
const getYouTubeId = (url) => {
  try {
    const short = url.match(/youtu\.be\/(.+?)(\?|$)/);
    if (short?.[1]) return short[1];

    const vParam = url.match(/[?&]v=([^&]+)/);
    if (vParam?.[1]) return vParam[1];

    const embed = url.match(/\/embed\/([^?]+)/);
    if (embed?.[1]) return embed[1];

    const parts = new URL(url);
    return parts.pathname.split("/").filter(Boolean).pop();
  } catch {
    return "";
  }
};

const TestiominalCard = ({ id, title, description }) => {
  const [playing, setPlaying] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const thumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  const embedSrc = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1`;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-video bg-black">
        {!playing ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group w-full h-full relative"
            aria-label="Play testimonial video"
          >
            <img
              src={thumb}
              alt={title || "Patient testimonial"}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#ff3576] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </button>
        ) : (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={embedSrc}
            title={title || "Patient testimonial"}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {(title || description) ? (
        <div className="p-4">
          {title ? (
            <h3 className="text-[#2d2552] font-semibold text-base mb-1">{title}</h3>
          ) : null}
          {description ? (
            <>
              <p className="text-sm text-gray-600 leading-relaxed">
                {expanded || description.length <= 160
                  ? description
                  : `${description.slice(0, 160)}...`}
              </p>
              {description.length > 160 && (
                <button
                  type="button"
                  onClick={() => setExpanded((e) => !e)}
                  className="mt-2 text-xs font-semibold text-[#ff3576] hover:text-pink-600"
                >
                  {expanded ? 'Show less' : 'Read more'}
                </button>
              )}
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

const Testiominal_main = () => {
  const items = videoUrls
    .map((u) => ({ id: getYouTubeId(u), url: u }))
    .filter((v) => v.id);

  const [showAll, setShowAll] = React.useState(false);
  const VISIBLE_COUNT = 6;
  const visibleItems = showAll ? items : items.slice(0, VISIBLE_COUNT);

  // Optional titles/descriptions for specific videos (showing for one video as requested)
  const descriptionsById = {
    // First video example description (edit as desired)
    [items[0]?.id]:
      'In this heartfelt testimonial, Ms. Nivedha from Tamil Nadu shares her experience about the treatment her mother received with us. She talks about the care, guidance, and support provided by our team throughout the journey. Her story reflects our dedication to delivering compassionate healthcare and successful outcomes for every patient and their family.',
    [items[1]?.id]:
      'Mrs. Nirmala shares her experience of how non-surgical thyroid nodule treatment helped her recover safely and effectively, without the need for surgery.',
    [items[2]?.id]:
      'Mrs. Yesodha shares how uterine fibroid embolization (UFE) transformed her life—relieving years of heavy menstrual bleeding, pain, and discomfort. UFE gave her renewed vitality and freedom from debilitating symptoms.',
    [items[3]?.id]:
      'Our patient, Mrs. Radha, had been suffering from chronic knee pain for almost 6 years. Here is her story of how she got her treatment, genicular artery embolization (GAE) done through Medagg Healthcare. Have a look at her sharing the experience resolving the problem.',
    [items[4]?.id]:
      'Here is a successful story of our patient who has undergone Prostate Artery Embolization (PAE). He shares his experience with Medagg and how he has gone through the treatment with our help.',
    [items[5]?.id]:
      'Stress urinary incontinence is now readily treatable, ensuring that women no longer have to endure this silent affliction. Positive patient feedback reflects this advancement.',
    [items[6]?.id]:
      'Our satisfied patient underwent uterine fibroid embolization and was freed from fibroids without the need for surgery. Here is their feedback on the experience.',
    [items[7]?.id]:
      'Prostate Artery Embolization (PAE) represents an innovative, non-surgical treatment option with minimal side effects. A patient has expressed extreme satisfaction with our services, sharing his positive feedback.',
    [items[8]?.id]:
      'Laser circumcision represents a significant advancement in treating tight foreskin. As the procedure utilizes a laser to make the incision, it involves no cuts or bleeding. The patient was highly satisfied with the outcome. For further details, consider listening to their feedback.',
    [items[9]?.id]:
      "Varicose veins are swollen, prominent veins that typically appear in the legs and often result in pain and discomfort. Laser treatments are sophisticated procedures that can effectively treat varicose veins, as evidenced by our patient’s positive feedback.",
  };

  const titlesById = {
    [items[0]?.id]: 'Rapid Recovery with Minimally Invasive Treatment',
  };

  return (
    <section className="py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">
            <span className="text-[#2d2552]">Patient </span>
            <span className="text-[#ff3576]">Testimonial</span>
          </h2>

          {/* View All / Show Less */}
          <button
            onClick={() => setShowAll((s) => !s)}
            className="text-[#ff3576] font-semibold hover:text-pink-600 transition-colors text-sm sm:text-base"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>

        {/* Grid: 1 / 2 / 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleItems.map((v, idx) => (
            <TestiominalCard
              key={v.id + idx}
              id={v.id}
              title={titlesById[v.id] /* add more titles as needed */}
              description={descriptionsById[v.id]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testiominal_main;