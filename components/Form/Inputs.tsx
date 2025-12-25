
import React from 'react';
import { useFormContext } from './Form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
}

export const Input: React.FC<InputProps> = ({ name, ...props }) => {
  const { values, setFieldValue, setTouched } = useFormContext();
  const value = name ? values[name] || '' : '';

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => name && setFieldValue(name, e.target.value)}
      onBlur={() => name && setTouched(name)}
      className={`
        w-full py-3 bg-transparent border-b border-[var(--ethos-muted)] border-opacity-30
        focus:outline-none focus:border-opacity-0 text-lg ethos-transition
        placeholder:text-[var(--ethos-muted)] placeholder:opacity-30
      `}
    />
  );
};

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { name?: string }> = ({ name, ...props }) => {
  const { values, setFieldValue, setTouched } = useFormContext();
  const value = name ? values[name] || '' : '';

  return (
    <textarea
      {...props}
      value={value}
      onChange={(e) => name && setFieldValue(name, e.target.value)}
      onBlur={() => name && setTouched(name)}
      className={`
        w-full py-3 bg-transparent border-b border-[var(--ethos-muted)] border-opacity-30
        focus:outline-none focus:border-opacity-0 text-lg ethos-transition min-h-[100px] resize-none
        placeholder:text-[var(--ethos-muted)] placeholder:opacity-30
      `}
    />
  );
};

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { name?: string; options: { label: string; value: string }[] }> = ({ name, options, ...props }) => {
  const { values, setFieldValue, setTouched } = useFormContext();
  const value = name ? values[name] || '' : '';

  return (
    <select
      {...props}
      value={value}
      onChange={(e) => name && setFieldValue(name, e.target.value)}
      onBlur={() => name && setTouched(name)}
      className={`
        w-full py-3 bg-transparent border-b border-[var(--ethos-muted)] border-opacity-30
        focus:outline-none focus:border-opacity-0 text-lg ethos-transition cursor-pointer appearance-none
      `}
    >
      <option value="" disabled className="bg-[var(--ethos-bg)]">Select an option...</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value} className="bg-[var(--ethos-bg)] text-[var(--ethos-text)]">
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export const Switch: React.FC<{ name: string; label: string }> = ({ name, label }) => {
  const { values, setFieldValue } = useFormContext();
  const checked = !!values[name];

  return (
    <label className="flex items-center gap-4 cursor-pointer group py-2">
      <div 
        onClick={() => setFieldValue(name, !checked)}
        className={`
          relative w-12 h-6 rounded-full ethos-transition
          ${checked ? 'bg-[var(--ethos-primary)]' : 'bg-[var(--ethos-muted)] bg-opacity-30'}
        `}
      >
        <div className={`
          absolute top-1 w-4 h-4 rounded-full bg-[var(--ethos-bg)] ethos-transition
          ${checked ? 'left-7' : 'left-1'}
        `} />
      </div>
      <span className="text-sm font-medium text-[var(--ethos-text)]">{label}</span>
    </label>
  );
};
