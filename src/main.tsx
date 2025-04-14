import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoadingBar } from './shared/components'
import { meta } from './meta.ts'
import './index.css'
import { AppProvider } from './store/app-context.tsx'

const App = lazy(() => import('./App'))

const queryClient = new QueryClient()
const container = document.getElementById('root') as HTMLElement

createRoot(container).render(
  <StrictMode>
    <BrowserRouter basename={meta.env.VITE_APP_BASENAME}>
      <Suspense fallback={<LoadingBar />}>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <App />
          </AppProvider>
        </QueryClientProvider>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
)
