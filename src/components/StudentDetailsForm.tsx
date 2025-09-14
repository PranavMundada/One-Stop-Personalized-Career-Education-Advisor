import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, BookOpen, MapPin } from "lucide-react";

interface StudentDetails {
  name: string;
  age: string;
  gender: string;
  class: string;
  state: string;
  district: string;
  interests: string[];
}

interface StudentDetailsFormProps {
  onSubmit: (details: StudentDetails) => void;
  onBack: () => void;
}

export const StudentDetailsForm = ({ onSubmit, onBack }: StudentDetailsFormProps) => {
  const [details, setDetails] = useState<StudentDetails>({
    name: "",
    age: "",
    gender: "",
    class: "",
    state: "",
    district: "",
    interests: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  const interests = [
    "Science & Technology", "Arts & Literature", "Commerce & Business", 
    "Sports & Fitness", "Music & Entertainment", "Social Service",
    "Engineering & Design", "Medicine & Healthcare", "Teaching & Education"
  ];

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setDetails(prev => ({ ...prev, interests: [...prev.interests, interest] }));
    } else {
      setDetails(prev => ({ ...prev, interests: prev.interests.filter(i => i !== interest) }));
    }
  };

  return (
    <section className="py-12 px-4 bg-gradient-card min-h-screen">
      <div className="container mx-auto max-w-2xl">
        <Card className="shadow-card border-0">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-primary">Tell Us About Yourself</CardTitle>
            <CardDescription className="text-muted-foreground">
              Help us personalize your career guidance experience
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={details.name}
                    onChange={(e) => setDetails(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="border-border focus:ring-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    min="14"
                    max="25"
                    value={details.age}
                    onChange={(e) => setDetails(prev => ({ ...prev, age: e.target.value }))}
                    required
                    className="border-border focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Gender</Label>
                <RadioGroup
                  value={details.gender}
                  onValueChange={(value) => setDetails(prev => ({ ...prev, gender: value }))}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="class">Current Class</Label>
                <Select value={details.class} onValueChange={(value) => setDetails(prev => ({ ...prev, class: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your current class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10th">Class 10th</SelectItem>
                    <SelectItem value="12th">Class 12th</SelectItem>
                    <SelectItem value="graduated">Already Graduated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={details.state}
                    onChange={(e) => setDetails(prev => ({ ...prev, state: e.target.value }))}
                    required
                    className="border-border focus:ring-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    value={details.district}
                    onChange={(e) => setDetails(prev => ({ ...prev, district: e.target.value }))}
                    required
                    className="border-border focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Areas of Interest (Select all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {interests.map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={interest}
                        checked={details.interests.includes(interest)}
                        onChange={(e) => handleInterestChange(interest, e.target.checked)}
                        className="rounded border-border text-primary focus:ring-primary"
                      />
                      <Label htmlFor={interest} className="text-sm">{interest}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  className="flex-1"
                  disabled={!details.name || !details.age || !details.gender || !details.class}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Start Aptitude Test
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};