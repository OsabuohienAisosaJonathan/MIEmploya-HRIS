import { Link } from "wouter";
import { GraduationCap } from "lucide-react";

export function FloatingTrainingButton() {
  return (
    <Link href="/training">
      <div
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 cursor-pointer group"
        data-testid="button-floating-training"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full blur-md opacity-60 group-hover:opacity-80 transition-opacity animate-pulse" />
          <div className="relative flex flex-col items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <GraduationCap className="w-6 h-6" />
            <div className="writing-mode-vertical text-xs font-bold tracking-wide whitespace-nowrap">
              Free Training!!!
            </div>
            <div className="writing-mode-vertical text-[10px] font-medium opacity-90 whitespace-nowrap">
              Register Now
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
