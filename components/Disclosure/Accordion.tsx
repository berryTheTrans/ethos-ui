
import React, { useState } from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[var(--ethos-muted)] border-opacity-10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center group text-left focus:outline-none"
      >
        <span className={`text-xl font-serif ethos-transition ${isOpen ? 'text-[var(--ethos-primary)]' : 'text-[var(--ethos-text)]'}`}>
          {title}
        </span>
        <span className={`ethos-transition transform ${isOpen ? 'rotate-180' : ''} opacity-40 group-hover:opacity-100`}>
          ↓
        </span>
      </button>
      <div className={`overflow-hidden ethos-transition ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="text-sm text-[var(--ethos-muted)] leading-relaxed max-w-prose">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Accordion: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col">
    {children}
  </div>
);
