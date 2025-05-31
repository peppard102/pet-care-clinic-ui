import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import QueryClientProvider from './components/shared/QueryClientProvider';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

const disableMocks = import.meta.env.VITE_DISABLE_MOCKS;

async function enableMocking() {
  if (disableMocks === 'true' || import.meta.env.MODE !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider>
          <CssBaseline />
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  );
});
