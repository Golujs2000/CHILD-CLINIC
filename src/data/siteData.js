// ─────────────────────────────────────────────────────────────
// data/siteData.js
// Central configuration for Care Homeopathic Clinic.
// Update this file when clinic details change rather than
// hunting through components.
// ─────────────────────────────────────────────────────────────

export const siteData = {
  name: 'Child Clinic',
  tagline: 'General & Emergency',
  description:
    'Child Clinic, near Dr I D Singh, Shardha Nagar, Saharsa – trusted pediatric and general care. Providing expert medical services for children and families in Saharsa, Bihar.',
  founded: '2024',
  url: 'https://child-clinic.web.app',
  logo: '/child-clinic-logo.png',

  // ── Contact & Location ───────────────────────────────────────
  contact: {
    address: 'near Dr I D Singh, Shardha Nagar, Saharsa, Bihar 852201',
    phone: '+91 62015 92231',
    phone2: '',
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
      'Shardha Nagar Saharsa clinic',
      'emergency child care Saharsa',
      'general clinic Saharsa',
      'केयर चाइल्ड क्लिनिक सहरसा',
      'चाइल्ड स्पेशलिस्ट सहरसा',
      'book appointment child specialist Saharsa',
      'child clinic Supaul',
      'child doctor Madhepura',
      'pediatrician Araria',
    ],
    ogImage: '/og-image.jpg',
  },

  // ── Homepage Stats Counter ───────────────────────────────────
  stats: [
    { label: 'Happy Families', value: 500, suffix: '+' },
    { label: 'Years Experience', value: 7, suffix: '+' },
    { label: 'Successful Recoveries', value: 450, suffix: '+' },
    { label: 'Specialized Units', value: 8, suffix: '' },
  ],

  // ── Google Maps Embed ────────────────────────────────────────
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20368.23470867344!2d86.59465194331727!3d25.879466939589253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ee3dbe346651b7%3A0x92efa201b6e93f5e!2sCare%20Homeopathic%20Clinic.Dr.Rajesh%20Kumar%20Ranjan.!5e0!3m2!1sen!2sin!4v1776572262574!5m2!1sen!2sin',

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
