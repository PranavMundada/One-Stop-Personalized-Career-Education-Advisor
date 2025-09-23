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
  options?: string[];
  category: string;
  type: 'multiple-choice' | 'rating';
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
    category: "interests",
    type: "multiple-choice"
  },
  {
    id: 2,
    question: "Which subject did you perform best in during school?",
    options: ["Mathematics", "Science", "English/Literature", "Social Studies"],
    category: "academic",
    type: "multiple-choice"
  },
  {
    id: 3,
    question: "I am the life of the party",
    category: "personality",
    type: "rating"
  },
  {
    id: 4,
    question: "I don't talk a lot",
    category: "personality",
    type: "rating"
  },
  {
    id: 5,
    question: "I feel comfortable around people",
    category: "personality",
    type: "rating"
  },
  {
    id: 6,
    question: "I like to keep in the background",
    category: "personality",
    type: "rating"
  },
  {
    id: 7,
    question: "I start conversations",
    category: "personality",
    type: "rating"
  },
  {
    id: 8,
    question: "I have little to say",
    category: "personality",
    type: "rating"
  },
  {
    id: 9,
    question: "I talk to many different people at parties",
    category: "personality",
    type: "rating"
  },
  {
    id: 10,
    question: "I don't like to draw attention to myself",
    category: "personality",
    type: "rating"
  },
  {
    id: 11,
    question: "Your ideal work environment would be:",
    options: ["Laboratory or technical facility", "Office with team collaboration", "Creative studio", "Field work or travel"],
    category: "work_style",
    type: "multiple-choice"
  },
  {
    id: 12,
    question: "When solving problems, you prefer to:",
    options: ["Use logical step-by-step approach", "Think creatively and innovatively", "Research thoroughly first", "Discuss with others"],
    category: "problem_solving",
    type: "multiple-choice"
  },
  {
    id: 13,
    question: "Which activity sounds most appealing?",
    options: ["Building or fixing things", "Teaching or helping others", "Managing a business", "Creating art or content"],
    category: "interests",
    type: "multiple-choice"
  },
  {
    id: 14,
    question: "Your strength lies in:",
    options: ["Analytical thinking", "Communication skills", "Creative expression", "Leadership abilities"],
    category: "strengths",
    type: "multiple-choice"
  },
  {
    id: 15,
    question: "You would be most satisfied working in:",
    options: ["Technology sector", "Healthcare/Education", "Business/Finance", "Arts/Media"],
    category: "career_preference",
    type: "multiple-choice"
  }
];

export const AptitudeTest = ({ onComplete, onBack }: AptitudeTestProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  
  const question = questions[currentQuestion];
  const selectedAnswer = answers[question.id] || "";

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({ ...prev, [question.id]: value }));
  };

  const handleNext = () => {
    if (selectedAnswer) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Test completed
        onComplete(answers);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

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
                
                {question.type === "multiple-choice" ? (
                  <RadioGroup value={selectedAnswer} onValueChange={handleAnswerChange}>
                    <div className="space-y-3">
                      {question.options?.map((option, index) => (
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
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Strongly Disagree</span>
                      <span>Strongly Agree</span>
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <div key={rating} className="flex flex-col items-center space-y-2">
                          <Label className="text-sm font-medium">{rating}</Label>
                          <div
                            className={`w-12 h-12 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all ${
                              selectedAnswer === rating.toString()
                                ? "border-primary bg-primary text-white"
                                : "border-muted hover:border-primary/50"
                            }`}
                            onClick={() => handleAnswerChange(rating.toString())}
                          >
                            {selectedAnswer === rating.toString() && (
                              <CheckCircle className="w-6 h-6" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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