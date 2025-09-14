import { useState } from "react";
import { Hero } from "@/components/Hero";
import { StudentDetailsForm } from "@/components/StudentDetailsForm";
import { AptitudeTest } from "@/components/AptitudeTest";
import { CareerResults } from "@/components/CareerResults";

type Step = "hero" | "details" | "test" | "results";

interface StudentDetails {
  name: string;
  age: string;
  gender: string;
  class: string;
  state: string;
  district: string;
  interests: string[];
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>("hero");
  const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(null);
  const [testAnswers, setTestAnswers] = useState<Record<number, string>>({});

  const handleGetStarted = () => {
    setCurrentStep("details");
  };

  const handleDetailsSubmit = (details: StudentDetails) => {
    setStudentDetails(details);
    setCurrentStep("test");
  };

  const handleTestComplete = (answers: Record<number, string>) => {
    setTestAnswers(answers);
    setCurrentStep("results");
  };

  const handleRestart = () => {
    setCurrentStep("hero");
    setStudentDetails(null);
    setTestAnswers({});
  };

  const handleBackToHero = () => {
    setCurrentStep("hero");
  };

  const handleBackToDetails = () => {
    setCurrentStep("details");
  };

  return (
    <div className="min-h-screen">
      {currentStep === "hero" && (
        <Hero onGetStarted={handleGetStarted} />
      )}
      
      {currentStep === "details" && (
        <StudentDetailsForm 
          onSubmit={handleDetailsSubmit}
          onBack={handleBackToHero}
        />
      )}
      
      {currentStep === "test" && (
        <AptitudeTest 
          onComplete={handleTestComplete}
          onBack={handleBackToDetails}
        />
      )}
      
      {currentStep === "results" && studentDetails && (
        <CareerResults 
          studentName={studentDetails.name}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Index;
