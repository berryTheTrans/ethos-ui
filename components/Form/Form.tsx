
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { FormValues, ValidationState } from '../../types';

interface FormContextType {
  values: FormValues;
  setFieldValue: (name: string, value: any) => void;
  errors: Record<string, string | null>;
  validationStates: Record<string, ValidationState>;
  touched: Record<string, boolean>;
  setTouched: (name: string) => void;
  registerField: (name: string) => void;
  isFieldVisible: (name: string) => boolean;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProps {
  children: React.ReactNode;
  onSubmit: (values: FormValues) => void;
  initialValues?: FormValues;
}

export const EthosForm: React.FC<FormProps> = ({ children, onSubmit, initialValues = {} }) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [validationStates, setValidationStates] = useState<Record<string, ValidationState>>({});
  const [touched, setTouchedState] = useState<Record<string, boolean>>({});
  const [registeredFields, setRegisteredFields] = useState<string[]>([]);

  const registerField = useCallback((name: string) => {
    setRegisteredFields(prev => prev.includes(name) ? prev : [...prev, name]);
  }, []);

  const setFieldValue = useCallback((name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    // Reset state on change
    setValidationStates(prev => ({ ...prev, [name]: 'idle' }));
  }, []);

  const setTouched = useCallback((name: string) => {
    setTouchedState(prev => ({ ...prev, [name]: true }));
    // Trigger "Thinking" validation
    setValidationStates(prev => ({ ...prev, [name]: 'validating' }));
    
    setTimeout(() => {
      // Simulate validation logic
      const val = values[name];
      let error = null;
      if (!val || (typeof val === 'string' && val.trim() === '')) {
        error = "Let's make sure this isn't empty.";
      }
      
      setErrors(prev => ({ ...prev, [name]: error }));
      setValidationStates(prev => ({ ...prev, [name]: error ? 'invalid' : 'valid' }));
    }, 800);
  }, [values]);

  // Progressive Disclosure Logic
  const isFieldVisible = useCallback((name: string) => {
    const index = registeredFields.indexOf(name);
    if (index <= 0) return true;
    
    // Check if all previous fields are valid
    for (let i = 0; i < index; i++) {
      const prevName = registeredFields[i];
      if (validationStates[prevName] !== 'valid') return false;
    }
    return true;
  }, [registeredFields, validationStates]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <FormContext.Provider value={{ 
      values, setFieldValue, errors, validationStates, 
      touched, setTouched, registerField, isFieldVisible 
    }}>
      <form onSubmit={handleSubmit} className="space-y-12">
        {children}
      </form>
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error('useFormContext must be used within EthosForm');
  return context;
};
