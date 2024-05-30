// src/contexts/AlertContext.tsx

import React, { createContext, useContext, useState, ReactNode, FC } from 'react';
import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

interface AlertState {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}

interface AlertContextType {
  (message: string, severity?: 'success' | 'info' | 'warning' | 'error'): void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }  
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: '',
    severity: 'success',
  });

  const showAlert: AlertContextType = (message, severity = 'success') => {
    console.log('masuk');
    
    setAlert({ open: true, message, severity });
    setTimeout(() => {
      setAlert((prev) => ({ ...prev, open: false }));
    }, 3000); // Automatically hide the alert after 3 seconds
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      {alert.open && (
        <Alert
          variant="filled"
          icon={<CheckIcon fontSize="inherit" />}
          severity={alert.severity}
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: 1000,
          }}
        >
          {alert.message}
        </Alert>
      )}
    </AlertContext.Provider>
  );
};
