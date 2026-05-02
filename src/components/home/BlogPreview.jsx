import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiCalendar } from 'react-icons/fi'
import { useBlogs } from '../../hooks/useBlog'
import { formatDate } from '../../utils/helpers'

const FALLBACK_POSTS = [
  {
    id: 'b1',
    title: 'Importance of timely Vaccinations: A Guide for Parents',
    excerpt: 'Vaccinations are the most effective way to protect your child from serious diseases. Learn about the IAP recommended schedule and cold-chain safety.',
    category: 'Preventive Care',
    date: '19 Apr 2026',
    color: 'from-primary-400 to-accent-600',
  },
  {
    id: 'b2',
    title: 'Newborn Care: Essential Tips for the First 28 Days',
    excerpt: 'The neonatal period is a critical time for your baby. Dr. Anshuman shares essential tips for maintaining newborn health, safety, and nutrition.',
    category: 'Neonatology',
    date: '19 Apr 2026',
  },
  {
    id: 'b3',
    title: 'Pediatric Nutrition: Building a Strong Foundation for Growth',
    excerpt: 'Dr. Anshuman explains how proper nutrition and growth monitoring can prevent long-term health issues and ensure your child reaches every milestone.',
    category: 'Child Nutrition',
    date: '19 Apr 2026',
  },
]

export default function BlogPreview() {
  const { blogs, loading } = useBlogs()
  const displayed = (blogs.length >= 3 ? blogs : FALLBACK_POSTS).slice(0, 3)

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-primary-600 font-semibold text-sm tracking-widest uppercase">Health Tips</span>
            <h2 className="section-title mt-3">Latest from Our Blog</h2>
            <p className="text-gray-500 mt-2 max-w-lg">
              Expert advice, health insights, and preventive care tips — written by our doctors.
            </p>
          </div>
          <Link to="/blog" className="hidden md:flex items-center gap-2 text-primary-600 font-semibold text-sm hover:gap-3 transition-all flex-shrink-0">
            View All Articles <FiArrowRight />
          </Link>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2 h-80 bg-gray-200 rounded-2xl animate-pulse" />
            <div className="flex flex-col gap-5">
              <div className="h-40 bg-gray-200 rounded-2xl animate-pulse" />
              <div className="h-40 bg-gray-200 rounded-2xl animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {displayed.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-2 bg-white rounded-[5px] overflow-hidden border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group flex flex-col"
              >
                <div className="h-40 bg-gradient-to-br from-primary-400 to-accent-600 relative overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute bottom-4 left-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/90 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      {displayed[0].category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading font-bold text-navy-800 text-xl mt-0 mb-3 leading-snug group-hover:text-primary-700 transition-colors">
                    {displayed[0].title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">
                    {displayed[0].excerpt || displayed[0].summary}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-gray-400 text-xs">
                      <span className="flex items-center gap-1">
                        <FiCalendar className="w-3.5 h-3.5" /> 
                        {displayed[0].date || formatDate(displayed[0].createdAt)}
                      </span>
                    </div>
                    <Link
                      to={`/blog/${displayed[0].id}`}
                      className="inline-flex items-center gap-1.5 text-primary-600 text-sm font-semibold hover:gap-2.5 transition-all"
                    >
                      Read More <FiArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {displayed.length > 1 && (
              <div className="flex flex-col gap-5">
                {displayed.slice(1).map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i + 1) * 0.1 }}
                    className="bg-white rounded-[5px] overflow-hidden border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group flex flex-col flex-1"
                  >
                    <div className="h-1.5 bg-gradient-to-r from-primary-400 to-primary-600 flex-shrink-0" />
                    <div className="p-5 flex flex-col flex-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full self-start mb-3">
                        {post.category}
                      </span>
                      <h3 className="font-heading font-bold text-navy-800 text-base mb-2 leading-snug group-hover:text-primary-700 transition-colors line-clamp-2 flex-1">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4">
                        {post.excerpt || post.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-xs flex items-center gap-1">
                          <FiCalendar className="w-3 h-3" /> 
                          {post.date || formatDate(post.createdAt)}
                        </span>
                        <Link
                          to={`/blog/${post.id}`}
                          className="text-primary-600 text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                        >
                          Read <FiArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="text-center mt-8 md:hidden">
          <Link to="/blog" className="btn-secondary">
            View All Articles <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}
