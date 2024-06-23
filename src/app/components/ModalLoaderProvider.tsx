import { useState } from 'react';
import { ModalLoaderContext } from '../contexts/modalLoader.context';
import { Box, CircularProgress, Modal } from '@mui/material';

export const ModalLoaderProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);
  return (
    <ModalLoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      <Modal open={isLoading} className="flex justify-center items-center">
        <Box className="w[100px] h[100px]">
          <CircularProgress />
        </Box>
      </Modal>
      {children}
    </ModalLoaderContext.Provider>
  );
};
