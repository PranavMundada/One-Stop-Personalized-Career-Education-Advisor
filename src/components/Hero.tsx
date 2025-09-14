import { Button } from "@/components/ui/button";
import { GraduationCap, Users, TrendingUp } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your Career Journey
              <span className="block bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
                Starts Here
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Discover your perfect career path with our AI-powered aptitude assessment. 
              Get personalized guidance for choosing the right degree course and college.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={onGetStarted}
                className="shadow-hero"
              >
                <GraduationCap className="w-5 h-5" />
                Start Your Assessment
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <Users className="w-8 h-8 mb-4 text-accent-light" />
                <h3 className="font-semibold mb-2">50,000+</h3>
                <p className="text-sm text-white/80">Students Guided</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white transform -rotate-3 hover:rotate-0 transition-transform duration-300 mt-8">
                <TrendingUp className="w-8 h-8 mb-4 text-secondary-light" />
                <h3 className="font-semibold mb-2">95%</h3>
                <p className="text-sm text-white/80">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating shapes for visual appeal */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-accent/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-secondary/20 rounded-full animate-bounce"></div>
    </section>
  );
};