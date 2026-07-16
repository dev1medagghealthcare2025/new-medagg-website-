import { treatments } from './Treatmentnavbar';

const TREATMENT_ICON_MAP = {
  'Enlarged Prostate': 'PAE.jpg',
  'Knee Pain': 'GAE_Compare2.jpg',
  'Thyroid Nodule': 'Thyroid Nodul Ablation.jpg',
  'Varicocele': 'Varicocele Embolization.jpg',
  'Fallopian Tube Block': 'Fallopian Tube Recanalization.jpg',
  'Uterine Fibroids': 'Uterine Fibroid Embolization.jpg',
  'Hemorrhoids/Piles': 'Hemorrhoidal_icon.png',
  'Hemorrhoids': 'Hemorrhoidal_icon.png',
  'Y-90 Radioembolization': 'Y-90 Radioembolization_1.png',
  'TARE': 'Y-90 Radioembolization_1.png',
  'Transarterial Chemoembolization (TACE)': 'TACE_Compare3.png',
  'Breast Nodule VAE': 'Breast_nodule_icon.svg',
  'Breast Nodule Cryoablation': 'Breast_nodule_icon.svg',
  'Breast Nodule Radiofrequency Ablation': 'Breast_nodule_icon.svg',
  'Plantar Fascitis': 'planter_icon.jpg',
  'Varicose Veins': 'Varicose Veins.jpg',
  'Diabetic Foot': 'diabetic_png3.png',
  'Frozen Shoulder': 'frozen shouder.png',
  'Pelvic Vein Embolization': 'Pelvic.png',
  'Endovascular Coiling': 'Endovascular coiling.svg',
  'RFA Treatment For AVM': 'avm.svg',
  'Transcatheter Aortic Valve Implantation': 'Transcatheter Aortic Valve Replacement.jpg',
  'Chronic Total Occlusion': 'chronic.svg',
  'Radiofrequency Ablation For Arrhythmia': 'rfa for Ar.svg',
};

function flattenTreatmentsForChips(items) {
  const chips = [];

  for (const item of items) {
    if (item.path) {
      chips.push({
        title: item.title,
        path: item.path,
        icon: TREATMENT_ICON_MAP[item.title] || null,
      });
      if (item.subTreatments) {
        for (const sub of item.subTreatments) {
          if (sub.path && sub.path !== item.path) {
            chips.push({
              title: sub.title,
              path: sub.path,
              icon: TREATMENT_ICON_MAP[sub.title] || TREATMENT_ICON_MAP[item.title] || null,
            });
          }
        }
      }
    } else if (item.subTreatments) {
      for (const sub of item.subTreatments) {
        if (sub.path) {
          chips.push({
            title: sub.title,
            path: sub.path,
            icon: TREATMENT_ICON_MAP[sub.title] || TREATMENT_ICON_MAP[item.title] || null,
          });
        } else if (sub.subTreatments) {
          for (const leaf of sub.subTreatments) {
            if (leaf.path) {
              chips.push({
                title: leaf.title,
                path: leaf.path,
                icon: TREATMENT_ICON_MAP[leaf.title] || null,
              });
            }
          }
        }
      }
    }
  }

  return chips;
}

const orderedTreatments = [...treatments];
const interventionalIdx = orderedTreatments.findIndex((t) => t.title === 'Interventional');
if (interventionalIdx !== -1) {
  const [interventional] = orderedTreatments.splice(interventionalIdx, 1);
  orderedTreatments.push(interventional);
}

export const MOBILE_TREATMENT_CHIPS = flattenTreatmentsForChips(orderedTreatments);
