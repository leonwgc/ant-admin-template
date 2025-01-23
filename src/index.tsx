import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, configureStore } from 'simple-redux-store';
import App from './App';
import './scss/index.scss';
import './scss/global.scss';
import { BrowserRouter } from 'react-router';
import operations from './config.operations';

type StoreData = {
  operations: string[];
};

const data: StoreData = {
  operations: [
    operations.VIEW_USER,
    operations.CREATE_USER,
    operations.VIEW_TEMPLATE,
    operations.CREATE_TEMPLATE,
  ],
};

const store = configureStore(data, true);

createRoot(document.getElementById('app') as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
