// Searchable treatments data for Navbar search - organized by category
// Keep in sync with Treatmentnavbar treatments if new ones are added

export const treatmentCategories = [
  {
    id: 'womens-health',
    name: "Women's Health",
    items: [
      { title: 'Uterine Fibroids', path: '/uterine-artery-embolization-uae', keywords: ['uterine', 'fibroids', 'uae'] },
      { title: 'Fallopian Tube Block', path: '/fallopian-tube-recanalization-ftr', keywords: ['fallopian', 'tube', 'ftr', 'block'] },
      { title: 'Breast Nodule VAE', path: '/breast-nodule-vae', keywords: ['breast', 'vae', 'nodule'] },
      { title: 'Breast Nodule Cryoablation', path: '/breast-nodule-cryoablation', keywords: ['breast', 'cryoablation', 'cryo'] },
      { title: 'Breast Nodule RFA', path: '/breast-nodule-rfa', keywords: ['breast', 'rfa', 'radiofrequency'] },
    ],
  },
  {
    id: 'mens-health',
    name: "Men's Health",
    items: [
      { title: 'Enlarged Prostate', path: '/prostate-artery-embolization-pae', keywords: ['prostate', 'pae', 'enlarged'] },
      { title: 'Varicocele', path: '/varicocele-embolization', keywords: ['varicocele', 'embolization'] },
    ],
  },
  {
    id: 'pain-joint',
    name: 'Pain & Joint',
    items: [
      { title: 'Knee Pain', path: '/genicular-artery-embolization-gae', keywords: ['knee', 'pain', 'gae', 'joint'] },
      { title: 'Frozen Shoulder', path: '/frozen-shoulder', keywords: ['frozen', 'shoulder', 'capsulitis'] },
      { title: 'Plantar Fascitis', path: '/plantar-fascial-embolization', keywords: ['plantar', 'fascitis', 'foot', 'heel'] },
    ],
  },
  {
    id: 'common-health',
    name: 'Common Health',
    items: [
      { title: 'Thyroid Nodule', path: '/thyroid-nodule-ablation', keywords: ['thyroid', 'nodule', 'ablation'] },
      { title: 'Hemorrhoids / Piles', path: '/piles-hemorrhoids', keywords: ['hemorrhoids', 'piles'] },
      { title: 'Varicose Veins', path: '/varicose-vein', keywords: ['varicose', 'veins', 'leg'] },
      { title: 'Diabetic Foot', path: '/diabetic-foot', keywords: ['diabetic', 'foot', 'wound'] },
      { title: 'Y-90 Radioembolization', path: '/y90-radioembolization-tare', keywords: ['y90', 'radioembolization', 'tare', 'cancer'] },
    ],
  },
  {
    id: 'interventional-neurology',
    name: 'Interventional Neurology',
    items: [
      { title: 'Endovascular Coiling', path: '/endovascular-coiling', keywords: ['coiling', 'aneurysm', 'neurology'] },
      { title: 'RFA for AVM', path: '/radiofrequency-ablation-for-avm', keywords: ['rfa', 'avm', 'malformation'] },
    ],
  },
  {
    id: 'interventional-cardiology',
    name: 'Interventional Cardiology',
    items: [
      { title: 'Transcatheter Aortic Valve', path: '/transcatheter-aortic-valve-replacement', keywords: ['tavr', 'valve', 'heart', 'aortic'] },
      { title: 'Chronic Total Occlusion', path: '/cto', keywords: ['cto', 'occlusion', 'blockage'] },
      { title: 'RFA for Arrhythmia', path: '/rfa', keywords: ['rfa', 'arrhythmia', 'heart', 'rhythm'] },
    ],
  },
];

// Flatten all treatments for simple search
export const searchableTreatments = treatmentCategories.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, category: cat.name }))
);

export function filterTreatments(query) {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();

  // Group results by category
  const resultsByCategory = {};

  searchableTreatments.forEach((t) => {
    const match =
      t.title.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.includes(q));

    if (match) {
      if (!resultsByCategory[t.category]) {
        resultsByCategory[t.category] = [];
      }
      resultsByCategory[t.category].push(t);
    }
  });

  // Convert to array format
  return Object.entries(resultsByCategory).map(([category, items]) => ({
    category,
    items,
  }));
}
