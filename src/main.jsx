import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { SyncedContextProvider } from './logic/sync-context'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SyncedContextProvider>
      <App />
    </SyncedContextProvider>
  </StrictMode>,
)
