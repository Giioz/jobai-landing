// components/Pricing.tsx
import { useEffect, useState } from 'react'

interface PricingPlan {
  name: string
  price: string
  features: string[]
  featured?: boolean
}

export default function Pricing() {
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

  const showDemo = () => {
    alert('🚀 Demo Mode!\n\nThis would normally redirect to the application form where users can:\n\n• Upload their resume\n• Paste job descriptions\n• Generate personalized cover letters\n• Get LinkedIn messages\n• Download PDF applications\n\nSign up to start your free trial!')
  }

  const plans: PricingPlan[] = [
    {
      name: "Free Plan",
      price: "$0",
      features: [
        "1 AI-generated application per week",
        "Basic cover letter templates",
        "Resume optimization tips",
        "Email support"
      ]
    },
    {
      name: "Pro Plan",
      price: "$7",
      featured: true,
      features: [
        "Unlimited AI applications",
        "PDF downloads",
        "Priority support",
        "LinkedIn message templates",
        "Application tracking",
        "Advanced customization"
      ]
    }
  ]

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className={`text-center text-4xl font-bold mb-16 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent animate-on-scroll transition-all duration-800 ${
          visibleItems.has('pricing-title') ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`} id="pricing-title">
          Simple Pricing — Get More with Pro
        </h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto mt-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              id={`plan-${index}`}
              className={`bg-white p-10 rounded-2xl text-center shadow-lg hover:transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col min-h-128 relative animate-on-scroll ${
                plan.featured ? 'border-3 border-blue-600 scale-105' : ''
              } ${
                visibleItems.has(`plan-${index}`) ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-semibold mb-3 text-slate-800">{plan.name}</h3>
              <div className="text-5xl font-bold text-blue-600 mb-5">
                {plan.price}<span className="text-lg text-gray-600">/month</span>
              </div>
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-gray-600 flex items-center">
                    <span className="text-green-500 font-bold mr-3">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={showDemo}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-full font-semibold hover:transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300"
              >
                {plan.featured ? 'Upgrade to Pro' : 'Get Started Free'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}