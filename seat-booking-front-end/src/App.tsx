import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import UserManagementPage from './components/UserManagementPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/users" element={<UserManagementPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
