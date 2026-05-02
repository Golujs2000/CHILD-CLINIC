export const consolidatedSpecialities = [
  {
    id: 'general-pediatrics',
    name: 'General Pediatrics',
    icon: '🤱',
    category: 'Specialized Unit',
    description: 'Comprehensive healthcare for children from newborn to adolescence. We diagnose and treat common childhood illnesses, monitor growth milestones, and provide preventive care to keep your child healthy at every stage.',
    available: 'Daily',
    treatments: [
      { name: 'Common Childhood Illnesses', slug: 'common-childhood-illnesses', description: 'Diagnosis and treatment of flu, infections, and common ailments.' },
      { name: 'Growth Monitoring', slug: 'growth-monitoring', description: 'Regular tracking of height, weight, and developmental milestones.' },
      { name: 'Preventive Care', slug: 'preventive-care', description: 'Health checkups and screenings to prevent diseases.' }
    ]
  },
  {
    id: 'neonatology',
    name: 'Neonatology (Newborn Care)',
    icon: '👶',
    category: 'Specialized Unit',
    description: 'Specialized medical care for newborn infants from birth through the first 28 days of life. Our NICU is equipped with advanced technology for newborns requiring intensive monitoring, respiratory support, and treatment of infections.',
    available: '24×7',
    treatments: [
      { name: 'NICU Intensive Monitoring', slug: 'nicu-monitoring', description: '24/7 monitoring for newborns with special needs.' },
      { name: 'Respiratory Support', slug: 'newborn-respiratory-support', description: 'Advanced breathing assistance for premature or ill infants.' },
      { name: 'Infection Treatment', slug: 'newborn-infection-treatment', description: 'Specialized antibiotic protocols for neonatal infections.' }
    ]
  },
  {
    id: 'vaccinations',
    name: 'Vaccinations & Immunizations',
    icon: '💉',
    category: 'Specialized Unit',
    description: 'Complete vaccination services for infants, children, and adolescents following the latest IAP (Indian Academy of Pediatrics) and WHO immunization schedule. All vaccines stored in a strict cold-chain maintained facility.',
    available: 'Daily OPD Hours',
    treatments: [
      { name: 'IAP/WHO Schedule Vaccines', slug: 'iap-who-vaccines', description: 'Full range of vaccines as per international standards.' },
      { name: 'Cold-Chain Facility', slug: 'cold-chain-vaccine-storage', description: 'Guaranteed potency with strict temperature-controlled storage.' },
      { name: 'Adolescent Immunization', slug: 'adolescent-immunization', description: 'Specialized booster doses and vaccines for teenagers.' }
    ]
  },
  {
    id: 'nutrition',
    name: 'Pediatric Nutrition & Growth',
    icon: '🍎',
    category: 'Specialized Unit',
    description: 'Expert nutritional guidance for children from birth through adolescence, led by Dr. Anshuman — one of the few P.G.P.N. (Post Graduate Program in Nutrition, Boston University, USA) certified specialists in Bihar. We address growth concerns, picky eating, malnutrition, and obesity.',
    available: 'By Appointment',
    treatments: [
      { name: 'Growth Concern Assessment', slug: 'growth-assessment', description: 'Detailed analysis of growth delays or abnormalities.' },
      { name: 'Malnutrition Management', slug: 'malnutrition-management', description: 'Scientific dietary plans to overcome nutritional deficiencies.' },
      { name: 'Picky Eating Solutions', slug: 'picky-eating-solutions', description: 'Behavioral and nutritional strategies for fussy eaters.' }
    ]
  },
  {
    id: 'pulmonology',
    name: 'Pediatric Pulmonology',
    icon: '🫁',
    category: 'Specialized Unit',
    description: 'Specialist care for children with chronic respiratory conditions including asthma, recurrent wheeze, bronchitis, pneumonia, and allergic rhinitis. We provide evidence-based management plans to help children breathe freely and live actively.',
    available: 'Daily',
    treatments: [
      { name: 'Asthma Management', slug: 'pediatric-asthma-care', description: 'Personalized action plans for childhood asthma.' },
      { name: 'Allergic Rhinitis Treatment', slug: 'allergic-rhinitis-care', description: 'Relief from chronic nasal allergies and congestion.' },
      { name: 'Wheezing Assessment', slug: 'recurrent-wheeze-treatment', description: 'Diagnostic evaluation of recurring chest sounds.' }
    ]
  },
  {
    id: 'developmental',
    name: 'Developmental Pediatrics',
    icon: '🧠',
    category: 'Specialized Unit',
    description: 'Assessment and early intervention for children with developmental delays, learning difficulties, autism spectrum disorder, ADHD, and speech delays. Early identification leads to significantly better long-term outcomes for every child.',
    available: 'By Appointment',
    treatments: [
      { name: 'Autism & ADHD Screening', slug: 'autism-adhd-screening', description: 'Early identification of neurodevelopmental conditions.' },
      { name: 'Speech Delay Evaluation', slug: 'speech-delay-intervention', description: 'Early intervention for language and speech issues.' },
      { name: 'Learning Difficulty Assessment', slug: 'learning-difficulty-assessment', description: 'Support for school-going children with academic challenges.' }
    ]
  },
  {
    id: 'endocrinology',
    name: 'Pediatric Endocrinology',
    icon: '🦋',
    category: 'Specialized Unit',
    description: 'Specialist care for children with hormonal and metabolic disorders including diabetes, thyroid disease, short stature, early or delayed puberty, and obesity. We provide evidence-based management to support healthy growth and long-term wellbeing.',
    available: 'By Appointment',
    treatments: [
      { name: 'Childhood Diabetes Care', slug: 'pediatric-diabetes-management', description: 'Comprehensive management of Type 1 and Type 2 diabetes.' },
      { name: 'Thyroid Disorder Treatment', slug: 'pediatric-thyroid-care', description: 'Treatment for congenital and acquired thyroid issues.' },
      { name: 'Short Stature Evaluation', slug: 'short-stature-assessment', description: 'Hormonal assessment for growth hormone concerns.' }
    ]
  },
  {
    id: 'nephrology',
    name: 'Pediatric Nephrology',
    icon: '🫘',
    category: 'Specialized Unit',
    description: 'Specialised diagnosis and management of kidney diseases in children, including nephrotic syndrome, urinary tract infections, haematuria, hypertension, and more.',
    available: 'By Appointment',
    treatments: [
      { name: 'Nephrotic Syndrome Care', slug: 'nephrotic-syndrome-treatment', description: 'Specialized management of kidney-related protein loss.' },
      { name: 'Recurrent UTI Management', slug: 'pediatric-uti-treatment', description: 'Preventing and treating recurring urinary infections.' },
      { name: 'Pediatric Hypertension', slug: 'pediatric-hypertension-care', description: 'Monitoring and treating high blood pressure in children.' }
    ]
  }
];