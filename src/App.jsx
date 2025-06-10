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
import { Toaster } from 'react-hot-toast'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Toaster/>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<Layout />}>
            <Route path="/menu" element={<Menu />} />
            <Route path="/historic" element={<HistoricData />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/doors" element={<Doors />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

