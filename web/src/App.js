import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';

import history from './services/history';
import { store, persistor } from './store';

import Routes from './routes';
import GlobalStyle from './styles/global';

import 'assets/css/material-dashboard-react.css?v=1.9.0';
import '@coreui/coreui/dist/css/coreui.min.css'

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <ToastContainer autoClose={3000} />
          <GlobalStyle />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
