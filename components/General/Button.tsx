
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: 'action' | 'quiet' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  intent = 'action', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium ethos-transition overflow-hidden rounded-[var(--ethos-border-radius)]";
  
  const intentStyles = {
    action: "bg-[var(--ethos-primary)] text-white hover:shadow-lg active:scale-95",
    quiet: "bg-transparent text-[var(--ethos-text)] border border-[var(--ethos-muted)] border-opacity-20 hover:border-opacity-100 hover:bg-[var(--ethos-muted)] hover:bg-opacity-5",
    danger: "bg-transparent text-[var(--ethos-danger)] border border-[var(--ethos-danger)] border-opacity-30 hover:bg-[var(--ethos-danger)] hover:text-white"
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };

  return (
    <button 
      className={`${baseStyles} ${intentStyles[intent]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {intent === 'action' && (
        <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 ethos-transition" />
      )}
    </button>
  );
};
