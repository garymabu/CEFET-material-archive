import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Modal, Snackbar } from '@mui/material';
import { ErrorToastContext } from '../contexts/errorToast.context';

export const ErrorToastProvider = ({
  children,
}: {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode[]
    | React.ReactNode;
}) => {
  const [currentError, setCurrentError] = useState<string>();

  const clearToast = () => setCurrentError(undefined);

  useEffect(() => {
    if (currentError) {
      setTimeout(clearToast, 5000);
    }
  }, [currentError]);

  return (
    <ErrorToastContext.Provider value={{ currentError, setCurrentError }}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={!!currentError}
        onClose={clearToast}
        message={currentError}
      />
      {children}
    </ErrorToastContext.Provider>
  );
};
