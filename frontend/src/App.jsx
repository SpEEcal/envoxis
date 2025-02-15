import './App.css'
import Message from './pages/message/Message'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'
import Settings from './pages/settings/settings'

function App() {
  const {authUser} = useAuthContext()
  return (
    <div>
      <Routes>
        <Route path='/home' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
        <Route path='/message' element={authUser ? <Message /> : <Navigate to="/home" />} />
        <Route path='/settings' element={authUser ? <Settings /> : <Navigate to="/home" />} />
        <Route path='/login' element={authUser ? <Navigate to="/home" /> : <Login />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
