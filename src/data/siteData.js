// ─────────────────────────────────────────────────────────────
// data/siteData.js
// Central configuration for Child Clinic.
// Update this file when clinic details change rather than
// hunting through components.
// ─────────────────────────────────────────────────────────────

export const siteData = {
  name: 'Child Clinic',
  tagline: 'General & Emergency',
  description:
    'Child Clinic, near Dr I D Singh, Naya Bazar, Saharsa – the most trusted pediatric and newborn care center in the Kosi region. Providing expert medical services, NICU, and vaccinations for children in Saharsa, Bihar.',
  founded: '2024',
  url: 'https://child-clinic.web.app',
  logo: '/child-clinic-logo.png',

  // ── Contact & Location ───────────────────────────────────────
  contact: {
    address: 'near Dr I D Singh, Naya Bazar, Saharsa, Bihar 852201',
    phone: '+91 8544037256',
    phone2: '9431223224',
    email: 'contact@childclinic.com',
    hours: 'Mon – Sat: 9:00 AM – 8:00 PM | Sun: 10:00 AM – 2:00 PM',
    whatsappLabel: 'WhatsApp Chat',
    whatsappSubLabel: 'Instant Support',
  },

  // ── Social Media Links ───────────────────────────────────────
  social: {
    facebook: 'https://facebook.com/childclinicsaharsa',
    instagram: 'https://instagram.com/childclinicsaharsa',
    twitter: 'https://twitter.com/childclinic',
    youtube: 'https://youtube.com/@childclinic',
    linkedin: 'https://linkedin.com/company/childclinic',
  },

  // ── Team & Operational Stats ─────────────────────────────────
  team: {
    totalStaff: 5,
    nurses: 1,
    technicians: 2,
    pharmacist: true,
    ambulance: false,
    available247: false,
    consultationFee: 200,
  },

  // ── SEO Configuration ────────────────────────────────────────
  seo: {
    keywords: [
      'Child Clinic',
      'Child Clinic Saharsa',
      'pediatric clinic Saharsa',
      'best child doctor Saharsa Bihar',
      'Dr I D Singh Saharsa',
      'pediatrician Saharsa',
      'child specialist Saharsa',
      'Naya Bazar Saharsa clinic',
      'emergency child care Saharsa',
      'general clinic Saharsa',
      'केयर चाइल्ड क्लिनिक सहरसा',
      'चाइल्ड स्पेशलिस्ट सहरसा',
      'book appointment child specialist Saharsa',
      'child clinic Supaul',
      'child doctor Madhepura',
      'pediatrician Araria',
      'Kosi region child clinic',
      'Kosi division pediatric care',
      'best NICU in Kosi region',
      'child specialist Kosi Bihar',
    ],
    ogImage: '/hero-bg.png',
  },

  // ── Homepage Stats Counter ───────────────────────────────────
  stats: [
    { label: 'Happy Families', value: 1000, suffix: '+' },
    { label: 'Newborns Cared For', value: 1000, suffix: '+' },
    { label: 'Vaccinations Done', value: 100, suffix: '+' },
    { label: 'Years Experience', value: 7, suffix: '+' },
  ],

  // ── Google Maps Embed ────────────────────────────────────────
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3589.513827166837!2d86.5836563!3d25.885474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ee3d001cd5a4af%3A0x1e702a205dfd83e1!2sCHILD%20CLINIC%20(DR.%20ANSHUMAN)!5e0!3m2!1sen!2sin!4v1777714302523!5m2!1sen!2sin',

  // ── Departments / Specialties (used in appointment form) ─────
  departments: [
    'General Pediatrics',
    'Neonatology (Newborn Care)',
    'Vaccinations & Immunizations',
    'Pediatric Nutrition & Growth',
    'Pediatric Pulmonology',
    'Developmental Pediatrics',
    'Pediatric Endocrinology',
    'Pediatric Nephrology',
  ],

  // ── Facilities ───────────────────────────────────────────────
  facilities: [
    { name: 'Pediatric OPD', icon: '👶' },
    { name: 'NICU & Newborn Care', icon: '🏥' },
    { name: 'Vaccination Centre', icon: '💉' },
    { name: 'Pediatric Emergency', icon: '🚨' },
    { name: 'Pathology Lab', icon: '🔬' },
    { name: 'Pharmacy', icon: '💊' },
  ],
}

export default siteData
