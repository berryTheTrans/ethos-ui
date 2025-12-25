
import React from 'react';

interface ProgressProps {
  value: number; // 0 to 100
  label?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, label }) => {
  return (
    <div className="w-full space-y-2">
      {label && (
        <div className="flex justify-between text-[10px] uppercase tracking-widest text-[var(--ethos-muted)]">
          <span>{label}</span>
          <span>{Math.round(value)}%</span>
        </div>
      )}
      <div className="h-[2px] w-full bg-[var(--ethos-muted)] bg-opacity-10 overflow-hidden">
        <div 
          className="h-full bg-[var(--ethos-primary)] ethos-transition"
          style={{ 
            width: `${value}%`,
            transitionDuration: '1s'
          }}
        />
      </div>
    </div>
  );
};
