// Seed data for Child Clinic — initial Firestore population
// Run seedFirestore() in browser console after importing

import { db } from '../firebase/config'
import { collection, addDoc, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore'

export const seedSpecialities = [
  {
    name: 'General Pediatrics',
    slug: 'general-pediatrics',
    category: 'Specialized Unit',
    icon: '👶',
    description: 'Comprehensive medical care for infants, children, and adolescents in Saharsa. Our general pediatric department is the cornerstone of Child Clinic, providing expert management for common childhood illnesses, infectious diseases, and chronic conditions. Dr. Anshuman utilizes international protocols to ensure every child in the Kosi region receives the highest standard of care, focusing on both physical health and psychological well-being.',
    available: 'OPD Hours',
    features: ['Acute Infection Management', 'Growth & Development Screening', 'Childhood Obesity Clinic', 'Asthma & Allergy Care', 'Behavioral Consultations', 'Routine Health Checkups'],
    faqs: [
      { q: 'What age groups do you treat?', a: 'We treat children from birth through late adolescence (up to 18 years).' },
      { q: 'How often should my child have a wellness checkup?', a: 'We recommend monthly checks for infants, and annual wellness exams for older children.' },
      { q: 'Do you provide adolescent counseling?', a: 'Yes, we provide guidance on physical and emotional changes during adolescence.' },
      { q: 'Are walk-ins available for general checkups?', a: 'While we prioritize appointments, we do accommodate walk-ins during OPD hours.' }
    ],
    order: 0
  },
  {
    name: 'Neonatology (NICU)',
    slug: 'neonatology-nicu',
    category: 'Specialized Unit',
    icon: '🏥',
    description: 'State-of-the-art Level II Neonatal Intensive Care Unit (NICU) in Saharsa designed for the most vulnerable newborns. We specialize in the care of premature infants, low birth weight babies, and newborns with respiratory or cardiac distress. Our unit features advanced incubators, LED phototherapy for jaundice, and continuous multipara monitoring, providing a critical safety net for families across the entire Kosi division.',
    available: '24 × 7',
    features: ['Premature & LBW Baby Care', 'Advanced Respiratory Support', 'LED Phototherapy Units', 'Exchange Transfusion', 'Neonatal Sepsis Management', 'Continuous Vital Monitoring'],
    faqs: [
      { q: 'What is a Level II NICU?', a: 'A Level II NICU provides specialized care for stable premature infants and those recovering from serious illnesses.' },
      { q: 'Are parents allowed in the NICU?', a: 'Yes, we encourage parental presence and skin-to-skin contact (Kangaroo Mother Care) whenever medically possible.' },
      { q: 'How do you prevent infections in the NICU?', a: 'We maintain strict hygiene protocols, including mandatory hand sanitization and restricted entry.' },
      { q: 'Do you have 24/7 nursing staff?', a: 'Yes, our NICU is staffed by specialized neonatal nurses 24 hours a day, 7 days a week.' }
    ],
    order: 1
  },
  {
    name: 'Vaccination Centre',
    slug: 'vaccination-centre',
    category: 'Specialized Unit',
    icon: '💉',
    description: 'A dedicated, high-tech immunization facility in Saharsa strictly adhering to IAP (Indian Academy of Pediatrics) and WHO guidelines. We maintain an uncompromising cold-chain system to guarantee the potency of every vaccine. From painless injections to comprehensive record-keeping, we provide a stress-free vaccination experience for children throughout Saharsa and neighbouring districts.',
    available: 'OPD Hours',
    features: ['Painless Vaccination Options', 'International Standard Cold-Chain', 'Digital Immunization Records', 'Post-Vaccination Monitoring', 'Catch-up Vaccination Plans', 'Hepatitis & Flu Specialists'],
    faqs: [
      { q: 'Do you provide painless vaccines?', a: 'Yes, we offer acellular (painless) vaccines for several diseases to minimize discomfort and fever.' },
      { q: 'What if we missed a scheduled vaccine?', a: 'Don\'t worry. We provide customized "Catch-up" schedules to ensure your child stays protected.' },
      { q: 'Is it safe to give multiple vaccines at once?', a: 'Yes, giving multiple vaccines during one visit is safe and common practice recommended by IAP.' },
      { q: 'Do you maintain a digital record of vaccines?', a: 'Yes, we keep digital records and provide reminders for upcoming vaccination dates.' }
    ],
    order: 2
  },
  {
    name: 'Pediatric Emergency',
    slug: 'pediatric-emergency',
    category: 'Specialized Unit',
    icon: '🚨',
    description: '24/7 dedicated pediatric emergency response team in Saharsa. Our unit is equipped to handle life-threatening situations, including high-grade fevers, respiratory failure, accidental poisoning, and severe dehydration. With Dr. Anshuman and specialized staff available round-the-clock, we are the trusted emergency destination for pediatric crises in the Kosi region.',
    available: '24 × 7',
    features: ['Advanced Pediatric Life Support', '24/7 Specialist Availability', 'Emergency Oxygen Therapy', 'Poisoning & Trauma Care', 'Rapid Diagnostic Support', 'Nebulization & IV Therapy'],
    faqs: [
      { q: 'Is a pediatrician always available in emergency?', a: 'Yes, Child Clinic Saharsa has a pediatric specialist available 24/7 for emergency cases.' },
      { q: 'What should I bring during an emergency?', a: 'If possible, bring any previous medical records and current medications, but priority is reaching the clinic quickly.' },
      { q: 'Do you have an ambulance service?', a: 'We can assist in coordinating ambulance services for critical transfers to our facility.' },
      { q: 'How long is the wait time in emergency?', a: 'Emergencies are triaged immediately; critical cases are seen without any delay.' }
    ],
    order: 3
  },
  {
    name: 'Pediatric Nutrition & Growth',
    slug: 'nutrition-growth',
    category: 'Specialized Unit',
    icon: '🥗',
    description: 'Expert guidance for the physical and nutritional development of children in Saharsa. We address critical issues like picky eating, childhood obesity, and protein-energy malnutrition. Our specialized growth clinic tracks developmental milestones and provides tailored nutritional therapy to ensure every child in the Kosi region reaches their full genetic potential.',
    available: 'OPD Hours',
    features: ['Picky Eater Management', 'Growth Hormone Evaluation', 'Personalized Diet Charts', 'Vitamin Deficiency Treatment', 'Milestone Tracking', 'Obesity Correction Programs'],
    faqs: [
      { q: 'How do I know if my child is growing normally?', a: 'We use WHO growth charts to track weight and height against international standards for their age.' },
      { q: 'Do you provide diet charts for picky eaters?', a: 'Yes, we create personalized, nutrient-dense diet plans that cater to children with poor appetites.' },
      { q: 'Can nutrition affect my child\'s immunity?', a: 'Absolutely. A balanced diet rich in vitamins and minerals is essential for a strong immune system.' },
      { q: 'Do you treat childhood obesity?', a: 'Yes, we provide specialized weight management programs that include diet and lifestyle modifications.' }
    ],
    order: 4
  },
  {
    name: 'Pediatric Pulmonology',
    slug: 'pediatric-pulmonology',
    category: 'Specialized Unit',
    icon: '🌬️',
    description: 'Specialized respiratory care for children in Saharsa suffering from asthma, recurring bronchitis, and chronic cough. Our pulmonology unit utilizes modern diagnostic tools and advanced nebulization therapies. We focus on long-term management and parent education to reduce emergency visits and improve the quality of life for children across the Kosi region.',
    available: 'OPD Hours',
    features: ['Asthma Control Program', 'Modern Nebulization Center', 'Allergic Rhinitis Treatment', 'Cystic FB Screening', 'Pulmonary Function Support', 'Chest Physiotherapy'],
    faqs: [
      { q: 'Is asthma in children curable?', a: 'While asthma is a chronic condition, most children can live a completely normal, active life with proper management.' },
      { q: 'When should I be worried about my child\'s cough?', a: 'A cough lasting more than 2 weeks or accompanied by wheezing/difficulty breathing requires specialist evaluation.' },
      { q: 'Are inhalers safe for small children?', a: 'Yes, inhalers with spacers are the safest and most effective way to deliver medicine directly to a child\'s lungs.' },
      { q: 'Do you provide nebulization services?', a: 'Yes, we have a dedicated nebulization center for children with acute respiratory distress.' }
    ],
    order: 5
  },
  {
    name: 'Pediatric Endocrinology',
    slug: 'pediatric-endocrinology',
    category: 'Specialized Unit',
    icon: '🧪',
    description: 'Advanced hormonal care in Saharsa for children with growth, thyroid, and diabetic disorders. Dr. Anshuman provides expert management for Type 1 Diabetes and complex endocrine imbalances. Our clinic is one of the few in the Kosi region providing specialized hormonal assessments and targeted therapies for childhood endocrine health.',
    available: 'OPD Hours',
    features: ['Type 1 Diabetes Management', 'Short Stature Evaluation', 'Thyroid Disorder Treatment', 'Puberty Related Issues', 'Adrenal Gland Disorders', 'Bone Health Assessment'],
    faqs: [
      { q: 'What are the signs of childhood diabetes?', a: 'Excessive thirst, frequent urination, and unexplained weight loss are common red flags.' },
      { q: 'Can you treat children with short stature?', a: 'Yes, we evaluate the cause (nutritional vs hormonal) and provide growth hormone therapy if necessary.' },
      { q: 'Does thyroid affect a child\'s development?', a: 'Yes, thyroid hormones are crucial for brain development and physical growth in children.' },
      { q: 'Do you manage early puberty?', a: 'Yes, we provide evaluations and treatments for both precocious (early) and delayed puberty.' }
    ],
    order: 6
  },
  {
    name: 'Pediatric Nephrology',
    slug: 'pediatric-nephrology',
    category: 'Specialized Unit',
    icon: '💧',
    description: 'Specialized kidney and urinary tract care for children in Saharsa. We manage conditions ranging from simple UTIs to complex nephrotic syndromes and hypertension. Our goal is to provide comprehensive renal care for children across the Kosi region, preventing long-term kidney complications through early diagnosis and precise medical intervention.',
    available: 'OPD Hours',
    features: ['Recurrent UTI Specialist', 'Nephrotic Syndrome Care', 'Bedwetting (Enuresis) Clinic', 'Childhood Hypertension', 'Congenital Renal Disorders', 'Urinary Protein Analysis'],
    faqs: [
      { q: 'How can I prevent UTIs in my child?', a: 'Ensuring adequate hydration and proper toilet hygiene are key preventive measures we teach parents.' },
      { q: 'Is bedwetting a medical problem?', a: 'Bedwetting is often developmental, but if it persists past age 6, a nephrology checkup is recommended to rule out underlying issues.' },
      { q: 'What are the signs of kidney problems in children?', a: 'Swelling around the eyes, tea-colored urine, and high blood pressure are common indicators.' },
      { q: 'Do you treat childhood hypertension?', a: 'Yes, we investigate the cause of high blood pressure and provide specialized management plans.' }
    ],
    order: 7
  }
]

export const seedBlogs = [
  {
    title: 'Importance of timely Vaccinations: A Guide for Parents',
    slug: 'importance-of-vaccinations',
    excerpt: 'Vaccinations are the most effective way to protect your child from serious diseases. Learn about the IAP recommended schedule.',
    content: `<h2>Protecting Your Child with Immunization</h2><p>Vaccines are one of the greatest achievements of modern medicine. They protect children from life-threatening diseases like polio, measles, and hepatitis. At Child Clinic, we follow the strict IAP and WHO guidelines for immunization.</p><h2>Why Follow a Schedule?</h2><p>The timing of each dose is carefully calculated to provide the best protection at the most vulnerable ages. Skipping or delaying vaccines can leave your child exposed to unnecessary risks.</p><h2>Cold-Chain Maintenance</h2><p>We maintain a strict cold-chain facility to ensure that every vaccine remains potent and effective from the manufacturer to your child.</p>`,
    author: 'Dr. Anshuman',
    category: 'Preventive Care',
    image: '',
    tags: ['vaccination', 'pediatrics', 'child health', 'Saharsa'],
    published: true,
    views: 0,
  },
  {
    title: 'Newborn Care: The First 28 Days',
    slug: 'newborn-care-guide',
    excerpt: 'The neonatal period is a critical time for your baby. Dr. Anshuman shares essential tips for newborn health and safety.',
    content: `<h2>The Golden Period of Growth</h2><p>Neonatology focuses on the first 28 days of life. This period requires specialized care, monitoring for jaundice, ensuring proper breastfeeding, and maintaining a clean environment.</p><h2>Signs to Watch For</h2><ul><li>Difficulty in breathing</li><li>Poor feeding</li><li>Excessive sleepiness</li><li>High fever or low temperature</li></ul><p>If you notice any of these signs, visit our specialized neonatal unit immediately.</p>`,
    author: 'Dr. Anshuman',
    category: 'Neonatology',
    image: '',
    tags: ['newborn', 'neonatology', 'parenting tips', 'Saharsa'],
    published: true,
    views: 0,
  },
]

export const seedHospitalServices = [
  {
    name: 'Pediatric OPD',
    slug: 'pediatric-opd',
    icon: '👶',
    category: 'Department',
    available: 'OPD Hours',
    description: 'Premium outpatient department in Saharsa offering expert pediatric consultations for children of all ages. Dr. Anshuman provides personalized attention, utilizing modern diagnostic techniques to address both acute illnesses and preventive healthcare needs for families across the Kosi region.',
    relatedSpecialties: ['General Pediatrics', 'Pediatric Nutrition & Growth'],
    order: 1,
  },
  {
    name: 'NICU & Newborn Care',
    slug: 'nicu-newborn-care',
    icon: '🏥',
    category: 'Emergency',
    available: '24 × 7',
    description: 'Advanced Level II NICU in Saharsa equipped with international standard medical technology. We specialize in the management of extreme prematurity, neonatal respiratory distress, and sepsis. Our round-the-clock monitoring and specialized nursing care make us the leading newborn center in the Kosi division.',
    relatedSpecialties: ['Neonatology (NICU)'],
    order: 2,
  },
  {
    name: 'Vaccination Centre',
    slug: 'vaccination-centre-service',
    icon: '💉',
    category: 'Diagnostic',
    available: 'OPD Hours',
    description: 'Saharsa\'s most reliable immunization center featuring a high-standard cold-chain maintenance system. We provide all essential and optional vaccines as per the latest IAP/WHO schedules, ensuring maximum safety and effectiveness for every child in the Kosi region.',
    relatedSpecialties: ['Vaccination Centre'],
    order: 3,
  },
  {
    name: 'Pediatric Emergency',
    slug: 'pediatric-emergency-service',
    icon: '🚨',
    category: 'Emergency',
    available: '24 × 7',
    description: 'Rapid-response pediatric emergency unit in Saharsa capable of handling critical life-support and acute stabilization. With 24/7 availability of pediatric specialists and advanced medical equipment, we serve as the primary lifeline for children across Saharsa and surrounding districts.',
    relatedSpecialties: ['General Pediatrics', 'Neonatology (NICU)', 'Pediatric Pulmonology'],
    order: 4,
  },
  {
    name: 'In-Clinic Pathology Lab',
    slug: 'pathology-lab',
    icon: '🔬',
    category: 'Diagnostic',
    available: '24 × 7',
    description: 'Fully automated in-house pathology laboratory in Saharsa providing rapid and accurate pediatric diagnostic reports. Our specialized lab supports immediate decision-making for critical NICU and Emergency cases throughout the Kosi region.',
    relatedSpecialties: ['General Pediatrics', 'Neonatology (NICU)'],
    order: 5,
  },
  {
    name: 'Pharmacy',
    slug: 'pharmacy',
    icon: '💊',
    category: 'Support',
    available: '24 × 7',
    description: '24/7 on-site pediatric pharmacy in Saharsa stocking a comprehensive range of quality medicines, infant care products, and specialized pediatric supplements. We ensure that families across the Kosi region have immediate access to prescribed treatments at any hour.',
    relatedSpecialties: [],
    order: 6,
  },
]

// Clear a collection and re-seed it
async function clearAndSeed(colName, items) {
  const snap = await getDocs(collection(db, colName))
  await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)))
  for (const item of items) {
    await addDoc(collection(db, colName), { ...item, createdAt: serverTimestamp() })
  }
}

export async function seedSpecialitiesAndServices() {
  console.log('Seeding specialities...')
  await clearAndSeed('specialities', seedSpecialities)
  console.log('Seeding hospitalServices...')
  await clearAndSeed('hospitalServices', seedHospitalServices)
  console.log('✅ Specialities & Services seeded!')
}

export async function seedFirestore() {
  try {
    console.log('Seeding blogs...')
    for (const doc of seedBlogs) {
      await addDoc(collection(db, 'blogs'), { ...doc, createdAt: serverTimestamp() })
    }

    console.log('✅ Seeding complete!')
  } catch (err) {
    console.error('Seeding error:', err)
  }
}
