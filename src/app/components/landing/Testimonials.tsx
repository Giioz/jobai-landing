// components/Testimonials.tsx
import { useEffect, useState } from 'react'

interface Testimonial {
  quote: string
  author: string
}

export default function Testimonials() {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const testimonials: Testimonial[] = [
    {
      quote: "This tool saved me hours of work and helped me land interviews faster than ever!",
      author: "— Sarah M."
    },
    {
      quote: "The AI cover letters sound so natural — I got responses from companies I never heard back from before.",
      author: "— Mike T."
    },
    {
      quote: "Finally, a tool that understands what recruiters want. My application rate doubled!",
      author: "— Jessica L."
    }
  ]

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className={`text-center text-4xl font-bold mb-16 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent animate-on-scroll transition-all duration-800 ${
          visibleItems.has('testimonials-title') ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`} id="testimonials-title">
          What Job Seekers Are Saying
        </h2>
        <div className="grid md:grid-cols-3 gap-10 mt-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              id={`testimonial-${index}`}
              className={`bg-gray-50 p-10 rounded-2xl text-center relative border-l-4 border-l-blue-600 flex flex-col min-h-48 animate-on-scroll ${
                visibleItems.has(`testimonial-${index}`) ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
              }`}
            >
              <div className="absolute top-3 left-5 text-6xl text-blue-600 opacity-30">"</div>
              <p className="italic mb-5 text-gray-600 leading-relaxed flex-1 pt-6">{testimonial.quote}</p>
              <div className="font-semibold text-slate-800 mt-auto">{testimonial.author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}