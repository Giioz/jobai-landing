// components/Navigation.tsx
import { useState, useEffect } from 'react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const showDemo = () => {
    alert('🚀 Demo Mode!\n\nThis would normally redirect to the application form where users can:\n\n• Upload their resume\n• Paste job descriptions\n• Generate personalized cover letters\n• Get LinkedIn messages\n• Download PDF applications\n\nSign up to start your free trial!')
  }

  const smoothScroll = (targetId: string) => {
    const target = document.querySelector(targetId)
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg' : 'bg-white/95 backdrop-blur-xl'
    }`}>
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            JobAI Pro
          </div>
          <ul className="hidden md:flex gap-8">
            <li>
              <button 
                onClick={() => smoothScroll('#how-it-works')}
                className="text-gray-600 font-medium hover:text-blue-600 transition-colors"
              >
                How It Works
              </button>
            </li>
            <li>
              <button 
                onClick={() => smoothScroll('#pricing')}
                className="text-gray-600 font-medium hover:text-blue-600 transition-colors"
              >
                Pricing
              </button>
            </li>
            <li>
              <button 
                onClick={() => smoothScroll('#testimonials')}
                className="text-gray-600 font-medium hover:text-blue-600 transition-colors"
              >
                Reviews
              </button>
            </li>
          </ul>
          <button 
            onClick={showDemo}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-full font-semibold hover:transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}