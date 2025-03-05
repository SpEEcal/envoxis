import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { SocketContextProvider } from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode> {/* Lets you find common bugs in your components early during development */}
    <BrowserRouter> {/* Router for web browsers -> Provides the cleanest URLs */}
      <AuthContextProvider> {/* Provides user information for the website to display */}
          <SocketContextProvider> {/* Provides every single user's information for the website to display */}
            <App /> {/* Displays website */}
          </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
