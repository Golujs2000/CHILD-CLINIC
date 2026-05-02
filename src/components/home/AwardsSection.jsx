import { motion } from 'framer-motion'
import { FiAward, FiStar, FiUsers, FiHeart, FiShield, FiTrendingUp } from 'react-icons/fi'

const AWARDS = [
  {
    icon: FiAward,
    title: 'Best Homeopathic Doctor',
    desc: 'Recognised as the best homeopathic physician in Saharsa district multiple years running.',
    color: 'bg-amber-50 border-amber-100 text-amber-500'
  },
  {
    icon: FiStar,
    title: 'International Excellence Award',
    desc: 'Awarded internationally for outstanding contribution to holistic and alternative medicine.',
    color: 'bg-primary-50 border-primary-100 text-primary-600'
  },
  {
    icon: FiUsers,
    title: '1,00,000+ Patients Served',
    desc: 'Over a lakh patients treated successfully across Saharsa, Madhepura and Bihar.',
    color: 'bg-blue-50 border-blue-100 text-blue-600'
  },
  {
    icon: FiHeart,
    title: 'Community Health Hero',
    desc: 'Honoured for 25 years of dedicated service and compassionate patient care since 2001.',
    color: 'bg-rose-50 border-rose-100 text-rose-500'
  },
  {
    icon: FiShield,
    title: 'Certified Specialist',
    desc: "B.H.M.S. & P.G.D.C.P. certified — Homoeopathic Consultant.",
    color: 'bg-teal-50 border-teal-100 text-teal-600'
  },
  {
    icon: FiTrendingUp,
    title: '220+ Conditions Treated',
    desc: 'Expertise across 220+ medical conditions with proven homeopathic protocols.',
    color: 'bg-purple-50 border-purple-100 text-purple-600'
  }
]

const MARQUEE_1_IMAGES = [
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842320915_award-ceremony-01.webp?alt=media&token=3d2fb410-44cd-4cc2-8fc5-462e5cea610d",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842325995_award-ceremony-02.webp?alt=media&token=a19b64a6-e8f9-4fda-9f04-50cd10fcba36",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842330973_award-ceremony-05.webp?alt=media&token=3f47874b-bb5c-4be2-97c1-e6dbb9174c39",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842335881_award-ceremony-06.webp?alt=media&token=1698cb84-2860-4fb4-8269-bd7b9986ddf4",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842341235_award-ceremony-08.webp?alt=media&token=205185c2-b404-4c9f-81b6-f029a55fe319",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842346143_award-ceremony-09.webp?alt=media&token=d1e67b47-e1e9-4d82-9caf-8886dc788ab7",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842355391_award-ceremony-11.webp?alt=media&token=2a924273-fb14-4cfd-b2a5-7e66e0a25406",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842359961_award-ceremony-12.webp?alt=media&token=787364ff-cf36-4792-bee5-c02bae2be652",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842363924_award-ceremony-13.webp?alt=media&token=9e249c36-885c-40e7-a417-e3f3ef450e03",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842367338_award-ceremony-14.webp?alt=media&token=e4a763ba-bf35-4f3d-ad77-761456b50728",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842372921_award-ceremony-16.webp?alt=media&token=0924b200-bc4c-42d6-8a23-0487a700c247",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842377490_award-ceremony-17.webp?alt=media&token=9eee87f5-7f2f-4cb2-b293-ebc5ea71bea7",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842381963_award-ceremony-21.webp?alt=media&token=1bd914a9-f13d-412b-a92a-484e72df00d9",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842386343_award-ceremony-24.webp?alt=media&token=48e7edbf-6d86-463e-ae32-0a48683fc4e1",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842390865_award-ceremony-28.webp?alt=media&token=caac0991-54c7-454e-8cdb-918964e6606b",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842395252_award-ceremony-29.webp?alt=media&token=7276b208-3535-4d7a-88a6-bf2a78ca33fc",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842398397_award-ceremony-31.webp?alt=media&token=5bb9a905-f9d5-4432-9d7e-cd7597259350",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842402794_award-ceremony-32.webp?alt=media&token=27720cd3-2c3e-43a9-8f36-d5ce2c307963",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842406248_award-ceremony-35.webp?alt=media&token=e895b1ac-5ec1-47fd-a826-71b3860c343a",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842410912_award-ceremony-37.webp?alt=media&token=fe02aaf4-3a8b-4fcf-8ca1-925e7228d438",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842415454_award-ceremony-40.webp?alt=media&token=4ef2eb1e-0f07-4d85-b32a-1cd44682c480",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842420104_award-ceremony-42.webp?alt=media&token=d69a8702-0a60-4d44-8ef3-ebfaa56f148d",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842424706_clinic-inauguration-01.webp?alt=media&token=0a59f987-57ac-4dce-aac5-704758fbaf0b",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842429084_clinic-inauguration-02.webp?alt=media&token=99b9d42f-2cfa-408e-9bcb-627786285088",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842433327_clinic-inauguration-03.webp?alt=media&token=946445a3-9437-4aae-8871-7a9850dd9077",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842498909_conference-event-01.webp?alt=media&token=149a40f2-143f-4396-8725-08fa0b4fc6b7"
]

const MARQUEE_2_IMAGES = [
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842503029_conference-event-02.webp?alt=media&token=e9b1c9be-ba9d-4f00-afe6-da70a5724c2b",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842506692_conference-event-04.webp?alt=media&token=13af0a75-ab61-4bcf-8c81-90b9f53a9144",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842510290_conference-event-06.webp?alt=media&token=dfca9a5a-9d28-42d7-acd8-dbc364cd5b0c",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842514005_conference-event-07.webp?alt=media&token=6ac9f679-1d98-47a0-8210-a1045bc9b22c",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842517316_conference-event-08.webp?alt=media&token=3b0d5e9c-a8a8-4b42-9706-7abfc41fddc0",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842520975_conference-event-10.webp?alt=media&token=d61e1a1b-78cf-47ae-b45a-fb6b49905329",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842523357_conference-event-11.webp?alt=media&token=a656d01c-c036-4749-93ab-53667671cd53",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842526718_conference-event-12.webp?alt=media&token=3067ce8a-0676-4059-9fa7-313cf3e3e5ca",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842528821_conference-event-13.webp?alt=media&token=2d85b40a-2c65-49a5-9241-9b21ea41d238",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842532167_conference-event-14.webp?alt=media&token=863985e8-51d8-423b-b958-12793e236b18",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842534418_conference-event-15.webp?alt=media&token=374f3cd1-844b-48bd-a514-210efef5618c",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842537654_conference-event-16.webp?alt=media&token=b0e1eab8-b310-4ccc-802d-190a430d90c6",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842541251_conference-event-19.webp?alt=media&token=31e0a651-1332-488e-b570-56007fe121f0",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842543562_conference-event-20.webp?alt=media&token=489ff974-7787-4619-9039-f1a60a2bcd1d",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842546798_conference-event-21.webp?alt=media&token=bb33778e-97d3-404c-938f-0cb9f95a2798",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842548906_conference-event-22.webp?alt=media&token=b76182c3-6cdb-442b-8898-cebb71da85a9",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842552101_conference-event-24.webp?alt=media&token=8a83ce89-22b2-4b22-a3cc-50b19d80f629",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842555518_conference-event-25.webp?alt=media&token=50b93d3a-1674-4647-8853-f377a41c05e4",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842559476_conference-event-26.webp?alt=media&token=b9824829-0781-4021-bf88-abc80f9ac7a1",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842562715_conference-event-27.webp?alt=media&token=a2aa3cfc-0d33-4fe9-aff7-2a3dc63fbe83",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842905134_20260419_105309.jpg.webp?alt=media&token=fc969ac3-83d1-4c5b-b186-d0dc3f7842b7",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842909628_20260419_115604.jpg.webp?alt=media&token=bdabb9b4-4313-44b6-9a13-749d269bf6d1",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842913898_20260419_120248.jpg.webp?alt=media&token=df99705b-23eb-4ef2-b540-5cc25dfce7d1",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842917635_20260419_123521.jpg.webp?alt=media&token=7310aaff-ab3d-4eec-9db0-6a17e66f5255",
  "https://firebasestorage.googleapis.com/v0/b/carehomeopathicclinic-e545f.firebasestorage.app/o/gallery%2F1776842921286_20260419_124042.jpg.webp?alt=media&token=8b73b39b-b89c-4041-804d-02b18ca99e5a"
]

export default function AwardsSection() {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-amber-50 border border-amber-200 text-amber-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            National &amp; International Recognition
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-navy-800 mt-2 leading-tight">
            National &amp; International <span className="text-amber-500">Awards &amp; Achievements</span>
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            25 years of excellence in homeopathic medicine — recognised nationally and internationally by patients, peers, and organisations across India and beyond.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {AWARDS.map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-gray-100 rounded-[5px] p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-navy-800 text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquees */}
      <div className="flex flex-col gap-4 max-w-[100vw] overflow-hidden py-4 bg-gray-50">
        {/* Marquee 1 */}
        <div className="marquee-row overflow-hidden">
          <div className="flex gap-4" style={{ animation: '80s linear 0s infinite normal none running marquee-scroll', width: 'max-content' }}>
            {[...MARQUEE_1_IMAGES, ...MARQUEE_1_IMAGES, ...MARQUEE_1_IMAGES].map((src, i) => (
              <div key={`m1-${i}`} className="w-64 h-44 flex-shrink-0 rounded-[5px] overflow-hidden shadow-md border border-gray-100 group">
                <img
                  src={src}
                  alt="Award Ceremony"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Marquee 2 */}
        <div className="marquee-row overflow-hidden">
          <div className="flex gap-4" style={{ animation: '80s linear 0s infinite reverse none running marquee-scroll', width: 'max-content' }}>
            {[...MARQUEE_2_IMAGES, ...MARQUEE_2_IMAGES, ...MARQUEE_2_IMAGES].map((src, i) => (
              <div key={`m2-${i}`} className="w-64 h-44 flex-shrink-0 rounded-[5px] overflow-hidden shadow-md border border-gray-100 group">
                <img
                  src={src}
                  alt="Conference Event"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
