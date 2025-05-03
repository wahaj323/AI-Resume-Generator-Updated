import { SignIn } from '@clerk/clerk-react';
import { FileText, ArrowLeft, UserPlus, LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import Header from '@/components/custom/Header';

function SignInPage() {
  const [viewMode, setViewMode] = useState('signin');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header with back button */}
    <Header/>
      <div className="w-full p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center text-gray-600 hover:text-gray-900"
            onClick={() => window.location.href = '/'}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 md:px-6 py-8 md:py-12">
        {/* Left side - Branding & Info */}
        <div className="w-full max-w-md mb-8 md:mb-0 md:mr-12 lg:mr-24">
          <div className="flex items-center mb-6">
            <div className="bg-blue-600 rounded-lg p-2 mr-3">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {viewMode === 'signin' ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {viewMode === 'signin' 
              ? 'Sign in to your account to continue creating professional resumes that get you noticed.' 
              : 'Sign up to start creating professional resumes that will help you land your dream job.'}
          </p>
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-800">
            <h3 className="font-semibold mb-2">Why create an account?</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="bg-blue-100 rounded-full p-1 mr-2 mt-0.5">
                  <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Save and edit your resumes anytime
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 rounded-full p-1 mr-2 mt-0.5">
                  <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Access premium templates and features
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 rounded-full p-1 mr-2 mt-0.5">
                  <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Download in multiple formats
              </li>
            </ul>
          </div>
          
          {/* Toggle between sign in and sign up */}
          <div className="mt-8 flex flex-col space-y-3">
            <p className="text-gray-600 text-center">
              {viewMode === 'signin' ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Button 
              variant="outline" 
              className="border-gray-300 text-gray-700 flex items-center justify-center"
              onClick={() => setViewMode(viewMode === 'signin' ? 'signup' : 'signin')}
            >
              {viewMode === 'signin' 
                ? <><UserPlus className="mr-2 h-4 w-4" /> Create Account</>
                : <><LogIn className="mr-2 h-4 w-4" /> Sign In Instead</>
              }
            </Button>
          </div>
        </div>
        
        {/* Right side - Clerk Sign In component */}
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
            <SignIn 
              afterSignInUrl="/dashboard"
              afterSignUpUrl="dashboard"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-none",
                  headerTitle: "text-2xl font-bold text-gray-900",
                  headerSubtitle: "text-gray-600",
                  formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                  footerAction: "text-blue-600",
                  dividerLine: "bg-gray-200",
                  dividerText: "text-gray-500",
                  formFieldLabel: "text-gray-700",
                  formFieldInput: "border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg",
                  formFieldErrorText: "text-red-500",
                  socialButtonsBlockButton: "border border-gray-300 text-gray-700 hover:bg-gray-50",
                }
              }}
              routing="path"
              path="/auth/sign-in"
              signUpUrl="/auth/sign-in"
            />
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="w-full py-6 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center text-gray-500 text-sm">
          <p>By signing in or creating an account, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.</p>
        </div>
      </div>
    </div>
  );
}

export default SignInPage