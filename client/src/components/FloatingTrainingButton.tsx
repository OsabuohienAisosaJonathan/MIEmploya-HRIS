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
            className={`relative flex flex-col items-center gap-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-2 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out ${
              isEnlarged ? 'scale-120' : 'scale-100 hover:scale-105'
            }`}
            style={{
              transform: isEnlarged ? 'scale(1.2)' : undefined
            }}
          >
            <GraduationCap className="w-3 h-3" />
            <div className="writing-mode-vertical text-[15px] font-bold tracking-wide whitespace-nowrap">
              Free Training!!!
            </div>
            <div className="writing-mode-vertical text-[12px] font-medium opacity-90 whitespace-nowrap">
              Register Now
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
