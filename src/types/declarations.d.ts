// TODO: Remove this when pet-clinic-components is migrated to TS
// Declaration file for pet-clinic-components
declare module '@pc/pet-clinic-components/Button' {
  import { ButtonHTMLAttributes, ReactNode } from 'react';
  
  export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'text' | 'outlined' | 'contained';
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    size?: 'small' | 'medium' | 'large';
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    fullWidth?: boolean;
    disabled?: boolean;
    children?: ReactNode;
  }
  
  const Button: React.FC<ButtonProps>;
  export default Button;
}

// You can add declarations for other components from the package here, following the same pattern
declare module '@pc/pet-clinic-components/*' {
  const component: React.ComponentType<Record<string, unknown>>;
  export default component;
}
