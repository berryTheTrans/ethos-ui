
export enum Environment {
  CALM = 'CALM',
  ENERGY = 'ENERGY',
  GLASS = 'GLASS',
  PAPER = 'PAPER',
  INK = 'INK'
}

export interface ThemeTokens {
  bg: string;
  text: string;
  primary: string;
  muted: string;
  warning: string;
  success: string;
  danger: string;
  focus: string;
  borderWidth: string;
  borderRadius: string;
  shadow: string;
  motionDuration: string;
  motionEasing: string;
  glassBlur?: string;
  glassBg?: string;
  letterSpacing?: string;
}

export type ValidationState = 'idle' | 'validating' | 'valid' | 'invalid';

export interface FormValues {
  [key: string]: any;
}

export interface FormError {
  message: string;
  type: 'gentle' | 'urgent';
}
