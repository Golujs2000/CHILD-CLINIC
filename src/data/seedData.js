// Seed data for Care Homeopathic Clinic — initial Firestore population
// Run seedFirestore() in browser console after importing

import { db } from '../firebase/config'
import { collection, addDoc, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore'

export const seedDoctors = [
  {
    name: 'Dr. Anshuman',
    specialty: 'Pediatrician & Neonatologist',
    qualification: 'M.B.B.S (PMCH Patna), D.C.H (PMCH Patna), M.D Pediatric (PMCH Patna), P.G.P.N (Boston U.S.A)',
    experience: 7,
    bio: 'Dr. Anshuman is a highly qualified Pediatrician and Neonatologist with over 7 years of experience in saving and nurturing young lives. He is dedicated to providing evidence-based, compassionate care for children of all ages. Previously, he served as a Senior Resident at I.G.I.M.S PATNA and as a Consultant at Mahavir Vatsalya Hospital Patna.',
    image: '',
    email: 'dranshuman@childclinic.com',
    phone: '6201592231',
    consultationFee: 300,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    availableTime: '10:00 AM – 7:00 PM',
    specializations: ['Pediatric Nutrition', 'Growth & Development', 'General Pediatrics', 'Neonatology'],
    hindiTitle: 'बाल रोग विशेषज्ञ एवं नवजात शिशु विशेषज्ञ',
    rating: 4.9,
    reviewCount: 150,
    featured: true,
  },
]

import { allSpecialities } from './seed/index.js'

export const seedSpecialities = allSpecialities

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
    icon: '👶',
    category: 'Department',
    available: 'OPD Hours',
    description: 'Daily outpatient consultations for children from newborn to adolescence. Dr. Anshuman personally examines every child, diagnoses the condition, and prescribes safe, weight-based medications.',
    relatedSpecialties: ['General Pediatrics', 'Pediatric Nutrition & Growth'],
    order: 1,
  },
  {
    name: 'NICU & Newborn Care',
    icon: '🏥',
    category: 'Emergency',
    available: '24 × 7',
    description: 'Advanced NICU facility for premature babies, low birth weight newborns, neonatal jaundice, and birth-related complications. Round-the-clock specialist monitoring with incubators, phototherapy, and IV support.',
    relatedSpecialties: ['Neonatology (Newborn Care)'],
    order: 2,
  },
  {
    name: 'Vaccination Centre',
    icon: '💉',
    category: 'Diagnostic',
    available: 'OPD Hours',
    description: 'Complete childhood vaccination services following IAP and WHO schedules. All vaccines available including BCG, OPV, DPT, MMR, Hepatitis B, PCV, Typhoid, and Chickenpox. Cold-chain maintained with digital records.',
    relatedSpecialties: ['Vaccinations & Immunizations'],
    order: 3,
  },
  {
    name: 'Pediatric Emergency',
    icon: '🚨',
    category: 'Emergency',
    available: '24 × 7',
    description: 'Round-the-clock emergency pediatric services for seizures, high fever, breathing difficulty, severe dehydration, accidental poisoning, and any other pediatric emergencies requiring immediate attention.',
    relatedSpecialties: ['General Pediatrics', 'Neonatology (Newborn Care)', 'Pediatric Pulmonology'],
    order: 4,
  },
  {
    name: 'In-Clinic Pathology Lab',
    icon: '🔬',
    category: 'Diagnostic',
    available: '24 × 7',
    description: 'In-house blood and urine testing facility for rapid diagnosis without leaving the clinic. Supports CBC, blood culture, bilirubin, blood glucose, urine routine, and malaria/dengue rapid tests.',
    relatedSpecialties: ['General Pediatrics', 'Neonatology (Newborn Care)'],
    order: 5,
  },
  {
    name: 'Pharmacy',
    icon: '💊',
    category: 'Support',
    available: '24 × 7',
    description: 'On-site pharmacy stocking all commonly prescribed pediatric medicines, syrups, nutritional supplements, and ORS. Ensures immediate availability of prescribed treatments.',
    relatedSpecialties: [],
    order: 6,
  },
]

export const seedGallery = [
  { title: 'Care Homeopathic Clinic', category: 'facility', image: '/gallery/clinic-1.jpg', description: 'Care Homeopathic Clinic, Radha Krishna Vatika, Panchwati Chowk, Ward No. 15, Saharsa' },
  { title: 'Clinic Entrance', category: 'facility', image: '/gallery/clinic-2.jpg', description: 'Welcoming clinic environment' },
  { title: 'Consultation Room', category: 'facility', image: '/gallery/clinic-3.jpg', description: 'Private consultation room for detailed case taking' },
  { title: 'Medicine Counter', category: 'facility', image: '/gallery/clinic-4.jpg', description: 'In-house medicine dispensary' },
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
    console.log('Seeding doctors...')
    for (const doc of seedDoctors) {
      await addDoc(collection(db, 'doctors'), { ...doc, createdAt: serverTimestamp() })
    }

    console.log('Seeding blogs...')
    for (const doc of seedBlogs) {
      await addDoc(collection(db, 'blogs'), { ...doc, createdAt: serverTimestamp() })
    }

    console.log('Seeding gallery...')
    for (const doc of seedGallery) {
      await addDoc(collection(db, 'gallery'), { ...doc, createdAt: serverTimestamp() })
    }

    console.log('✅ Seeding complete!')
  } catch (err) {
    console.error('Seeding error:', err)
  }
}
