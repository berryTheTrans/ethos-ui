
import React, { useEffect, useRef } from 'react';
import { useFormContext } from './Form';

interface FieldProps {
  name: string;
  label: string;
  helper?: string;
  // Use React.ReactElement<any> to allow React.cloneElement to inject additional props like id and name
  children: React.ReactElement<any>;
  hidden?: boolean;
}

export const Field: React.FC<FieldProps> = ({ name, label, helper, children, hidden }) => {
  const { 
    registerField, 
    isFieldVisible, 
    errors, 
    validationStates,
    touched 
  } = useFormContext();

  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerField(name);
  }, [name, registerField]);

  const visible = isFieldVisible(name) && !hidden;
  const error = errors[name];
  const state = validationStates[name];
  const isTouched = touched[name];

  if (!visible) return null;

  return (
    <div 
      ref={fieldRef}
      className={`ethos-transition flex flex-col gap-2 group animate-in fade-in slide-in-from-bottom-4 duration-700`}
    >
      <div className="flex justify-between items-end mb-1">
        <label 
          htmlFor={name}
          className={`text-sm font-medium ethos-transition tracking-[var(--ethos-letter-spacing)]
            ${state === 'invalid' ? 'text-[var(--ethos-danger)]' : 'text-[var(--ethos-muted)] group-focus-within:text-[var(--ethos-primary)]'}
          `}
        >
          {label}
        </label>
        
        {state === 'validating' && (
          <span className="text-[10px] uppercase tracking-widest text-[var(--ethos-muted)] animate-pulse">
            Reflecting...
          </span>
        )}
      </div>

      <div className="relative">
        {/* Inject id and name into the child element for form state management */}
        {React.cloneElement(children, { id: name, name })}
        
        {/* Animated indicator bar */}
        <div 
          className={`absolute bottom-0 left-0 h-[2px] ethos-transition
            ${state === 'valid' ? 'bg-[var(--ethos-success)] w-full' : 'bg-[var(--ethos-primary)] w-0 group-focus-within:w-full'}
            ${state === 'invalid' ? 'bg-[var(--ethos-danger)] w-full' : ''}
          `}
        />
      </div>

      <div className="min-h-[20px] overflow-hidden">
        {error && isTouched && (
          <p className="text-xs text-[var(--ethos-danger)] ethos-transition italic font-serif">
            {error}
          </p>
        )}
        {!error && helper && (
          <p className="text-xs text-[var(--ethos-muted)] opacity-60 group-focus-within:opacity-100 ethos-transition">
            {helper}
          </p>
        )}
      </div>
    </div>
  );
};
