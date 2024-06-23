import { createContext } from 'react';

interface ErrorToastProps {
  currentError?: string;
  setCurrentError: (error: string) => void;
}

export const ErrorToastContext = createContext<ErrorToastProps>({
  setCurrentError: () => {},
});
