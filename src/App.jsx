import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Settings from './pages/Settings'
import Stats from './pages/Stats'
import HistoricData from './pages/HistoricData'
import UsersList from './pages/UsersList'
import Doors from './pages/Doors'
import Layout from './components/Layout'

// localStorage.setItem("url", "http://localhost:8080");
function App() {
  return (<BrowserRouter>
    <Routes>
      {/* Login route without sidebar */}
      <Route path="/" element={<Login />} />

      {/* All routes below share the same layout with persistent sidebar */}
      <Route element={<Layout />}>
        <Route path="/menu" element={<Menu />} />
        <Route path="/historic" element={<HistoricData />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/doors" element={<Doors />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App

