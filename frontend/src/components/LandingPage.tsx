import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Users, FileText, Bot, Zap, Award, Star, CheckCircle, Play } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Google",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "PortfolioAI helped me land my dream job! The AI chatbot impressed recruiters."
    },
    {
      name: "Marcus Johnson",
      role: "UX Designer",
      company: "Apple",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "The templates are stunning and the AI representative is incredibly smart."
    },
    {
      name: "Elena Rodriguez",
      role: "Product Manager",
      company: "Microsoft",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "Generated my portfolio in minutes. The personality quiz is genius!"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{
            left: mousePosition.x * 0.02 + 'px',
            top: mousePosition.y * 0.02 + 'px',
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{
            right: mousePosition.x * 0.01 + 'px',
            bottom: mousePosition.y * 0.01 + 'px',
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px)`,
            animationDelay: '4s'
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-10 animate-float"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 10 + 's',
              animationDuration: (Math.random() * 10 + 10) + 's'
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className={`flex items-center space-x-3 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                PortfolioAI
              </h1>
              <p className="text-xs text-gray-400">AI-Powered Portfolios</p>
            </div>
          </div>
          <nav className={`hidden md:flex space-x-8 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'}`}>
            <a href="#features" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Features</a>
            <a href="#templates" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Templates</a>
            <a href="#testimonials" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Reviews</a>
            <a href="#pricing" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Pricing</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-6 py-3 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-8 hover:bg-purple-500/20 transition-all duration-300">
              <Bot className="w-4 h-4 mr-2" />
              <span>AI-Powered Portfolio Generation</span>
              <Sparkles className="w-4 h-4 ml-2 animate-pulse" />
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Create Your Perfect
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                AI-Enhanced Portfolio
              </span>
            </h2>
          </div>
          
          <div className={`transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Generate stunning, professional portfolios with our AI-powered system. Stand out to recruiters with 
              personalized templates and an intelligent chatbot that represents you 24/7.
            </p>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button 
              onClick={onGetStarted}
              className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <span className="relative">Get Started Free</span>
              <ArrowRight className="ml-2 w-5 h-5 relative group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="group border-2 border-purple-500 text-purple-300 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-purple-500/10 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Stats */}
          <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-1300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {[
              { number: "10K+", label: "Portfolios Created" },
              { number: "95%", label: "Success Rate" },
              { number: "24/7", label: "AI Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative px-6 py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose PortfolioAI?
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of portfolio creation with our comprehensive AI-powered platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Smart Document Processing",
                description: "Upload your resume and documents. Our AI extracts and organizes your information automatically.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Sparkles,
                title: "8 Unique Templates",
                description: "Choose from professionally designed templates with unique color palettes and layouts.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Bot,
                title: "AI Chatbot Representative",
                description: "Your AI twin answers recruiter questions based on your personality and work style.",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: Users,
                title: "Personality Profiling",
                description: "20 strategic questions build your professional personality profile for authentic representation.",
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: Zap,
                title: "Real-time Preview",
                description: "See your portfolio update instantly as you make changes with our live preview system.",
                gradient: "from-teal-500 to-cyan-500"
              },
              {
                icon: Award,
                title: "Export & Share",
                description: "Download PDF versions or share direct links to your portfolio with potential employers.",
                gradient: "from-yellow-500 to-orange-500"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Loved by Professionals
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of professionals who've transformed their careers with PortfolioAI
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-500 hover:scale-105 group"
              >
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 group-hover:scale-110 transition-transform duration-300"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-purple-300">{testimonial.role}</p>
                    <p className="text-gray-400 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Create Your AI-Powered Portfolio?
          </h3>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of professionals who've elevated their careers with PortfolioAI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onGetStarted}
              className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <span className="relative">Start Building Now</span>
            </button>
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Free to start • No credit card required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-12 bg-black/30 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  PortfolioAI
                </h1>
                <p className="text-xs text-gray-400">AI-Powered Portfolios</p>
              </div>
            </div>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; 2024 PortfolioAI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;