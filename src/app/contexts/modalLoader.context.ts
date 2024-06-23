import { createContext } from 'react';

interface ModalContextProps {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

export const ModalLoaderContext = createContext<ModalContextProps>({
  isLoading: false,
  showLoader: () => {},
  hideLoader: () => {},
});
