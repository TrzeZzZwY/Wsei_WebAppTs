import './index.css'
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter , Link } from 'react-router-dom';
import { Router } from './components/routes/Router';
import { DependencyProvider } from './contexts/DependencyProvider';
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';
import { user } from './types/user';

const store = createStore<user>({
  authName:'_auth',
  authType:'localstorage',
  cookieDomain: window.location.hostname,
  cookieSecure: true
});

store.tokenObject
ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className='min-h-screen'>
      <React.StrictMode>
        <DependencyProvider>
          <AuthProvider store={store}>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </AuthProvider>
        </DependencyProvider>
      </React.StrictMode>
  </div>

)
