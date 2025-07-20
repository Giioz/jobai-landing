// components/Benefits.tsx
import { useEffect, useState } from 'react'

interface Benefit {
  icon: string
  title: string
  description: string
}

export default function Benefits() {
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

  const benefits: Benefit[] = [
    {
      icon: "⚡",
      title: "Save Time",
      description: "Generate professional, customized applications in seconds — no more writer's block or frustration."
    },
    {
      icon: "🎯",
      title: "Stand Out",
      description: "Tailored cover letters and resume suggestions designed to catch recruiters' eyes."
    },
    {
      icon: "🔧",
      title: "All-in-One",
      description: "Cover letters, resume optimization, and LinkedIn outreach messages in one easy place."
    },
    {
      icon: "📊",
      title: "Track Applications",
      description: "Save and organize your applications with our built-in tracking system."
    },
    {
      icon: "💰",
      title: "Affordable",
      description: "Start free with one application per week — upgrade anytime for unlimited access."
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className={`text-center text-4xl font-bold mb-16 animate-on-scroll transition-all duration-800 ${
          visibleItems.has('benefits-title') ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`} id="benefits-title">
          Why Choose Our AI Job Application Assistant?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              id={`benefit-${index}`}
              className={`text-center p-8 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 hover:transform hover:-translate-y-1 transition-all duration-300 flex flex-col min-h-56 animate-on-scroll ${
                visibleItems.has(`benefit-${index}`) ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
              }`}
            >
              <div className="text-5xl mb-5">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
              <p className="opacity-90 leading-relaxed flex-1">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}