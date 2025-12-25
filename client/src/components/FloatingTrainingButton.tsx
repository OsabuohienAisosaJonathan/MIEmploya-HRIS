import { Link } from "wouter";
import { GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";

export function FloatingTrainingButton() {
  const [isEnlarged, setIsEnlarged] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsEnlarged(true);
      setTimeout(() => {
        setIsEnlarged(false);
      }, 1000);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Link href="/training">
      <div
        className="fixed left-5 bottom-5 z-50 cursor-pointer group"
        data-testid="button-floating-training"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full blur-sm opacity-60 group-hover:opacity-80 transition-opacity animate-pulse" />
          <div 
            className={`relative flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out ${
              isEnlarged ? 'scale-120' : 'scale-100 hover:scale-105'
            }`}
            style={{
              transform: isEnlarged ? 'scale(1.2)' : undefined
            }}
          >
            <GraduationCap className="w-6 h-6" />
            <div className="flex flex-col items-center text-center">
              <div className="text-sm font-bold whitespace-nowrap leading-tight">
                Free Training!!!
              </div>
              <div className="text-xs font-medium opacity-90 whitespace-nowrap leading-tight">
                Register Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
