import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, TrendingUp, BookOpen, MapPin, Star, Users } from "lucide-react";

interface CareerMatch {
  career: string;
  field: string;
  match: number;
  description: string;
  subjects: string[];
  colleges: string[];
  jobProspects: string[];
}

interface CareerResultsProps {
  studentName: string;
  onRestart: () => void;
}

export const CareerResults = ({ studentName, onRestart }: CareerResultsProps) => {
  // Mock AI prediction results - this would come from your trained model
  const careerMatches: CareerMatch[] = [
    {
      career: "Computer Science Engineering",
      field: "Technology",
      match: 92,
      description: "Perfect match for your analytical thinking and problem-solving skills. High demand in the current job market.",
      subjects: ["Mathematics", "Physics", "Computer Science"],
      colleges: ["IIT Delhi", "NIT Trichy", "Delhi Technological University"],
      jobProspects: ["Software Developer", "Data Scientist", "AI Engineer", "Product Manager"]
    },
    {
      career: "Business Administration",
      field: "Commerce",
      match: 87,
      description: "Great fit for your leadership qualities and communication skills. Excellent entrepreneurial opportunities.",
      subjects: ["Mathematics", "Economics", "Business Studies"],
      colleges: ["DU - SRCC", "Christ University", "Loyola College"],
      jobProspects: ["Business Analyst", "Marketing Manager", "Consultant", "Entrepreneur"]
    },
    {
      career: "Biotechnology",
      field: "Science",
      match: 78,
      description: "Combines your interest in science with research opportunities. Growing field with future potential.",
      subjects: ["Biology", "Chemistry", "Mathematics"],
      colleges: ["JNU Delhi", "BHU Varanasi", "University of Pune"],
      jobProspects: ["Research Scientist", "Quality Analyst", "Bio-Engineer", "Medical Writer"]
    }
  ];

  return (
    <section className="py-12 px-4 bg-gradient-card min-h-screen">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Congratulations, {studentName}!
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Based on your aptitude assessment, here are your personalized career recommendations
          </p>
        </div>

        {/* Career Matches */}
        <div className="space-y-6 mb-12">
          {careerMatches.map((match, index) => (
            <Card key={index} className="shadow-card border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant={index === 0 ? "default" : "secondary"} className="text-sm">
                        #{index + 1} Best Match
                      </Badge>
                      <Badge variant="outline" className="text-sm">
                        {match.field}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl text-primary">{match.career}</CardTitle>
                    <CardDescription className="text-base mt-2">{match.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">{match.match}%</div>
                    <div className="text-sm text-muted-foreground">Match Score</div>
                  </div>
                </div>
                <Progress value={match.match} className="h-2 mt-4" />
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Required Subjects
                    </h4>
                    <div className="space-y-2">
                      {match.subjects.map((subject, idx) => (
                        <Badge key={idx} variant="outline" className="mr-2 mb-2">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Top Colleges
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {match.colleges.map((college, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Star className="w-3 h-3 text-accent" />
                          {college}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Career Prospects
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {match.jobProspects.map((job, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Users className="w-3 h-3 text-secondary" />
                          {job}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg" className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Download Detailed Report
            </Button>
            <Button variant="secondary" size="lg" className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Find Nearby Colleges
            </Button>
            <Button variant="outline" size="lg" onClick={onRestart}>
              Take Test Again
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Need guidance? Our counselors are here to help you make the right choice.
          </p>
        </div>
      </div>
    </section>
  );
};