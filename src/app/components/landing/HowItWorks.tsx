// components/HowItWorks.tsx
import { useEffect, useState } from 'react'

interface Step {
  number: number
  title: string
  description: string
}

export default function HowItWorks() {
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

  const steps: Step[] = [
    {
      number: 1,
      title: "Upload Your Resume",
      description: "Upload your resume or paste your LinkedIn profile to get started instantly."
    },
    {
      number: 2,
      title: "Add Job Description", 
      description: "Paste the job description or link for your dream job that you want to apply for."
    },
    {
      number: 3,
      title: "Get Personalized Content",
      description: "Instantly receive a personalized cover letter, resume tips, and LinkedIn message crafted just for you."
    }
  ]

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className={`text-center text-4xl font-bold mb-16 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent animate-on-scroll transition-all duration-800 ${
          visibleItems.has('how-title') ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`} id="how-title">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-10 mt-10">
          {steps.map((step, index) => (
            <div
              key={step.number}
              id={`step-${index}`}
              className={`bg-white p-10 rounded-2xl text-center shadow-lg hover:transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border-t-4 border-t-blue-600 flex flex-col min-h-72 animate-on-scroll ${
                visibleItems.has(`step-${index}`) ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
              }`}
            >
              <div className="w-15 h-15 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-5 mx-auto">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed flex-1">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}