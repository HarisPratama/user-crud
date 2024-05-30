// src/contexts/LoadingContext.tsx

import React, { createContext, useContext, useState, ReactNode, FC } from 'react';
import { CircularProgress } from '@mui/material';

interface LoadingState {
  isLoading: boolean;
}

interface LoadingContextType {
  setLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: FC<LoadingProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<LoadingState>({ isLoading: false });

  const setLoadingState = (isLoading: boolean) => {
    setLoading({ isLoading });
  };

  return (
    <LoadingContext.Provider value={{ setLoading: setLoadingState }}>
      {children}
      {loading.isLoading && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            zIndex: 2000,
            background: 'rgba(0,0,0,0.3)'
          }}

          className='flex justify-center items-center'
        >
          <CircularProgress color="success" size={100} />
        </div>
      )}
    </LoadingContext.Provider>
  );
};
