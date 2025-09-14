import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, Clock, CheckCircle } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  category: string;
}

interface AptitudeTestProps {
  onComplete: (answers: Record<number, string>) => void;
  onBack: () => void;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What type of activities do you enjoy most?",
    options: ["Solving mathematical problems", "Reading and writing", "Drawing and designing", "Working with people"],
    category: "interests"
  },
  {
    id: 2,
    question: "Which subject did you perform best in during school?",
    options: ["Mathematics", "Science", "English/Literature", "Social Studies"],
    category: "academic"
  },
  {
    id: 3,
    question: "In group projects, you typically:",
    options: ["Lead the team", "Handle research and analysis", "Manage coordination", "Provide creative ideas"],
    category: "personality"
  },
  {
    id: 4,
    question: "Your ideal work environment would be:",
    options: ["Laboratory or technical facility", "Office with team collaboration", "Creative studio", "Field work or travel"],
    category: "work_style"
  },
  {
    id: 5,
    question: "When solving problems, you prefer to:",
    options: ["Use logical step-by-step approach", "Think creatively and innovatively", "Research thoroughly first", "Discuss with others"],
    category: "problem_solving"
  },
  {
    id: 6,
    question: "Which activity sounds most appealing?",
    options: ["Building or fixing things", "Teaching or helping others", "Managing a business", "Creating art or content"],
    category: "interests"
  },
  {
    id: 7,
    question: "Your strength lies in:",
    options: ["Analytical thinking", "Communication skills", "Creative expression", "Leadership abilities"],
    category: "strengths"
  },
  {
    id: 8,
    question: "You would be most satisfied working in:",
    options: ["Technology sector", "Healthcare/Education", "Business/Finance", "Arts/Media"],
    category: "career_preference"
  }
];

export const AptitudeTest = ({ onComplete, onBack }: AptitudeTestProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    if (selectedAnswer) {
      setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: selectedAnswer }));
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer("");
      } else {
        // Test completed
        onComplete({ ...answers, [questions[currentQuestion].id]: selectedAnswer });
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[questions[currentQuestion - 1].id] || "");
    }
  };

  const question = questions[currentQuestion];

  return (
    <section className="py-12 px-4 bg-gradient-card min-h-screen">
      <div className="container mx-auto max-w-3xl">
        <Card className="shadow-card border-0">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-primary">Aptitude Assessment</CardTitle>
            <CardDescription className="text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </CardDescription>
            
            <div className="mt-4">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% Complete</p>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6">
              <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
                <h3 className="text-lg font-semibold text-primary mb-4">{question.question}</h3>
                
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                  <div className="space-y-3">
                    {question.options.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/10 transition-colors"
                      >
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label 
                          htmlFor={`option-${index}`}
                          className="flex-1 cursor-pointer text-base"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="flex justify-between items-center pt-4">
                <Button
                  variant="outline"
                  onClick={currentQuestion === 0 ? onBack : handlePrevious}
                  className="flex items-center gap-2"
                >
                  {currentQuestion === 0 ? "Back to Details" : "Previous Question"}
                </Button>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>~{questions.length - currentQuestion} min remaining</span>
                </div>
                
                <Button
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                  variant={currentQuestion === questions.length - 1 ? "secondary" : "default"}
                  className="flex items-center gap-2"
                >
                  {currentQuestion === questions.length - 1 ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Complete Test
                    </>
                  ) : (
                    "Next Question"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};