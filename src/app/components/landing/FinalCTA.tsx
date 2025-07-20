// components/FinalCTA.tsx
export default function FinalCTA() {
    const showDemo = () => {
      alert('🚀 Demo Mode!\n\nThis would normally redirect to the application form where users can:\n\n• Upload their resume\n• Paste job descriptions\n• Generate personalized cover letters\n• Get LinkedIn messages\n• Download PDF applications\n\nSign up to start your free trial!')
    }
  
    return (
      <section className="py-24 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white text-center">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl font-bold mb-5">Ready to Land Your Dream Job?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of job seekers using AI to apply smarter, not harder.
          </p>
          <button 
            onClick={showDemo}
            className="bg-white/20 text-white px-8 py-4 border-2 border-white/30 rounded-full font-semibold text-lg backdrop-blur-md hover:bg-white/30 hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            Get Started Free
          </button>
        </div>
      </section>
    )
  }