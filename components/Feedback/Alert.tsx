
import React from 'react';

interface AlertProps {
  intent?: 'info' | 'success' | 'warning' | 'danger';
  title: string;
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ intent = 'info', title, children }) => {
  const colors = {
    info: 'var(--ethos-primary)',
    success: 'var(--ethos-success)',
    warning: 'var(--ethos-warning)',
    danger: 'var(--ethos-danger)',
  };

  return (
    <div 
      className="p-6 border-l-2 ethos-transition animate-in slide-in-from-left-4 duration-500"
      style={{ 
        borderColor: colors[intent],
        backgroundColor: `color-mix(in srgb, ${colors[intent]}, transparent 92%)`
      }}
    >
      <h4 className="font-serif text-lg italic mb-1" style={{ color: colors[intent] }}>
        {title}
      </h4>
      <div className="text-sm opacity-80 leading-relaxed">
        {children}
      </div>
    </div>
  );
};
