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
    description: 'Expert healthcare for infants, children, and adolescents in Saharsa. Our general pediatric services cover everything from routine wellness checkups to the diagnosis and treatment of acute and chronic illnesses. Dr. Anshuman provides personalized care to ensure children in the Kosi region stay on the right track for healthy development.',
    available: 'OPD Hours',
    features: ['Common Cold & Fever', 'Infection Management', 'Growth Assessments', 'Routine Wellness'],
    order: 0
  },
  {
    name: 'Neonatology (NICU)',
    slug: 'neonatology-nicu',
    category: 'Specialized Unit',
    icon: '🏥',
    description: 'Specialized medical care for newborn infants in Saharsa, particularly those who are ill or born prematurely. Our Level II NICU is equipped with advanced technology including incubators and phototherapy units, making it a critical lifeline for newborns across the Kosi region.',
    available: '24 × 7',
    features: ['Level II NICU', 'Premature Baby Care', 'Neonatal Jaundice', 'Respiratory Support'],
    order: 1
  },
  {
    name: 'Vaccination Centre',
    slug: 'vaccination-centre',
    category: 'Specialized Unit',
    icon: '💉',
    description: 'A comprehensive immunization facility in Saharsa following the latest national and international guidelines (IAP/WHO). We maintain a strict cold-chain for all vaccines to ensure maximum potency for every child in the Kosi region.',
    available: 'OPD Hours',
    features: ['Painless Vaccines', 'IAP Schedule Following', 'Cold-Chain Security', 'Digital Records'],
    order: 2
  },
  {
    name: 'Pediatric Emergency',
    slug: 'pediatric-emergency',
    category: 'Specialized Unit',
    icon: '🚨',
    description: 'Round-the-clock emergency services in Saharsa dedicated to critical pediatric cases. Our unit is prepared to handle acute medical situations for families across the Kosi region with immediate specialist intervention.',
    available: '24 × 7',
    features: ['Acute Illness Care', 'Trauma Support', '24/7 Specialist Availability', 'Oxygen Therapy'],
    order: 3
  },
  {
    name: 'Pediatric Nutrition & Growth',
    slug: 'nutrition-growth',
    category: 'Specialized Unit',
    icon: '🥗',
    description: 'Focused on the nutritional well-being and physical development of children in Saharsa. We provide detailed assessments and specialized diet planning for picky eaters and malnourished children across the Kosi region.',
    available: 'OPD Hours',
    features: ['Dietary Planning', 'Milestone Tracking', 'Obesity Management', 'Vitamins & Supplements'],
    order: 4
  },
  {
    name: 'Pediatric Pulmonology',
    slug: 'pediatric-pulmonology',
    category: 'Specialized Unit',
    icon: '🌬️',
    description: 'Expert diagnosis and management of respiratory conditions in children in Saharsa. We specialize in treating pediatric asthma and recurring bronchitis for patients throughout the Kosi region.',
    available: 'OPD Hours',
    features: ['Asthma Management', 'Nebulization Services', 'Allergy Testing', 'Bronchitis Care'],
    order: 5
  },
  {
    name: 'Pediatric Endocrinology',
    slug: 'pediatric-endocrinology',
    category: 'Specialized Unit',
    icon: '🧪',
    description: 'Advanced care for childhood hormonal disorders in Saharsa, including type 1 diabetes and growth hormone issues. Dr. Anshuman provides specialized endocrine evaluations for children across the Kosi region.',
    available: 'OPD Hours',
    features: ['Type 1 Diabetes', 'Growth Hormone Therapy', 'Thyroid Management', 'Puberty Concerns'],
    order: 6
  },
  {
    name: 'Pediatric Nephrology',
    slug: 'pediatric-nephrology',
    category: 'Specialized Unit',
    icon: '💧',
    description: 'Specialized diagnosis and treatment of kidney and urinary tract disorders in children in Saharsa. We provide comprehensive renal care for children across the Kosi region, including UTI and nephrotic syndrome management.',
    available: 'OPD Hours',
    features: ['Recurrent UTIs', 'Bedwetting Support', 'Kidney Stones', 'Hypertension Management'],
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
    description: 'Daily outpatient consultations for children in Saharsa, from newborn to adolescence. Dr. Anshuman personally examines every child from across the Kosi region, providing expert diagnosis and personalized treatment plans.',
    relatedSpecialties: ['General Pediatrics', 'Pediatric Nutrition & Growth'],
    order: 1,
  },
  {
    name: 'NICU & Newborn Care',
    slug: 'nicu-newborn-care',
    icon: '🏥',
    category: 'Emergency',
    available: '24 × 7',
    description: 'Advanced Level II NICU facility in Saharsa for premature babies and critical newborns. We provide 24/7 specialist monitoring for infants from all over the Kosi region, ensuring the highest survival outcomes.',
    relatedSpecialties: ['Neonatology (NICU)'],
    order: 2,
  },
  {
    name: 'Vaccination Centre',
    slug: 'vaccination-centre-service',
    icon: '💉',
    category: 'Diagnostic',
    available: 'OPD Hours',
    description: 'Complete childhood vaccination services in Saharsa following IAP and WHO schedules. We maintain a strict cold-chain for all essential vaccines to serve the immunization needs of the Kosi region.',
    relatedSpecialties: ['Vaccination Centre'],
    order: 3,
  },
  {
    name: 'Pediatric Emergency',
    slug: 'pediatric-emergency-service',
    icon: '🚨',
    category: 'Emergency',
    available: '24 × 7',
    description: 'Round-the-clock emergency pediatric services in Saharsa for critical conditions. Our facility is the primary emergency response unit for children in the Kosi region.',
    relatedSpecialties: ['General Pediatrics', 'Neonatology (NICU)', 'Pediatric Pulmonology'],
    order: 4,
  },
  {
    name: 'In-Clinic Pathology Lab',
    slug: 'pathology-lab',
    icon: '🔬',
    category: 'Diagnostic',
    available: '24 × 7',
    description: 'In-house blood and urine testing facility in Saharsa for rapid pediatric diagnosis. Supporting the medical needs of families across the Kosi region with quick and accurate reports.',
    relatedSpecialties: ['General Pediatrics', 'Neonatology (NICU)'],
    order: 5,
  },
  {
    name: 'Pharmacy',
    slug: 'pharmacy',
    icon: '💊',
    category: 'Support',
    available: '24 × 7',
    description: 'On-site pharmacy in Saharsa stocking all essential pediatric medicines and supplements. Ensuring immediate availability of treatments for patients throughout the Kosi region.',
    relatedSpecialties: [],
    order: 6,
  },
]

export const seedDoctors = [
  {
    name: 'Dr. Anshuman',
    slug: 'dr-anshuman',
    specialty: 'Pediatrician & Neonatologist',
    qualification: 'P.G.P.N (BOSTON U.S.A), M.D. Pediatrics',
    experience: '7+',
    bio: 'Dr. Anshuman is a highly skilled Pediatrician and Neonatologist with international training from Boston, USA. He specializes in newborn care, pediatric emergencies, and childhood nutrition, bringing world-class medical expertise to Saharsa.',
    phone: '8544037256',
    email: 'anshuman@childclinic.com',
    image: 'https://firebasestorage.googleapis.com/v0/b/child-clinic.firebasestorage.app/o/gallery%2F1777714740704_DR.%20ANSHUMAN01.webp?alt=media&token=27dc5999-2e10-4cd4-a081-9a71250a0a89',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    availableTime: '10:00 AM - 08:00 PM',
    order: 1
  }
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
  console.log('Seeding doctors...')
  await clearAndSeed('doctors', seedDoctors)
  console.log('✅ Specialities, Services & Doctors seeded!')
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
