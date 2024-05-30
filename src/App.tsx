import React from 'react';
import { Provider } from 'react-redux';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import store from './store';
import './App.css';
import RouterComponent from './routes';
import { AlertProvider } from './components/AlertContext';
import { LoadingProvider } from './components/LoadingContext';

function App() {
  return (
    <Provider store={store}>
      <AlertProvider>
        <LoadingProvider>
          <RouterComponent/>
        </LoadingProvider>
      </AlertProvider>
    </Provider>
  );
}

export default App;
