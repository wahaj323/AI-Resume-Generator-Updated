import { useState } from 'react';
import Header from '@/components/custom/header';
import { UserButton } from '@clerk/clerk-react';
import { Button } from "@/components/ui/button";
import { ChevronRight, FileText, Star, Clock, CheckCircle, PenTool, Download, ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';

function Home() {
  const [hoverFeature, setHoverFeature] = useState(null);

  const features = [
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "Easy to Customize",
      description: "Create and edit your resume with our intuitive interface",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Professional Templates",
      description: "Choose from a variety of professionally designed templates",
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Export Options",
      description: "Download your resume in PDF, DOCX, or other formats",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "ATS Friendly",
      description: "Ensure your resume passes through Applicant Tracking Systems",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      text: "This resume builder helped me land my dream job! It's so easy to use and the templates look professional.",
      stars: 5,
    },
    {
      name: "Michael Chen",
      role: "Marketing Specialist",
      text: "I was struggling with formatting my resume until I found this tool. Now I have a polished resume that stands out!",
      stars: 5,
    },
    {
      name: "Jessica Williams",
      role: "UX Designer",
      text: "The customization options are incredible. I was able to create a resume that showcases my creativity and skills.",
      stars: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Create professional 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"> resumes </span>
              in minutes
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl">
              Stand out from the crowd with a professionally designed resume. Quick, easy, and ATS-friendly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-6 text-lg font-medium">
                <Link to="/auth/sign-in" className="flex items-center">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 rounded-lg px-8 py-6 text-lg font-medium">
                View Templates
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 rounded-lg shadow-xl overflow-hidden border-2 border-gray-100">
              <img 
                src="https://static-cse.canva.com/blob/566484/modernresumes.jpg" 
                alt="Resume Template Preview" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="absolute -top-6 -right-6 w-64 h-64 bg-blue-100 rounded-full opacity-70 blur-3xl -z-10"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-indigo-100 rounded-full opacity-70 blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose CVNest</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              All the tools you need to create a standout resume that gets you noticed
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-blue-200"
                onMouseEnter={() => setHoverFeature(index)}
                onMouseLeave={() => setHoverFeature(null)}
              >
                <div className={`p-3 rounded-lg inline-block mb-4 ${hoverFeature === index ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to create your professional resume
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center px-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose a Template</h3>
              <p className="text-gray-600">
                Browse our collection of professional templates designed for various industries
              </p>
            </div>
            
            <div className="text-center px-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fill in Your Details</h3>
              <p className="text-gray-600">
                Add your personal information, work experience, skills, and education
              </p>
            </div>
            
            <div className="text-center px-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Download & Share</h3>
              <p className="text-gray-600">
                Export your resume in your preferred format and start applying for jobs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Thousands of job seekers have found success with our resume builder
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to create your professional resume?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of job seekers who have successfully landed their dream jobs with our resume builder
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 rounded-lg px-8 py-6 text-lg font-medium">
            <Link to="/auth/sign-in" className="flex items-center">
              Get Started Now <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Resume Builder</h3>
            <p className="mb-4">Create professional resumes that get you hired.</p>
          </div>
          <div>
            <h4 className="text-white text-md font-semibold mb-4">Templates</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Professional</a></li>
              <li><a href="#" className="hover:text-white transition">Creative</a></li>
              <li><a href="#" className="hover:text-white transition">Simple</a></li>
              <li><a href="#" className="hover:text-white transition">Modern</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-md font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Resume Tips</a></li>
              <li><a href="#" className="hover:text-white transition">Cover Letters</a></li>
              <li><a href="#" className="hover:text-white transition">Career Advice</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-md font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} Resume Builder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home