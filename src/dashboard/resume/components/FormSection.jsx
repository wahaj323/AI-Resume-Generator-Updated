import React, { useState, useEffect } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Home, CheckCircle2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import ThemeColor from "./ThemeColor";

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { resumeId } = useParams();

  // Simple mobile detection using window.innerWidth
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formSteps = [
    { id: 1, name: "Personal Details" },
    { id: 2, name: "Summary" },
    { id: 3, name: "Experience" },
    { id: 4, name: "Education" },
    { id: 5, name: "Skills" },
    { id: 6, name: "Preview" }
  ];

  const renderForm = () => {
    switch (activeFormIndex) {
      case 1: return <PersonalDetail enabledNext={setEnableNext} />;
      case 2: return <Summary enabledNext={setEnableNext} />;
      case 3: return <Experience enabledNext={setEnableNext} />;
      case 4: return <Education enabledNext={setEnableNext} />;
      case 5: return <Skills enabledNext={setEnableNext} />;
      case 6: return <Navigate to={`/my-resume/${resumeId}/view`} />;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Progress Stepper */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Link to="/dashboard">
            <Button variant="outline" size={isMobile ? "icon" : "default"}>
              <Home className="h-4 w-4" />
              {!isMobile && <span className="ml-2">Dashboard</span>}
            </Button>
          </Link>
          
          <div className="flex items-center space-x-2">
            <ThemeColor />
          </div>
        </div>

        <div className="flex items-center justify-between mb-6 overflow-x-auto pb-2">
          {formSteps.map((step) => (
            <div key={step.id} className="flex flex-col items-center min-w-[60px]">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full h-10 w-10 ${
                  activeFormIndex === step.id ? "bg-primary text-primary-foreground" : ""
                }`}
                onClick={() => activeFormIndex < step.id ? null : setActiveFormIndex(step.id)}
              >
                {activeFormIndex > step.id ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <span>{step.id}</span>
                )}
              </Button>
              {!isMobile && (
                <span className={`text-xs mt-1 ${
                  activeFormIndex === step.id ? "font-medium text-primary" : "text-muted-foreground"
                }`}>
                  {step.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-card rounded-lg border p-6 shadow-sm">
        {renderForm()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <div>
          {activeFormIndex > 1 && (
            <Button
              variant="outline"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {!isMobile && "Previous"}
            </Button>
          )}
        </div>
        
        <Button
          disabled={!enableNext}
          onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          className="gap-2"
        >
          {activeFormIndex === formSteps.length - 1 ? "Preview Resume" : "Next"}
          {activeFormIndex !== formSteps.length - 1 && <ArrowRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default FormSection;